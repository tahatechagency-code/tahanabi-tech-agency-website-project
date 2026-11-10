import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Copy,
  MessageCircle,
  AlertCircle,
  Clock,
  Loader2,
  Building,
  Globe,
  DollarSign,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GoldButton } from './GoldButton';
import { GlassCard } from './GlassCard';

export const CustomerOrderModal: React.FC = () => {
  const {
    isOrderModalOpen,
    orderModalData,
    closeOrderModal,
    submitCustomerOrder,
    company,
    navigate,
    showToast,
  } = useData();

  // Step 1: Form, Step 2: Confirmation
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState('');
  const [confirmedData, setConfirmedData] = useState<any>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Arab Emirates');
  const [businessType, setBusinessType] = useState('Luxury Retail');
  const [budgetRange, setBudgetRange] = useState('CAD 500 (Moderate)');
  const [requirements, setRequirements] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [copiedRef, setCopiedRef] = useState(false);

  // Prefill data when modal opens
  useEffect(() => {
    if (isOrderModalOpen) {
      setIsConfirmed(false);
      setErrors({});

      // Restore cached draft if available
      try {
        const savedDraft = localStorage.getItem('tahanabi_order_draft');
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          if (draft.fullName) setFullName(draft.fullName);
          if (draft.email) setEmail(draft.email);
          if (draft.phone) setPhone(draft.phone);
          if (draft.country) setCountry(draft.country);
        }
      } catch {
        // Ignore cache parse error
      }

      if (orderModalData?.industry) {
        setBusinessType(orderModalData.industry);
      }
      if (orderModalData?.pricingPlan) {
        setBudgetRange(
          orderModalData.budgetCAD
            ? `CAD $${orderModalData.budgetCAD} (${orderModalData.pricingPlan})`
            : orderModalData.pricingPlan
        );
      }
    }
  }, [isOrderModalOpen, orderModalData]);

  // Cache user typing to prevent data loss
  useEffect(() => {
    if (isOrderModalOpen && !isConfirmed) {
      try {
        localStorage.setItem(
          'tahanabi_order_draft',
          JSON.stringify({ fullName, email, phone, country })
        );
      } catch {
        // Ignore storage full
      }
    }
  }, [fullName, email, phone, country, isOrderModalOpen, isConfirmed]);

  if (!isOrderModalOpen) return null;

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 letters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 7) {
      newErrors.phone = 'Please provide a valid phone/WhatsApp number with country code.';
    }

    if (!country.trim()) {
      newErrors.country = 'Please select or enter your country.';
    }

    if (!requirements.trim() || requirements.trim().length < 10) {
      newErrors.requirements =
        'Please describe your project scope (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-spam honeypot detection
    if (honeypot.trim()) {
      showToast('Spam submission detected.', 'error');
      closeOrderModal();
      return;
    }

    // 2. Prevent duplicate submissions / rapid clicks
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      showToast('Please wait a moment before submitting again.', 'info');
      return;
    }

    // 3. Validation
    if (!validateForm()) {
      showToast('Please correct the errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      // Determine plan amount in CAD
      let amountCAD = 500;
      if (budgetRange.includes('200')) amountCAD = 200;
      else if (budgetRange.includes('1,000') || budgetRange.includes('1000')) amountCAD = 1000;
      else if (budgetRange.includes('5,000') || budgetRange.includes('5000')) amountCAD = 5000;
      else if (orderModalData?.budgetCAD) amountCAD = orderModalData.budgetCAD;

      const orderPayload = {
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        country: country.trim(),
        businessType: businessType.trim(),
        budgetRange,
        amountCAD,
        requirements: requirements.trim(),
        demoTitle: orderModalData?.demoTitle || 'Custom Architecture',
        serviceType: orderModalData?.serviceType || orderModalData?.industry || 'Enterprise Solution',
        pricingPlan: orderModalData?.pricingPlan || 'Moderate Plan',
      };

      const result = await submitCustomerOrder(orderPayload);

      if (result.success) {
        setConfirmedRef(result.reference);
        setConfirmedData(orderPayload);
        setIsConfirmed(true);
        localStorage.removeItem('tahanabi_order_draft'); // Clean draft
        showToast(`Order confirmed with reference ${result.reference}`, 'success');
      } else {
        showToast(result.error || 'Failed to submit order. Please retry.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error processing request.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!confirmedRef) return;
    navigator.clipboard.writeText(confirmedRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 3000);
    showToast('Reference number copied to clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-slate-950 border border-amber-500/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {isConfirmed ? 'Order Confirmation' : 'Request & Order Deployment'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isConfirmed
                  ? 'Your unique reference has been queued in our executive system'
                  : 'Prefilled with selected solution specifications'}
              </p>
            </div>
          </div>
          <button
            onClick={closeOrderModal}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {!isConfirmed ? (
            /* ================= STEP 1: ENQUIRY & ORDER FORM ================= */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Prefilled Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Selected Architecture &amp; Service:
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{orderModalData?.demoTitle || 'Custom Business Application'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {orderModalData?.industry && (
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] text-amber-300 font-medium">
                      {orderModalData.industry}
                    </span>
                  )}
                  {orderModalData?.pricingPlan && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold">
                      {orderModalData.pricingPlan}
                    </span>
                  )}
                </div>
              </div>

              {/* Anti-spam trap: hidden from human eyes */}
              <div className="hidden" aria-hidden="true">
                <label>Website URL (leave blank)</label>
                <input
                  type="text"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* Customer Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Work Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. tariq@luxurygroup.ae"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone / WhatsApp & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    WhatsApp / Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+971 50 123 4567 or +91 98765..."
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none ${
                      errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Country / Operating Region <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="United Arab Emirates">United Arab Emirates (UAE / Dubai)</option>
                    <option value="Saudi Arabia">Saudi Arabia (KSA / Riyadh)</option>
                    <option value="India">India (Pan-India)</option>
                    <option value="United States">United States (USA)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="Australia">Australia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Oman">Oman</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Other International">Other International</option>
                  </select>
                </div>
              </div>

              {/* Business Type & Target Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Business Vertical / Industry</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Jewellery & Luxury Retail">Jewellery &amp; Luxury Retail</option>
                    <option value="Car Rental & Fleet Logistics">Car Rental &amp; Fleet Logistics</option>
                    <option value="Real Estate & Development">Real Estate &amp; Development</option>
                    <option value="Fashion & Couture">Fashion &amp; Couture</option>
                    <option value="Hospitality & Hotels">Hospitality &amp; Fine Dining</option>
                    <option value="Healthcare & Specialty Clinics">Healthcare &amp; Specialty Clinics</option>
                    <option value="B2B Technology & Services">B2B Technology &amp; Services</option>
                    <option value="Education & EdTech">Education &amp; EdTech</option>
                    <option value="Other Enterprise">Other Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Budget Allocation</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="CAD 200 (Basic - Business Web & WhatsApp)">CAD 200 (Basic Package)</option>
                    <option value="CAD 500 (Moderate - E-commerce / Booking Platform)">CAD 500 (Moderate - Most Popular)</option>
                    <option value="CAD 1,000+ (Premium - AI Automation & Custom App)">CAD 1,000+ (Premium Suite)</option>
                    <option value="CAD 5,000+ (Enterprise Dedicated Engineering)">CAD 5,000+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              {/* Requirements & Custom Features */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Specific Requirements / Deliverables <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={requirements}
                  onChange={(e) => {
                    setRequirements(e.target.value);
                    if (errors.requirements) setErrors({ ...errors, requirements: '' });
                  }}
                  placeholder="Tell us what you want to achieve: e.g. We need an e-commerce platform similar to RoyalSparkle Jewellers with live gold pricing tariff and WhatsApp booking integration..."
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none ${
                    errors.requirements ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
                {errors.requirements && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.requirements}
                  </p>
                )}
              </div>

              {/* Security & Anti-spam footer note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Private customer data protected by Supabase Row-Level Security. Never shared or sold.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>

                <GoldButton
                  type="submit"
                  size="md"
                  variant="solid"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    )
                  }
                >
                  {isSubmitting ? 'Securing Order...' : 'Submit Order & Get Reference'}
                </GoldButton>
              </div>
            </form>
          ) : (
            /* ================= STEP 2: CONFIRMATION VIEW ================= */
            <div className="space-y-6 text-center py-2 animate-in fade-in duration-300">
              
              {/* Success Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Submission Verified &amp; Saved
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Order Successfully Registered!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Your project requirements have been recorded in our database. Our leadership team — <strong>MD Juned (CEO)</strong> and <strong>Satpal Kumar (Founder)</strong> — will review your technical specifications.
                </p>
              </div>

              {/* Reference Number Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/30 max-w-lg mx-auto text-xs space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400">Order Reference Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-300 text-base">{confirmedRef}</span>
                    <button
                      onClick={handleCopyRef}
                      title="Copy Reference Number"
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Client Name</span>
                    <span className="text-white font-medium">{confirmedData?.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Region</span>
                    <span className="text-white font-medium">{confirmedData?.country}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Requested Solution</span>
                    <span className="text-amber-300 font-medium truncate block">{confirmedData?.demoTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Budget Tier</span>
                    <span className="text-emerald-400 font-mono font-medium">CAD ${confirmedData?.amountCAD}</span>
                  </div>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400 font-medium">
                  Fast-Track Your Implementation with Direct WhatsApp &amp; Calendar:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-lg mx-auto">
                  <GoldButton
                    size="md"
                    variant="solid"
                    fullWidth
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hi Tahanabi Tech Agency, I have submitted an order with Reference: ${confirmedRef} for ${confirmedData?.demoTitle}. My name is ${confirmedData?.customerName}. Please confirm onboarding.`
                      );
                      window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
                    }}
                    icon={<MessageCircle className="w-4 h-4 text-slate-950" />}
                  >
                    Chat on WhatsApp with Reference
                  </GoldButton>

                  <GoldButton
                    size="md"
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      closeOrderModal();
                      navigate('/book-consultation');
                    }}
                    icon={<Clock className="w-4 h-4 text-amber-400" />}
                  >
                    Book Strategy Session
                  </GoldButton>
                </div>
              </div>

              {/* Return Button */}
              <div className="pt-2">
                <button
                  onClick={closeOrderModal}
                  className="text-xs text-slate-500 hover:text-slate-300 transition underline"
                >
                  Close &amp; Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
