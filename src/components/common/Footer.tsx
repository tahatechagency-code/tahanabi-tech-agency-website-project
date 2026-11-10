import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from './BrandLogo';
import { GoldButton } from './GoldButton';

export const Footer: React.FC = () => {
  const { company, navigate } = useData();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-[#070b16] to-[#04060c] border-t border-amber-500/20 pt-16 pb-12 overflow-hidden text-slate-400 text-sm">
      {/* Top subtle golden glow mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Global technology and AI automation partner delivering high-converting e-commerce platforms, autonomous AI concierges, and tailored enterprise software.
            </p>

            {/* Founder Credentials Badge */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                Leadership & Alumni Credential
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-white font-medium">CEO: {company.ceo.name}</span> — {company.ceo.degree}, {company.ceo.institution} ({company.ceo.year})
                </div>
                <div>
                  <span className="text-white font-medium">Founder: {company.founder.name}</span> — {company.founder.degree}, {company.founder.institution} ({company.founder.year})
                </div>
                <div className="text-[11px] text-amber-400/90 font-medium">
                  • Core Team: {company.engineers}
                </div>
              </div>
            </div>

            {/* Global Reach Flags */}
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="text-slate-500">Global Hubs:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇦🇪 UAE</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇮🇳 IND</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇸🇦 KSA</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇦🇺 AUS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇺🇸 USA</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">🇬🇧 UK</span>
            </div>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Core Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/demos/ecommerce')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Luxury E-commerce Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/demos/ai-automation')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  24/7 AI Concierge & Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/solutions')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Custom Business Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/solutions')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  WhatsApp CRM & Integrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/solutions')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  International Web Deployment
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/solutions')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Enterprise Admin Panels & Portals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Agency
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-amber-300 transition-colors">
                  Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/industries')} className="hover:text-amber-300 transition-colors">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/demos')} className="hover:text-amber-300 transition-colors">
                  Live Demos
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/references')} className="hover:text-amber-300 transition-colors">
                  Reference Library
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-amber-300 transition-colors">
                  Simple Pricing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-amber-300 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/resources')} className="hover:text-amber-300 transition-colors">
                  Resources & Insights
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-amber-300 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Direct Contact
            </h3>

            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${company.phone}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{company.phone}</span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="break-all">{company.email}</span>
              </a>

              <a
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>WhatsApp Live Business Desk</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div>{company.location}</div>
                  <div className="text-[11px] font-mono text-amber-400/80">
                    GPS: {company.coordinates.lat}, {company.coordinates.lng}
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Action */}
            <div className="pt-2">
              <GoldButton
                size="sm"
                fullWidth
                variant="solid"
                onClick={() => navigate('/book-consultation')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Book 1-on-1 Strategy Call
              </GoldButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Tahanabi Tech Agency. All rights reserved. Global Technology & AI Partner.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/database')}
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Database & CRUD Console</span>
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/admin/references')}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              Reference Library
            </button>
            <span>•</span>
            <span className="text-slate-600 font-mono">v1.2 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
