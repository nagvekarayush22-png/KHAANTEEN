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
        className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 drop-shadow-md"
        whileHover={{ scale: 1.05 }}
      >
        {/* Cloche Icon */}
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff6b00" strokeWidth="6" />
            <path d="M30 70 A 20 20 0 0 1 70 70" fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            <line x1="30" y1="70" x2="70" y2="70" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            <line x1="50" y1="70" x2="50" y2="50" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="45" r="5" fill="#333" />
        </svg>
      </motion.div>

      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-display font-black text-xl md:text-3xl tracking-tighter leading-none transition-colors",
            "text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          )}>
            KHAAN<span className={"text-[#ff6b00]"}>टीन</span>
          </span>
          <span className={cn(
            "text-[7px] font-black uppercase tracking-[0.2em] leading-none mt-1 text-gray-400"
          )}>
            SMART CAMPUS DINING
          </span>
        </div>
      )}
    </div>
  );
};
