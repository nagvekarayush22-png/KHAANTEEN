import React from 'react';
import { motion } from 'framer-motion';

export const BeachBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* Sun/Light Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-yellow-200/20 blur-[120px] rounded-full animate-pulse" />
      
      {/* Wave Layers */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          rotate: [0, 1, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[40%] bg-blue-100/30 blur-[60px] rounded-full transform -rotate-2"
      />
      
      <motion.div 
        animate={{ 
          x: [20, -20, 20],
          rotate: [0, -1, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-25%] left-[-10%] w-[130%] h-[45%] bg-cyan-100/20 blur-[80px] rounded-full transform rotate-1"
      />

      {/* Tropical Accents (Abstract shapes representing leaves) */}
      <div className="absolute top-[20%] left-[-5%] w-64 h-64 bg-green-200/10 blur-[60px] rounded-full" />
      <div className="absolute top-[60%] right-[-5%] w-80 h-80 bg-green-300/5 blur-[70px] rounded-full" />
    </div>
  );
};
