import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TestimonialItem } from '../../types/models';
import { GlassCard } from '../common/GlassCard';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <GlassCard glow padding="lg" className="flex flex-col justify-between h-full">
      <div>
        {/* Rating Stars & Region Flag */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span>{testimonial.flag}</span>
            <span className="text-[11px] font-medium">{testimonial.country}</span>
          </div>
        </div>

        {/* Review Quote */}
        <div className="relative mb-6">
          <Quote className="w-6 h-6 text-amber-400/20 absolute -top-2 -left-1" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic pl-5">
            &quot;{testimonial.reviewText}&quot;
          </p>
        </div>
      </div>

      {/* Client Identity & Verified Project */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {testimonial.avatarUrl ? (
            <img
              src={testimonial.avatarUrl}
              alt={testimonial.clientName}
              className="w-10 h-10 rounded-full object-cover border border-amber-400/40 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-xs">
              {testimonial.clientName.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">
              {testimonial.clientName}
            </div>
            <div className="text-[11px] text-slate-400">
              {testimonial.clientRole}, <span className="text-slate-300">{testimonial.companyName}</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          <ShieldCheck className="w-3 h-3" />
          <span>Verified Project</span>
        </div>
      </div>
    </GlassCard>
  );
};
