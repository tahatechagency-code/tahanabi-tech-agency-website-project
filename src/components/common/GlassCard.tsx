import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  borderGold?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  glow = false,
  borderGold = true,
  padding = 'lg',
  hoverEffect = true,
  className = '',
  children,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6 lg:p-7',
    xl: 'p-6 sm:p-8 lg:p-10',
  };

  return (
    <div
      className={`rounded-2xl relative overflow-hidden backdrop-blur-xl ${
        borderGold
          ? 'border border-amber-500/20 hover:border-amber-400/40'
          : 'border border-slate-800'
      } ${
        glow
          ? 'shadow-[0_0_30px_rgba(212,175,55,0.12)]'
          : 'shadow-lg shadow-black/40'
      } ${
        hoverEffect
          ? 'transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_12px_35px_rgba(212,175,55,0.15)]'
          : ''
      } bg-gradient-to-b from-slate-900/85 via-slate-900/60 to-slate-950/90 ${
        paddingClasses[padding]
      } ${className}`}
      {...props}
    >
      {/* Subtle top edge metallic glow accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
