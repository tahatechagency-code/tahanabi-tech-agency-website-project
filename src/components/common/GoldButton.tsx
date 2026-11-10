import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 font-medium',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
  };

  const variantClasses = {
    solid:
      'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:brightness-110 active:scale-[0.98] border border-amber-300/60 font-semibold',
    outline:
      'bg-slate-950/70 text-amber-300 border border-amber-400/50 hover:bg-amber-400/10 hover:border-amber-300 hover:text-white shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-[0.98]',
    glass:
      'bg-slate-900/60 text-slate-200 border border-slate-700/80 hover:border-amber-400/50 hover:text-amber-300 backdrop-blur-md active:scale-[0.98]',
    ghost:
      'text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 active:scale-[0.98]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
