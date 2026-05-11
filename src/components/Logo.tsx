import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, isDark = false }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div 
        className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer Circular Tech Plate */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke={isDark ? "#ffffff" : "#E31E24"} 
            strokeWidth="2"
            strokeDasharray="10 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="50" cy="50" r="38" fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(227,30,36,0.05)"} />
        </svg>

        {/* The Fork and Spoon forming a subtle 'K' */}
        <div className="relative z-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-10 md:h-10 transform -rotate-12">
            {/* Spoon (Left part of K) */}
            <path 
              d="M10 5 C10 5, 10 15, 15 20 L15 35" 
              stroke={isDark ? "#ffffff" : "#E31E24"} 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none" 
            />
            <ellipse 
              cx="10" cy="10" rx="4" ry="6" 
              fill={isDark ? "#ffffff" : "#E31E24"} 
            />
            
            {/* Fork (Right part of K - top arm) */}
            <path 
              d="M15 20 L25 10" 
              stroke={isDark ? "#ffffff" : "#8B0000"} 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Fork (Right part of K - bottom arm) */}
            <path 
              d="M15 20 L25 30" 
              stroke={isDark ? "#ffffff" : "#8B0000"} 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            
            {/* Fork Tines */}
            <line x1="25" y1="10" x2="30" y2="5" stroke={isDark ? "rgba(255,255,255,0.7)" : "#E31E24"} strokeWidth="2" strokeLinecap="round" />
            <line x1="27" y1="12" x2="32" y2="7" stroke={isDark ? "rgba(255,255,255,0.7)" : "#E31E24"} strokeWidth="2" strokeLinecap="round" />
            <line x1="23" y1="8" x2="28" y2="3" stroke={isDark ? "rgba(255,255,255,0.7)" : "#E31E24"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {showText && (
        <div className="flex flex-col -gap-1">
          <span className={cn(
            "font-display font-black text-xl md:text-2xl tracking-tighter leading-none transition-colors",
            isDark ? "text-white" : "text-gray-900"
          )}>
            KHAAN<span className={isDark ? "text-brand-red" : "text-[#E31E24]"}>TEEN</span>
          </span>
          <span className={cn(
            "text-[8px] font-black uppercase tracking-[0.4em] leading-none text-gray-400",
            isDark && "opacity-60"
          )}>
            Smart Campus Dining
          </span>
        </div>
      )}
    </div>
  );
};
