import React from 'react';
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GoldButton } from '../common/GoldButton';

export const ContactCTA: React.FC = () => {
  const { company, navigate } = useData();

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0f20] to-slate-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900/90 via-[#0d1428] to-slate-950 border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center relative overflow-hidden">
          {/* Top golden decorative line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Automate &amp; Scale Your Business?</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Schedule a 1-on-1 Strategy Call With Our{' '}
            <span className="text-gold-gradient">Founding Architects</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get an in-depth audit of your customer conversion funnel, custom software scope, or AI automation pipeline with MD Juned (CEO) and Satpal Kumar (Founder).
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <GoldButton
              size="lg"
              fullWidth
              variant="solid"
              onClick={() => navigate('/book-consultation')}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Free Consultation
            </GoldButton>

            <GoldButton
              size="lg"
              fullWidth
              variant="outline"
              onClick={() => {
                window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hi%20Tahanabi%20Tech%20Agency,%20I%20want%20to%20discuss%20a%20project`, '_blank');
              }}
              icon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
            >
              Chat on WhatsApp
            </GoldButton>
          </div>

          {/* Direct contact numbers */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{company.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{company.email}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NDA Protected &amp; 100% Confidential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
