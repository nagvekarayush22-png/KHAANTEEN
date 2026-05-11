import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, ArrowRight, Shield, User as UserIcon, GraduationCap, Briefcase, Loader2, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

type Role = "student" | "admin";

import { Logo } from "../components/Logo";

export const Login: React.FC = () => {
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Smooth delay for animation
    setTimeout(() => {
      setIsLoggingIn(false);
      setShowSuccessAnim(true);
      
      localStorage.setItem("user", JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0] || "Ayush",
        email: email,
        role: role
      }));

      // After success animation, navigate
      setTimeout(() => {
        navigate(`/${role}-dashboard`);
      }, 2000);
    }, 1500);
  };

  const roles: { id: Role, icon: React.ReactNode, label: string, color: string }[] = [
    { id: "student", icon: <GraduationCap size={20} />, label: "USER", color: "bg-[#007AFF]" },
    { id: "admin", icon: <Shield size={20} />, label: "ADMIN", color: "bg-[#010816]" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#F8FAFC]">
      
      {/* Background Image - Campus Vibe */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[40s] ease-linear scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#010816]/70 via-[#010816]/30 to-transparent" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnim && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="w-32 h-32 bg-[#E31E24] rounded-[40px] flex items-center justify-center mb-10 shadow-2xl shadow-red-500/30"
            >
              <CheckCircle2 className="text-white" size={64} strokeWidth={3} />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-display font-black text-gray-900 mb-4 tracking-tighter"
            >
              WELCOME BACK
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#007AFF] font-black tracking-[0.4em] uppercase text-xs"
            >
              Syncing Smart Campus Profile...
            </motion.p>
            
            <div className="mt-12 w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ delay: 0.7, duration: 1.2, ease: "easeInOut" }}
                 className="h-full bg-[#E31E24] shadow-[0_0_15px_rgba(227,30,36,0.3)]"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/90 backdrop-blur-3xl w-full max-w-md rounded-[48px] p-10 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-white"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E31E24] via-[#007AFF] to-[#E31E24] animate-shimmer" />
        
        <div className="flex flex-col items-center mb-10">
          <Logo className="mb-6 scale-125" />
          <h2 className="text-4xl font-display font-black text-gray-900 mb-2 tracking-tight">Access Portal</h2>
          <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">Smart Campus Dining Network</p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 mb-8 bg-gray-50/50 p-2 rounded-[28px] border border-gray-100">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1.5 py-4 rounded-[22px] transition-all relative overflow-hidden z-10",
                role === r.id ? "text-white" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <span className="relative z-20">{React.cloneElement(r.icon as React.ReactElement, { size: 18 })}</span>
              <span className="text-[9px] font-black uppercase tracking-widest relative z-20">{r.label}</span>
              {role === r.id && (
                <motion.div 
                  layoutId="activeRole" 
                  className={cn("absolute inset-0 z-0 shadow-lg shadow-gray-200", r.color)}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-4">University ID / Email</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007AFF] transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="2103031234@paruluniversity.ac.in"
                className="w-full bg-white border border-gray-100 rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 placeholder:text-gray-200 focus:outline-none focus:border-[#007AFF]/50 focus:ring-4 focus:ring-[#007AFF]/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-4">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007AFF] transition-colors" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white border border-gray-100 rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 placeholder:text-gray-200 focus:outline-none focus:border-[#007AFF]/50 focus:ring-4 focus:ring-[#007AFF]/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoggingIn}
            className="w-full bg-[#E31E24] text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all mt-8 shadow-2xl shadow-red-500/30 text-sm"
          >
            {isLoggingIn ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                AUTHENTICATE ACCESS
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-6">
            <Link to="#" className="text-[10px] font-black text-gray-300 hover:text-[#007AFF] transition-colors uppercase tracking-widest decoration-1 underline underline-offset-4">
                Forgot password?
            </Link>
            <div className="flex items-center gap-4 w-full">
               <div className="h-px flex-1 bg-gray-50" />
               <span className="text-[10px] font-black text-gray-200 uppercase tracking-widest">Powered by Smart Campus AI</span>
               <div className="h-px flex-1 bg-gray-50" />
            </div>
        </div>
      </motion.div>
    </div>
  );
};
