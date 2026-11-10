import React from 'react';
import {
  ShoppingBag,
  Bot,
  Code2,
  Network,
  Globe,
  ArrowRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { ServiceItem } from '../../types/models';
import { GlassCard } from '../common/GlassCard';
import { useData } from '../../context/DataContext';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { navigate } = useData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
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

  const handleClick = () => {
    if (service.slug === 'ecommerce-websites') {
      navigate('/demos/ecommerce');
    } else if (service.slug === 'ai-automation') {
      navigate('/demos/ai-automation');
    } else {
      navigate('/solutions');
    }
  };

  return (
    <GlassCard
      glow
      padding="lg"
      className="flex flex-col justify-between h-full group cursor-pointer"
      onClick={handleClick}
    >
      <div>
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/30 group-hover:border-amber-400/60 group-hover:scale-105 transition-all duration-300">
            {getIcon(service.iconName)}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/80 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
            Enterprise Ready
          </span>
        </div>

        {/* Titles */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-xs font-medium text-amber-400/90 mt-0.5 mb-2.5">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="space-y-1.5 mb-6">
          {service.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
        <span>Explore Solution</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </GlassCard>
  );
};
