import React from 'react';
import {
  Sparkles,
  Award,
  Users,
  Target,
  ShieldCheck,
  CheckCircle2,
  Globe,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AboutPage: React.FC = () => {
  const { company, stats, navigate } = useData();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Award className="w-3.5 h-3.5" />
          <span>Founded by NIT Trichy Engineers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-gold-gradient">Tahanabi Tech Agency</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          A premier global technology and AI automation partner helping enterprises, luxury retailers, and fast-growing modern businesses build digital dominance.
        </p>
      </div>

      {/* Leadership Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Executive Leadership &amp; <span className="text-gold-gradient">Engineering Minds</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Direct access to founding architects with rigorous software engineering discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CEO Card */}
          <GlassCard glow padding="xl" className="border-amber-400/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                Chief Executive Officer
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Alumni: NIT Trichy &apos;24
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">{company.ceo.name}</h3>
              <p className="text-xs font-semibold text-amber-400 mt-0.5">
                {company.ceo.degree}, National Institute of Technology, Tiruchirappalli
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {company.ceo.bio} MD Juned leads technical strategy, full-stack microservices architecture, and luxury e-commerce conversion optimization for international clients in UAE, GCC, and North America.
            </p>

            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Specialization: Large-scale Full-Stack Systems &amp; Autonomous AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Graduation: B.Tech, NIT Trichy (Class of 2024)</span>
              </div>
            </div>
          </GlassCard>

          {/* Founder Card */}
          <GlassCard glow padding="xl" className="border-amber-400/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                Agency Founder
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Alumni: NIT Trichy &apos;23
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">{company.founder.name}</h3>
              <p className="text-xs font-semibold text-amber-400 mt-0.5">
                {company.founder.degree}, National Institute of Technology, Tiruchirappalli
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {company.founder.bio} Satpal Kumar drives enterprise CRM pipelines, official WhatsApp Cloud API integrations, cloud DevOps security, and client scaling partnerships.
            </p>

            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Specialization: Enterprise Cloud DevOps, Automations &amp; CRM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Graduation: B.Tech, NIT Trichy (Class of 2023)</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Engineering Team Credential Banner */}
        <GlassCard glow padding="lg" className="border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Elite In-House Engineering Team</h4>
              <p className="text-xs text-slate-400">
                Supported by {company.engineers} with proven delivery in high-load production environments.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
            Zero Outsourcing • 100% In-House
          </div>
        </GlassCard>
      </div>

      {/* Mission, Vision & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard glow padding="lg" className="space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To eliminate technical drag for modern businesses by delivering clean, high-speed digital architectures and autonomous AI pipelines that multiply operational leverage.
          </p>
        </GlassCard>

        <GlassCard glow padding="lg" className="space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To establish Tahanabi Tech Agency as the premier international standard in bespoke enterprise technology, combining aesthetic luxury with uncompromising performance.
          </p>
        </GlassCard>

        <GlassCard glow padding="lg" className="space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Approach</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            We operate with zero-fluff engineering: strict type safety, sub-second international latency, mobile-first responsiveness, and measurable conversion milestones.
          </p>
        </GlassCard>
      </div>

      {/* Global Company Footprint & Location */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-amber-500/25 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Global Service &amp; Delivery Footprint</h3>
            <p className="text-xs text-slate-400 mt-1">
              Serving enterprise clients across United Arab Emirates, Saudi Arabia, India, Australia, United Kingdom, and the United States.
            </p>
          </div>

          <a
            href={company.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-amber-400/40 text-xs text-amber-300 hover:text-white flex items-center gap-1.5 transition shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>View on Google Maps</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 mb-1">Registered Coordinates</div>
            <div className="text-white font-mono font-medium">{company.coordinates.lat}, {company.coordinates.lng}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 mb-1">Hotline &amp; WhatsApp</div>
            <div className="text-amber-400 font-mono font-medium">{company.phone}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 mb-1">Official Correspondence</div>
            <div className="text-white font-mono font-medium">{company.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
