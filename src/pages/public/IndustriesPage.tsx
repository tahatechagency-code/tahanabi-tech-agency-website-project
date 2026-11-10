import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Gem,
  Car,
  Building2,
  Compass,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const IndustriesPage: React.FC = () => {
  const { industries, navigate } = useData();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Gem':
        return <Gem className="w-5 h-5 text-amber-300" />;
      case 'Car':
        return <Car className="w-5 h-5 text-amber-300" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-300" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-300" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-amber-300" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-300" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-300" />;
      default:
        return <Layers className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industry-Tailored Digital Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Industries <span className="text-gold-gradient">We Serve</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Deep domain expertise tailored for retail, mobility, real estate, hospitality, and healthcare. Every solution addresses specific industry operational bottlenecks.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industries.map((ind) => (
          <GlassCard
            key={ind.id}
            glow
            padding="none"
            className="overflow-hidden flex flex-col justify-between"
          >
            {/* Header Image */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img
                src={ind.imageUrl}
                alt={ind.name}
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950/80 backdrop-blur border border-amber-400/30">
                {getIcon(ind.iconName)}
              </div>

              {ind.statsHeadline && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur border border-amber-400/40 text-[10px] font-semibold text-amber-300">
                  {ind.statsHeadline}
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {ind.name}
                </h3>
              </div>
            </div>

            {/* Content & Use Cases */}
            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {ind.description}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  Specialized Implementations:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ind.keyUseCases.map((useCase, uIdx) => (
                    <div
                      key={uIdx}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (ind.slug === 'jewellery-retail') navigate('/demos/ecommerce');
                    else if (ind.slug === 'car-rental-fleet') navigate('/demos/ai-automation');
                    else navigate('/demos');
                  }}
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Explore Relevant Demos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <GoldButton
                  size="sm"
                  variant="solid"
                  onClick={() => navigate('/book-consultation')}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Consult for {ind.name.split(' ')[0]}
                </GoldButton>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
