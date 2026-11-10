import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const ContactPage: React.FC = () => {
  const { company, submitLead } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('E-commerce');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    submitLead({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      businessType,
      message: message.trim(),
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Founding Architect Hotline</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in <span className="text-gold-gradient">Touch With Us</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Have an e-commerce, custom business application, or AI automation project? Let&apos;s discuss your technical scope and build it together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glow padding="lg" className="space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Official Agency Coordinates
            </h3>

            {/* Direct Cards */}
            <div className="space-y-4 text-xs">
              {/* Phone */}
              <a
                href={`tel:${company.phone}`}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 flex items-start gap-3 transition group"
              >
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 group-hover:scale-105 transition">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Direct Telephone &amp; Hotline</div>
                  <div className="text-white font-mono font-bold text-sm mt-0.5">{company.phone}</div>
                  <div className="text-[11px] text-slate-500">Available Mon - Sat, 09:00 AM - 08:00 PM IST</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-400 flex items-start gap-3 transition group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-emerald-400 font-semibold">WhatsApp Live Business Desk</div>
                  <div className="text-white font-mono font-bold text-sm mt-0.5">{company.whatsapp}</div>
                  <div className="text-[11px] text-emerald-400/80">Instant reply: Typically under 5 minutes</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${company.email}`}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 flex items-start gap-3 transition group"
              >
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 group-hover:scale-105 transition">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Email Address</div>
                  <div className="text-white font-mono font-semibold text-xs sm:text-sm mt-0.5 break-all">
                    {company.email}
                  </div>
                  <div className="text-[11px] text-slate-500">Official proposals &amp; RFP submissions</div>
                </div>
              </a>

              {/* Location & Google Maps */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Headquarters &amp; Global Operations</div>
                    <div className="text-white font-semibold text-xs mt-0.5">{company.location}</div>
                    <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                      GPS: {company.coordinates.lat}, {company.coordinates.lng}
                    </div>
                  </div>
                </div>

                <a
                  href={company.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-medium transition"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps ({company.coordinates.lat}, {company.coordinates.lng})</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>All communications are protected under strict NDA.</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <GlassCard glow padding="xl" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your project requirements and our engineering team will get back to you within 2 hours.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Message Dispatched Successfully!</strong>
                  Your inquiry has been stored and routed directly to MD Juned &amp; Satpal Kumar. We will reach out via WhatsApp and email.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe / Tariq Al-Mansoor"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 91285 96443 or +971..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">Business / Service Type *</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="E-commerce">Luxury E-commerce Store</option>
                    <option value="AI Automation">AI Concierge &amp; WhatsApp Bot</option>
                    <option value="Custom Business App">Custom Business Application</option>
                    <option value="CRM & Integrations">CRM, ERP &amp; API Integration</option>
                    <option value="Car Rental / Fleet">Car Rental &amp; Fleet Leasing</option>
                    <option value="Other">Other Enterprise Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-medium">Project Scope &amp; Questions *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business goals, target launch timeline, and key requirements..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <GoldButton
                  type="submit"
                  size="lg"
                  fullWidth
                  variant="solid"
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Inquiry to Engineering Team
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
