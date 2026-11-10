import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const PricingPage: React.FC = () => {
  const { pricingPlans, navigate } = useData();
  const [billingToggle, setBillingToggle] = useState<'one_time' | 'maintenance'>('one_time');

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent &amp; Predictable Investment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, Transparent <span className="text-gold-gradient">Pricing Plans</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          No hidden fees. Every plan includes production-ready deployment, mobile optimization, and direct support from our NIT Trichy engineering team.
        </p>

        {/* Currency & Guarantee Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 font-mono">
            All prices in Canadian Dollars (CAD)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> 100% Quality Assurance Guarantee
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid (Pulls from editable DataContext) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan) => {
          return (
            <GlassCard
              key={plan.id}
              glow={plan.isPopular}
              padding="xl"
              className={`flex flex-col justify-between relative ${
                plan.isPopular
                  ? 'border-amber-400 shadow-[0_0_40px_rgba(212,175,55,0.25)] lg:scale-105 z-10'
                  : 'border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.tierName}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-y border-slate-800/80">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-gold-gradient font-mono">
                      CAD {plan.priceCAD.toLocaleString()}
                      {plan.tierName === 'Premium' && '+'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    {plan.priceNote}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 mt-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Est. Delivery: {plan.turnaroundTime}</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    Included Features:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Not included items */}
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-3 space-y-1.5 opacity-60">
                      {plan.notIncluded.map((notFeat, nIdx) => (
                        <div key={nIdx} className="flex items-start gap-2.5 text-[11px] text-slate-500">
                          <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                          <span>{notFeat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <GoldButton
                  size="md"
                  fullWidth
                  variant={plan.isPopular ? 'solid' : 'outline'}
                  onClick={() => navigate('/book-consultation')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {plan.ctaText}
                </GoldButton>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6 pt-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">Everything you need to know about our billing, milestones, and technical delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard glow padding="md" className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">Can I pay in AED, USD, or INR?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Yes. While our benchmark pricing is in CAD, we accept payments in AED (Dirhams), USD, and INR via international wire transfer, Stripe, or local bank deposit.
            </p>
          </GlassCard>

          <GlassCard glow padding="md" className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">Do you sign NDAs before project kickoff?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always. Every client engagement includes a legally binding Non-Disclosure Agreement (NDA) to protect your proprietary business workflows, databases, and IP.
            </p>
          </GlassCard>

          <GlassCard glow padding="md" className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">Who actually writes the code?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our core engineering team led by MD Juned (CEO, NIT Trichy &apos;24) and Satpal Kumar (Founder, NIT Trichy &apos;23) along with 2 senior engineers with 5+ years experience. We do not outsource to junior contractors.
            </p>
          </GlassCard>

          <GlassCard glow padding="md" className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">What happens after my site goes live?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every plan includes post-launch testing, warranty, and optional ongoing maintenance SLA packages for server monitoring, updates, and feature scaling.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
