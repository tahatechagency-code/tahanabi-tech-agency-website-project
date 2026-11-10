import React from 'react';
import { useData } from '../../context/DataContext';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const { navigate } = useData();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-bold tracking-tight',
    lg: 'text-xl sm:text-2xl font-extrabold tracking-tight',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-wider',
    lg: 'text-xs tracking-wider',
  };

  return (
    <div
      onClick={() => navigate('/')}
      className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* 3D Geometric Gold Monogram Cube */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl flex items-center justify-center p-1.5 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all duration-300 group-hover:scale-105 border border-amber-200/50`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-950 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
        >
          {/* Stylized geometric T mark */}
          <path
            d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13.5V19C13.5 19.5523 13.0523 20 12.5 20H11.5C10.9477 20 10.5 19.5523 10.5 19V8H5C4.44772 8 4 7.55228 4 7V5Z"
            fill="currentColor"
          />
          <path
            d="M12 2L19 6V18L12 22L5 18V6L12 2Z"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`text-white group-hover:text-amber-300 transition-colors leading-none font-display ${titleSizes[size]}`}
        >
          Tahanabi
        </span>
        {showSubtitle && (
          <span
            className={`text-amber-400 font-semibold uppercase leading-tight ${subtitleSizes[size]}`}
          >
            Tech Agency
          </span>
        )}
      </div>
    </div>
  );
};
