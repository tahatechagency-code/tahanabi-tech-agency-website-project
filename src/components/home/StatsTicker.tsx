import React from 'react';
import { Briefcase, Bot, Globe2, ThumbsUp, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StatsTicker: React.FC = () => {
  const { stats } = useData();

  const getIcon = (id: string) => {
    switch (id) {
      case 'stat-projects':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'stat-automations':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'stat-countries':
        return <Globe2 className="w-5 h-5 text-amber-400" />;
      case 'stat-satisfaction':
        return <ThumbsUp className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="relative py-10 border-y border-amber-500/15 bg-gradient-to-r from-slate-950 via-[#0b1021] to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
                  {getIcon(stat.id)}
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gold-gradient font-mono">
                  {stat.value}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 text-center sm:text-left mt-0.5 line-clamp-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
