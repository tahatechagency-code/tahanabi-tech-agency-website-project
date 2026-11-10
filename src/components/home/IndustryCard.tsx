import React from 'react';
import {
  Gem,
  Car,
  UtensilsCrossed,
  Building2,
  Stethoscope,
  Store,
  GraduationCap,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { IndustryItem } from '../../types/models';
import { useData } from '../../context/DataContext';

interface IndustryCardProps {
  industry: IndustryItem;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  const { navigate } = useData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gem':
        return <Gem className="w-5 h-5 text-amber-300" />;
      case 'Car':
        return <Car className="w-5 h-5 text-amber-300" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-300" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-300" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-amber-300" />;
      case 'Store':
        return <Store className="w-5 h-5 text-amber-300" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-300" />;
      default:
        return <Layers className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div
      onClick={() => navigate('/industries')}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50"
    >
      {/* Background Image */}
      <img
        src={industry.imageUrl}
        alt={industry.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
      />

      {/* Dark & Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
        {/* Top Icon Pill */}
        <div className="self-start p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-400/30 shadow-md">
          {getIcon(industry.iconName)}
        </div>

        {/* Bottom Details */}
        <div className="space-y-1.5">
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            {industry.name}
          </h4>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {industry.description}
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-400 opacity-90 group-hover:opacity-100 group-hover:text-amber-300 transition-opacity">
            <span>Explore Industry Case</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
