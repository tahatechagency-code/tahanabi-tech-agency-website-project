import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const BookConsultationPage: React.FC = () => {
  const { company, submitBooking, navigate } = useData();

  // Booking steps: 1: Slot Selection, 2: Client Details, 3: Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-12');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceType, setServiceType] = useState('Luxury E-commerce');
  const [budgetRange, setBudgetRange] = useState('CAD 500 - CAD 2,000');
  const [projectOverview, setProjectOverview] = useState('');

  // Confirmation result
  const [confirmedRef, setConfirmedRef] = useState<string>('');

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM (Dubai/GCC)',
  ];

  // Available dates for booking
  const availableDates = [
    { date: '2026-11-12', label: 'Thu, Nov 12' },
    { date: '2026-11-13', label: 'Fri, Nov 13' },
    { date: '2026-11-14', label: 'Sat, Nov 14' },
    { date: '2026-11-16', label: 'Mon, Nov 16' },
    { date: '2026-11-17', label: 'Tue, Nov 17' },
  ];

  const handleStep1Next = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    const ref = await submitBooking({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      companyName: companyName.trim(),
      bookingDate: selectedDate,
      timeSlot: selectedTimeSlot,
      serviceType,
      budgetRange,
      projectOverview: projectOverview.trim(),
    });

    setConfirmedRef(ref);
    setStep(3);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>1-on-1 Engineering &amp; Strategy Call</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Book a Free <span className="text-gold-gradient">Strategy Call</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Discuss your architectural scope, e-commerce milestones, and AI automation requirements directly with MD Juned (CEO) and Satpal Kumar (Founder).
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 pt-4 text-xs font-semibold">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              step >= 1
                ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                : 'border-slate-800 text-slate-500'
            }`}
          >
            <span>1</span>
            <span>Date &amp; Time</span>
          </div>
          <span className="text-slate-600">&rarr;</span>
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              step >= 2
                ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                : 'border-slate-800 text-slate-500'
            }`}
          >
            <span>2</span>
            <span>Project Details</span>
          </div>
          <span className="text-slate-600">&rarr;</span>
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              step === 3
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                : 'border-slate-800 text-slate-500'
            }`}
          >
            <span>3</span>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      {/* Step 1: Date & Time Slot Selection */}
      {step === 1 && (
        <GlassCard glow padding="xl" className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-400" />
              <span>Step 1: Select Your Preferred Consultation Date</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {availableDates.map((d) => (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-xl text-xs font-semibold transition border ${
                    selectedDate === d.date
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/40'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Select Available Time Slot (45 Mins Strategy Session)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-3 rounded-xl text-xs font-medium transition border flex items-center justify-between ${
                    selectedTimeSlot === slot
                      ? 'bg-amber-400/15 text-amber-300 border-amber-400 shadow-sm font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/40'
                  }`}
                >
                  <span>{slot}</span>
                  {selectedTimeSlot === slot && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Selected: <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTimeSlot}</strong>
            </div>

            <GoldButton
              size="md"
              variant="solid"
              onClick={handleStep1Next}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Project Scope
            </GoldButton>
          </div>
        </GlassCard>
      )}

      {/* Step 2: Project & Client Details */}
      {step === 2 && (
        <GlassCard glow padding="xl" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Step 2: Share Your Project Scope</h3>
              <p className="text-xs text-slate-400">
                Session locked for: {selectedDate} ({selectedTimeSlot})
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-amber-400 hover:underline"
            >
              Change Date/Time
            </button>
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Work Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. tariq@luxurygroup.ae"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+971 50 123 4567 or +91..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Company / Brand Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Al-Mansoor Luxury Lifestyle"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Primary Focus</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Luxury E-commerce">Luxury E-commerce Platform</option>
                  <option value="AI Concierge & Chatbots">AI Concierge &amp; WhatsApp Bot</option>
                  <option value="Custom Business Software">Custom Business Application</option>
                  <option value="CRM & Integrations">CRM &amp; WhatsApp API Integration</option>
                  <option value="Car Rental & Fleet Solution">Car Rental &amp; Fleet Systems</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Target Budget</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="CAD 200 - CAD 500">CAD 200 - CAD 500 (Basic Setup)</option>
                  <option value="CAD 500 - CAD 1,500">CAD 500 - CAD 1,500 (Moderate - Most Popular)</option>
                  <option value="CAD 1,500 - CAD 5,000">CAD 1,500 - CAD 5,000 (Custom Enterprise)</option>
                  <option value="CAD 5,000+">CAD 5,000+ (Full Suite &amp; Dedicated Team)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Brief Technical Overview / Goals</label>
              <textarea
                rows={3}
                value={projectOverview}
                onChange={(e) => setProjectOverview(e.target.value)}
                placeholder="Describe your current software or goals (e.g. We need to automate WhatsApp lead booking for our jewellery showroom)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                &larr; Back to Calendar
              </button>

              <GoldButton
                type="submit"
                size="md"
                variant="solid"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Confirm Consultation Booking
              </GoldButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Step 3: Confirmation View */}
      {step === 3 && (
        <GlassCard glow padding="xl" className="border-emerald-500/40 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Consultation Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Your 1-on-1 strategy call with <strong>MD Juned (CEO)</strong> and <strong>Satpal Kumar (Founder)</strong> is scheduled.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-500">Booking Reference:</span>
              <span className="font-mono font-bold text-amber-300 text-sm">{confirmedRef}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Date &amp; Time:</span>
              <span className="text-white font-medium">{selectedDate} at {selectedTimeSlot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Client:</span>
              <span className="text-white font-medium">{clientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Meeting Channel:</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Google Meet / WhatsApp Video
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <GoldButton
              size="md"
              variant="solid"
              onClick={() => {
                window.open(
                  `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hi%20Tahanabi,%20I%20have%20booked%20a%20consultation%20with%20reference%20${confirmedRef}%20for%20${selectedDate}%20at%20${selectedTimeSlot}.`,
                  '_blank'
                );
              }}
              icon={<MessageCircle className="w-4 h-4 text-slate-950" />}
            >
              Ping on WhatsApp with Reference
            </GoldButton>

            <GoldButton
              size="md"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Return to Home
            </GoldButton>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
