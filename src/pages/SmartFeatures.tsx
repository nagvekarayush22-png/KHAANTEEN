import React from "react";
import { motion } from "framer-motion";
import { Brain, Users, Ticket, BarChart3, Utensils, Mic, Zap, Cpu, Sparkles, Clock } from "lucide-react";
import { cn } from "../lib/utils";

const features = [
  {
    title: "AI Meal Recommendations",
    description: "Personalized suggestions based on your health goals and past ordering habits.",
    icon: <Brain className="text-brand-neon-blue" />,
    color: "bg-blue-50",
    glow: "shadow-blue-500/20"
  },
  {
    title: "Live Queue Tracking",
    description: "Real-time visibility into canteen crowd density and estimated wait times.",
    icon: <Users className="text-[#E31E24]" />,
    color: "bg-red-50",
    glow: "shadow-red-500/20"
  },
  {
    title: "Smart Token System",
    description: "Scan-and-go digital tokens that eliminate the need for physical queues.",
    icon: <Ticket className="text-green-500" />,
    color: "bg-green-50",
    glow: "shadow-green-500/20"
  },
  {
    title: "Waste Reduction Analytics",
    description: "Helping the campus stay green by predicting food demand with 95% accuracy.",
    icon: <BarChart3 className="text-yellow-500" />,
    color: "bg-yellow-50",
    glow: "shadow-yellow-500/20"
  }
];

export const SmartFeatures: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31E24]/5 rounded-full mb-6 border border-[#E31E24]/10"
        >
          <Zap size={14} className="text-[#E31E24]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E31E24]">Next-Gen Campus Experience</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black text-gray-900 mb-8 tracking-tighter"
        >
          Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31E24] to-[#007AFF]">E-Canteen</span> Solutions.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed mb-12"
        >
          Experience the future of campus dining at Parul University Goa. Our AI-driven platform optimizes every aspect of your meal journey.
        </motion.p>
      </section>

      {/* Futuristic Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "group relative p-8 rounded-[40px] bg-white border border-gray-100 shadow-2xl transition-all duration-500 overflow-hidden",
                feature.glow
              )}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 120 })}
              </div>
              
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner", feature.color)}>
                {React.cloneElement(feature.icon as React.ReactElement, { size: 24 })}
              </div>
              
              <h3 className="text-xl font-display font-black text-gray-900 mb-4 tracking-tight leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[#E31E24] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 cursor-pointer">
                Learn More
                <Sparkles size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Capabilities Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-gray-900 rounded-[60px] p-8 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E31E24] via-transparent to-[#007AFF]" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-8 border border-white/10">
                <Cpu size={14} className="text-[#007AFF]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#007AFF]">Advanced Architecture</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 tracking-tight">
                Predictive Analytics & <br />
                <span className="text-[#E31E24]">Real-time Ecosystem.</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: <Clock />, text: "Peak-hour prediction for stress-free ordering" },
                  { icon: <Utensils />, text: "Automatic menu rotation based on stock levels" },
                  { icon: <Mic />, text: "Voice-activated ordering interface (Beta testing)" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/70 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-[#E31E24]/20 group-hover:text-[#E31E24] transition-all">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ rotate: -5, scale: 0.9 }}
                whileInView={{ rotate: 0, scale: 1 }}
                className="aspect-square bg-gradient-to-tr from-gray-800 to-gray-700 rounded-[40px] p-1 shadow-2xl relative overflow-hidden"
              >
                {/* Simulated Chart Interface */}
                <div className="w-full h-full bg-[#0A0A0A] rounded-[38px] p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black text-white uppercase tracking-widest">Live Tracking</span>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 bg-white/20 rounded-full" />
                       <div className="w-2 h-2 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 50, 60].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex-1 bg-gradient-to-t from-[#E31E24] to-red-400 rounded-t-lg"
                      />
                    ))}
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Efficiency</span>
                        <span className="text-xl font-display font-black text-white">98.4%</span>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Wait Time</span>
                        <span className="text-xl font-display font-black text-white">3.2m</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
