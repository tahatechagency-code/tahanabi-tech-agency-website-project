import React from 'react';
import { ExternalLink, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { DemoItem } from '../../types/models';
import { GoldButton } from '../common/GoldButton';
import { useData } from '../../context/DataContext';

interface DemoCardProps {
  demo: DemoItem;
}

export const DemoCard: React.FC<DemoCardProps> = ({ demo }) => {
  const { openDemoModal, navigate } = useData();

  const handleLaunch = () => {
    if (demo.slug === 'royalsparkle-jewellers') {
      navigate('/demos/ecommerce');
    } else if (demo.slug === 'diamondlease-car-rental') {
      navigate('/demos/ai-automation');
    } else {
      openDemoModal(demo);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-slate-900/80 border border-amber-500/20 hover:border-amber-400/50 shadow-xl shadow-black/60 transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between group">
      <div>
        {/* Thumbnail with overlay & badge */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
          <img
            src={demo.coverImage}
            alt={demo.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Industry Pill */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/30 text-[11px] font-medium text-amber-300">
            {demo.industry}
          </div>

          {/* Live Tag */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Demo</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
              {demo.title}
            </h4>
          </div>
        </div>

        {/* Content & Features */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {demo.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {demo.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Feature Highlights */}
          <ul className="space-y-1.5 pt-1 border-t border-slate-800/60">
            {demo.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <GoldButton
          size="sm"
          fullWidth
          variant="solid"
          onClick={handleLaunch}
          icon={<Eye className="w-3.5 h-3.5" />}
        >
          View Live Demo
        </GoldButton>
      </div>
    </div>
  );
};
