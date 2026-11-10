import React from 'react';
import {
  ShoppingBag,
  Bot,
  Code2,
  Network,
  Globe,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const SolutionsPage: React.FC = () => {
  const { services, navigate } = useData();

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-amber-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-amber-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-amber-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineered For Measurable Business Growth</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our <span className="text-gold-gradient">Solutions &amp; Capabilities</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          End-to-end digital engineering and autonomous AI systems built for international brands across UAE, GCC, India, Australia, and the USA.
        </p>
      </div>

      {/* Solutions Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <GlassCard
            key={service.id}
            glow
            padding="xl"
            className="flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 w-fit">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-xs font-mono text-amber-400/80 font-semibold px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-amber-400 mt-1">
                  {service.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {service.description}
              </p>

              {/* Core Features */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For & Deliverables */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Best for: </span>
                  <span className="text-slate-300 font-medium">{service.idealFor}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <GoldButton
                size="sm"
                variant="outline"
                onClick={() => {
                  if (service.slug === 'ecommerce-websites') navigate('/demos/ecommerce');
                  else if (service.slug === 'ai-automation') navigate('/demos/ai-automation');
                  else navigate('/demos');
                }}
              >
                View Live Demos
              </GoldButton>

              <GoldButton
                size="sm"
                variant="solid"
                onClick={() => navigate('/book-consultation')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Architecture
              </GoldButton>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Architecture Guarantee Banner */}
      <GlassCard glow padding="xl" className="border-amber-400/40 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white">
          Architected by NIT Trichy Software Engineers
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Every solution is engineered for sub-second international latency, scalable cloud databases, bank-grade encryption, and seamless mobile responsiveness.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <GoldButton
            size="md"
            variant="solid"
            onClick={() => navigate('/book-consultation')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Book Free Strategy Call
          </GoldButton>
        </div>
      </GlassCard>
    </div>
  );
};
