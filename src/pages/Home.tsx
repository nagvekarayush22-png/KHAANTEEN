import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Clock, 
  Users, 
  TrendingUp, 
  Smile, 
  Utensils, 
  ShoppingCart, 
  History, 
  Wallet, 
  LifeBuoy,
  ChevronRight,
  Star,
  Plus,
  ShieldCheck,
  Zap,
  Globe,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";
import { MENU_ITEMS } from "../constants";
import { cn } from "../lib/utils";
import { HeroScrollDemo } from "../components/HeroScrollDemo";
import { FloatingActionMenuDemo } from "../components/FloatingActionMenuDemo";

import { Logo } from "../components/Logo";

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Tea & Beverages", "Snacks & Light Bites", "Main Course", "Rice & Pulao", "Premium Dishes", "Extras"];

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS.slice(0, 8) 
    : MENU_ITEMS.filter(item => item.category === activeCategory).slice(0, 8);


  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      
      {/* Floating Side Bar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3">
        {[
          { icon: <Utensils size={20} />, label: "Menu", path: "/menu" },
          { icon: <ShoppingCart size={20} />, label: "Cart", path: "/menu" },
          { icon: <History size={20} />, label: "Orders", path: "/student-dashboard" },
          { icon: <Wallet size={20} />, label: "Wallet", path: "/student-dashboard" },
          { icon: <LifeBuoy size={20} />, label: "Support", path: "/contact" },
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ x: -8 }}>
            <Link
              to={item.path}
              className="w-16 h-16 bg-white dark:bg-gray-900 shadow-2xl rounded-[20px] flex flex-col items-center justify-center gap-1 group border border-gray-100 dark:border-gray-800 hover:border-[#E31E24]/30 transition-all"
            >
              <div className="text-gray-400 group-hover:text-[#E31E24] transition-colors">
                {item.icon}
              </div>
              <span className="text-[7px] font-black uppercase text-gray-300 group-hover:text-[#E31E24] tracking-tighter">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden flex flex-col justify-center items-center text-center">
        {/* Campus Panorama - Premium Dark Vibe */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#010816] via-[#010816]/70 to-[#010816]" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#010816]/40 to-[#010816]/90" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-32 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
             <div className="bg-[#E31E24]/10 backdrop-blur-md text-[#E31E24] text-[9px] sm:text-[10px] font-black px-4 py-1.5 rounded-full mb-8 uppercase tracking-[0.2em] shadow-2xl border border-[#E31E24]/20 shadow-red-500/10">
                Campus Smart Dining Protocol v2.0
             </div>
             
             <div className="flex flex-col items-center mb-6">
                <Logo isDark={true} className="scale-[1.3] sm:scale-[1.6] md:scale-[2] mb-10" />
                
                <h1 className="fluid-display font-black text-[#E31E24] normal-case tracking-normal drop-shadow-2xl font-signature">
                   <span className="block mb-2 -rotate-2 text-8xl md:text-[10rem]">Tastes Like</span>
                   <span className="block rotate-1 translate-x-4">The Future.</span>
                </h1>
             </div>

             <p className="text-white/60 text-sm sm:text-base md:text-lg font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                Connect with the pulse of PU Goa. High-speed, AI-driven ordering system tailored for the modern student lifestyle.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-md">
               <Link to="/menu" className="w-full sm:w-auto group px-10 py-5 bg-[#E31E24] text-white rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_50px_-10px_rgba(227,30,36,0.4)] hover:scale-105 active:scale-95 transition-all">
                 <Utensils size={18} className="group-hover:rotate-12 transition-transform" />
                 Launch Menu
               </Link>
               <Link to="/smart-features" className="w-full sm:w-auto px-10 py-5 glass-dark text-white rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 active:scale-95 transition-all">
                 Core Intel
                 <ArrowRight size={18} />
               </Link>
             </div>
          </motion.div>
        </div>
        
        {/* Animated Background Decor */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-600/5 blur-[150px] rounded-full animate-glow" />
      </section>

      <HeroScrollDemo />

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Menu Explore */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 tracking-tight">Explore Our Menu</h2>
                <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-1 gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all shrink-0 border border-transparent",
                        activeCategory === cat ? "bg-[#E31E24] text-white shadow-lg shadow-red-500/20 border-[#E31E24]" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl sm:rounded-[40px] p-4 sm:p-6 card-shadow border border-gray-50 flex flex-col group min-w-0 h-full"
                  >
                    <div className="relative aspect-square mb-4 sm:mb-6 rounded-xl sm:rounded-[32px] overflow-hidden shadow-sm shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center gap-1 shadow-sm">
                        <Star size={10} className="text-yellow-400 fill-yellow-400 sm:w-3" />
                        <span className="text-[10px] sm:text-xs font-black">4.2</span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className="font-display font-black text-sm sm:text-lg text-gray-900 mb-1 leading-tight line-clamp-2 min-h-[2.5em]">{item.name}</h3>
                      <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-gray-50 gap-2">
                        <span className="text-base sm:text-2xl font-display font-black text-[#010816]">₹{item.price}</span>
                        <Link to="/menu" className="bg-[#E31E24] text-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl hover:scale-110 transition-transform shadow-md shadow-red-500/10 shrink-0">
                          <Plus size={16} className="sm:w-6" strokeWidth={3} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/menu" className="inline-flex items-center gap-3 px-10 py-4 bg-white border border-gray-100 rounded-2xl font-black text-[#007AFF] text-sm shadow-xl shadow-blue-500/5 hover:bg-gray-50 transition-all">
                  View Full Menu
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            {/* Bottom Login & Carousel Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-gray-50">
                  <h3 className="text-2xl font-display font-black mb-1">Welcome to PU Goa!</h3>
                  <p className="text-gray-400 text-sm mb-8 font-medium">Login to continue your smart journey</p>
                  <div className="space-y-3">
                    <Link to="/login" className="w-full py-4 bg-[#E31E24] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-red-500/10">
                      Student Login
                    </Link>
                    <Link to="/login" className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/10">
                      Faculty Login
                    </Link>
                    <Link to="/login" className="w-full py-4 bg-[#010816] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-gray-900/10">
                      Admin Login
                    </Link>
                  </div>
               </div>

               <div className="relative rounded-[40px] overflow-hidden group h-full min-h-[300px] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010816]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <p className="text-white text-xl font-display font-black leading-tight mb-4 tracking-tight">
                        More Than A New Campus.<br />A New Chapter.
                     </p>
                     <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Launching Soon
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="lg:col-span-4 space-y-8">
            {/* AI Recommendation */}
            <div className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-[40px] p-8 card-shadow border border-gray-100">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-display font-black text-gray-900 flex items-center gap-2">
                    AI Recommends ✨
                 </h3>
                 <button className="text-xs font-black text-[#007AFF] uppercase tracking-widest">See all</button>
               </div>
               <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm group hover:border-[#00D2FF]/30 transition-all cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&w=800&q=80" className="w-16 h-16 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-[#E31E24] uppercase tracking-tighter">Popular Choice</span>
                    <h4 className="font-black text-gray-900">Paneer Paratha</h4>
                    <span className="font-black text-[#007AFF]">₹80</span>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-[#007AFF]" />
               </div>
            </div>

            {/* User Profile Mini */}
            <div className="bg-[#007AFF] rounded-[40px] p-8 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black">A</div>
                    <div>
                      <h4 className="font-black text-lg">Hello, Ayush! 👋</h4>
                      <span className="text-[9px] opacity-70 font-black uppercase tracking-[0.2em]">Verified Student</span>
                    </div>
                 </div>
                 
                 <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 mb-6 border border-white/10">
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em] block mb-2 font-sans">Wallet Balance</span>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-display font-black">₹540.00</span>
                      <button className="bg-white text-[#007AFF] px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-white/10">Add Money</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: "Points", v: "1200" },
                      { l: "Orders", v: "7" },
                      { l: "Fave", v: "12" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/5">
                        <span className="block text-[8px] font-black uppercase opacity-60 mb-1">{item.l}</span>
                        <span className="block font-black">{item.v}</span>
                      </div>
                    ))}
                 </div>
               </div>
               {/* Abs decor */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[60px] rounded-full" />
            </div>

            {/* Live Tracking */}
            <div className="bg-white rounded-[40px] p-8 card-shadow border border-gray-100">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="font-display font-black text-gray-900">Live Order Tracking</h3>
                 <button className="text-xs font-black text-[#007AFF] uppercase tracking-widest">View All</button>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <img src="https://images.unsplash.com/photo-1601050691593-3ea7601e3ca6?auto=format&fit=crop&w=800&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-black text-sm text-gray-800">Masala Dosa</h4>
                          <span className="text-[9px] font-black text-green-500 uppercase flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                            <Zap size={8} className="fill-green-500" /> Preparing
                          </span>
                        </div>
                        <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                           <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-gradient-to-r from-[#007AFF] to-[#00D2FF]" />
                        </div>
                        <div className="flex justify-between mt-2.5">
                          <span className="text-[9px] font-black text-gray-300">ID #PU2415</span>
                          <span className="text-[9px] font-black text-[#007AFF] tracking-wider uppercase">12 min rem.</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Why Join Grid */}
            <div className="grid grid-cols-2 gap-4">
               {[
                 { t: "AI Powered", i: <Zap size={18} className="text-[#007AFF]" /> },
                 { t: "Live Stats", i: <Users size={18} className="text-orange-400" /> },
                 { t: "Secure Pay", i: <ShieldCheck size={18} className="text-green-500" /> },
                 { t: "Digital ID", i: <History size={18} className="text-purple-500" /> },
                 { t: "Eco Canteen", i: <Leaf size={18} className="text-emerald-500" /> },
                 { t: "Hygienic", i: <ShieldCheck size={18} className="text-[#E31E24]" /> },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-5 rounded-[32px] border border-gray-50 flex flex-col items-center text-center gap-3 card-shadow transition-all hover:scale-105 hover:border-blue-100">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-blue-50">{item.i}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-tight">{item.t}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-100">
         <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left mb-20">
            <div className="max-w-lg">
               <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                 <Logo className="scale-110" />
               </div>
               <h4 className="text-2xl sm:text-3xl font-display font-black text-gray-900 mb-4 tracking-tight">One step closer to shaping Goa's future.</h4>
               <p className="text-gray-400 font-medium text-base sm:text-lg leading-relaxed">Dedicated to building a <span className="text-[#007AFF] font-black">national education hub</span> through innovation, smart campus technology, and excellence in student services.</p>
            </div>
            <div className="flex gap-4 sm:gap-6">
               <motion.div whileHover={{ y: -5, scale: 1.05 }} className="w-16 h-16 rounded-[24px] bg-white border border-gray-100 flex items-center justify-center shadow-xl shadow-gray-200/50 cursor-pointer group hover:border-[#007AFF]/20 transition-all">
                  <Globe size={28} className="text-gray-300 group-hover:text-[#007AFF] transition-colors" />
               </motion.div>
               <motion.div whileHover={{ y: -5, scale: 1.05 }} className="w-16 h-16 rounded-[24px] bg-white border border-gray-100 flex items-center justify-center shadow-xl shadow-gray-200/50 cursor-pointer group hover:border-[#E31E24]/20 transition-all">
                  <Users size={28} className="text-gray-300 group-hover:text-[#E31E24] transition-colors" />
               </motion.div>
            </div>
         </div>
         <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">
                 © 2024 Parul University Goa
              </span>
              <div className="flex gap-6">
                 {["Terms", "Privacy", "Credits"].map(t => (
                    <span key={t} className="text-gray-300 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-[#E31E24] transition-colors">{t}</span>
                 ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Online</span>
            </div>
         </div>
      </footer>
      <FloatingActionMenuDemo />
    </div>
  );
};
