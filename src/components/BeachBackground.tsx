import { motion } from "motion/react";
import React from "react";
import { cn } from "../lib/utils";

export const BeachBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#010816]">
      {/* Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#010816] via-[#021027] to-[#0a1b3d]" />
      
      {/* Immersive Campus Visual Gradient */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')] bg-cover bg-center opacity-[0.12] scale-105" />

      {/* Animated Light Rays */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-brand-neon-blue/20 to-transparent rotate-[20deg] blur-sm animate-pulse" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-brand-red/20 to-transparent -rotate-[15deg] blur-sm animate-pulse delay-700" />
      
      {/* Floating Particles (Enhanced) */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5
          }}
          animate={{ 
            y: [null, "-20%"],
            x: [null, (Math.random() - 0.5) * 20 + "%"],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={cn(
            "absolute w-[2px] h-[2px] rounded-full blur-[1px]",
            i % 3 === 0 ? "bg-brand-neon-blue" : i % 3 === 1 ? "bg-brand-red" : "bg-white"
          )}
        />
      ))}

      {/* Dynamic Ambient Blur */}
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-brand-neon-blue/5 blur-[150px] rounded-full" />
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full" />
      
      {/* Noise Texture for that Cinematic look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
