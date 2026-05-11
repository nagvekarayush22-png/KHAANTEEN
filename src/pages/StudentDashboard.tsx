import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Wallet, 
  History, 
  Clock, 
  Star,
  ChevronRight,
  Zap,
  ArrowRight,
  User as UserIcon,
  Bell,
  Search,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  CreditCard,
  Gift
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useApp } from "../context/AppContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', total: 120 },
  { name: 'Tue', total: 210 },
  { name: 'Wed', total: 150 },
  { name: 'Thu', total: 300 },
  { name: 'Fri', total: 180 },
  { name: 'Sat', total: 250 },
  { name: 'Sun', total: 100 },
];

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = (end / duration) * 10;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
};

import { Logo } from "../components/Logo";

export const StudentDashboard: React.FC = () => {
  const { theme, toggleTheme, unreadCount } = useApp();
  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Student","role":"student"}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden transition-colors duration-500">
      {/* Background Subtle Pattern/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.03] scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')" }}
      />
      
      {/* Sidebar - Desktop Focus */}
      <aside className="hidden md:flex w-20 lg:w-24 bg-white border-r border-gray-100 flex-col items-center py-6 fixed left-0 top-0 bottom-0 z-50 transition-colors duration-500">
        <Link to="/" className="w-16 h-16 mb-8 group transition-transform hover:scale-110 flex items-center justify-center">
          <Logo showText={false} className="scale-75" />
        </Link>
        
        <nav className="flex flex-col gap-4">
          {[
            { icon: <LayoutDashboard size={20} />, path: "/student-dashboard", active: true, label: "Home" },
            { icon: <ShoppingBag size={20} />, path: "/menu", active: false, label: "Order" },
            { icon: <History size={20} />, path: "#", active: false, label: "History" },
            { icon: <Wallet size={20} />, path: "#", active: false, label: "Wallet" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              title={item.label}
              className={cn(
                "p-3 rounded-xl transition-all group relative",
                item.active 
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-500/20" 
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {item.icon}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-100">
           <button 
             onClick={handleLogout}
             className="group w-full flex items-center gap-3 p-2 bg-gray-50 hover:bg-white rounded-3xl border border-transparent hover:border-gray-100 transition-all shadow-sm hover:shadow-xl group"
           >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 border-2 border-white overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:block text-left overflow-hidden">
                 <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest truncate">User</p>
                 <p className="text-[8px] font-bold text-gray-400 uppercase truncate">Sign Out</p>
              </div>
              <LogOut size={14} className="hidden lg:block ml-auto mr-2 text-gray-300 group-hover:text-brand-orange transition-colors" />
           </button>
        </div>
      </aside>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50 flex items-center justify-around px-6">
        {[
          { icon: <LayoutDashboard size={20} />, path: "/student-dashboard", active: true },
          { icon: <ShoppingBag size={20} />, path: "/menu", active: false },
          { icon: <History size={20} />, path: "#", active: false },
          { icon: <Wallet size={20} />, path: "#", active: false },
          { icon: <UserIcon size={20} />, path: "#", active: false },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 p-2 transition-all",
              item.active ? "text-brand-orange" : "text-gray-300"
            )}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      <main className="flex-1 md:ml-20 lg:ml-24 p-4 sm:p-6 md:p-8 pb-32 md:pb-8 max-w-full overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="min-w-0">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl sm:text-2xl md:text-3xl font-display font-black text-gray-900 tracking-tight truncate"
              >
                Canteen Dashboard
              </motion.h1>
              <p className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm truncate uppercase tracking-widest">
                Welcome back, {user.name}.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <Link to="/menu" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all">
                <ShoppingBag size={18} />
                <span className="whitespace-nowrap">Explore Menu</span>
             </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
           <div className="lg:col-span-8 space-y-6 sm:space-y-8 relative">
              {/* Subtle Background Glow for Main Content */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-50 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute top-1/2 -right-20 w-80 h-80 bg-orange-50 blur-[150px] rounded-full pointer-events-none" />

              {/* Analytics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                 {[
                   { label: "Wallet", value: 540, icon: <Wallet />, color: "bg-blue-50 text-blue-600" },
                   { label: "Rewards", value: 1245, icon: <Star />, color: "bg-yellow-50 text-yellow-600" },
                   { label: "Orders", value: 42, icon: <ShoppingBag />, color: "bg-red-50 text-red-600" },
                   { label: "XP", value: 890, icon: <Gift />, color: "bg-purple-50 text-purple-600" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                     className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-200/20 transition-all cursor-pointer"
                   >
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform", stat.color)}>
                        {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
                     </div>
                     <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">{stat.label}</span>
                     <p className="text-2xl font-display font-black text-gray-900">
                        {stat.label === "Wallet" && "₹"}<Counter value={stat.value} />
                     </p>
                   </motion.div>
                 ))}
              </div>

              {/* Active Order Status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[40px] p-8 sm:p-10 border border-gray-50 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/20 relative overflow-hidden group z-10"
              >
                 <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                       <div className="flex items-center gap-5">
                          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-[24px] flex items-center justify-center text-[#E31E24] shrink-0 group-hover:scale-110 transition-transform">
                             <Clock size={32} />
                          </div>
                          <div className="min-w-0">
                             <h3 className="font-display font-black text-xl sm:text-2xl text-gray-900 dark:text-white truncate uppercase tracking-tight">Active Order #PU9921</h3>
                             <div className="flex items-center gap-2 mt-2">
                                <motion.span 
                                  animate={{ opacity: [1, 0.4, 1] }} 
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-2.5 h-2.5 bg-blue-500 rounded-full" 
                                />
                                <span className="text-[10px] font-black text-[#007AFF] uppercase tracking-widest">Chef is Preparing your Meal</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-6 sm:pt-0 border-gray-50 dark:border-gray-800">
                          <span className="text-3xl sm:text-4xl font-display font-black text-[#E31E24]">8:30 <span className="text-sm font-sans tracking-tight">MIN</span></span>
                          <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">TOKEN:</span>
                            <span className="text-[10px] font-black text-gray-900 dark:text-white">XJ92</span>
                          </div>
                       </div>
                    </div>

                    <div className="h-3 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 mb-10 p-0.5">
                       <motion.div 
                          initial={{ width: "0%" }} 
                          animate={{ width: "65%" }} 
                          className="h-full bg-gradient-to-r from-[#E31E24] via-[#007AFF] to-[#01D2FF] rounded-full relative"
                       >
                          <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full m-0.5 shadow-sm" />
                       </motion.div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                             <Utensils size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Your Items</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Masala Chai + Samosa (2pcs)</p>
                          </div>
                       </div>
                       <button className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-[10px] font-black text-[#007AFF] uppercase tracking-widest rounded-2xl flex items-center gap-2 self-end sm:self-auto hover:bg-[#007AFF] hover:text-white transition-all shadow-sm">
                         Real-time Track <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/20 dark:bg-red-900/5 blur-[120px] rounded-full pointer-events-none" />
              </motion.div>

              {/* Spending Habits Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
                 {/* Spending Habits Chart */}
                 <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-50 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/20">
                    <div className="flex items-center justify-between mb-8">
                       <div>
                          <h3 className="font-display font-black text-lg text-gray-900 dark:text-white uppercase tracking-tighter">Usage Stats</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Weekly Analytics</p>
                       </div>
                       <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/10 flex items-center justify-center text-green-600">
                          <TrendingUp size={20} />
                       </div>
                    </div>
                    
                    <div className="h-40 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                             <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#E31E24" stopOpacity={0.1}/>
                                   <stop offset="95%" stopColor="#E31E24" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f2937' : '#f3f4f6'} />
                             <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                             <Tooltip 
                               contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: '900', backgroundColor: theme === 'dark' ? '#111827' : '#ffffff' }}
                             />
                             <Area type="monotone" dataKey="total" stroke="#E31E24" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 {/* Recent Activity Mini List */}
                 <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-50 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/20">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="font-display font-black text-lg text-gray-900 dark:text-white uppercase tracking-tighter">Recent</h3>
                       <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">History</button>
                    </div>
                    <div className="space-y-4">
                       {[
                          { item: "Paneer Pulao", price: "120", time: "2h ago" },
                          { item: "Veg Sandwich", price: "60", time: "Yesterday" },
                          { item: "Iced Coffee", price: "90", time: "8 May" },
                       ].map((order, i) => (
                          <div key={i} className="flex items-center justify-between group cursor-pointer">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-all">
                                   <ShoppingBag size={16} />
                                </div>
                                <div>
                                   <h4 className="font-bold text-xs text-gray-900 dark:text-white">{order.item}</h4>
                                   <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">{order.time}</span>
                                </div>
                             </div>
                             <span className="font-display font-black text-gray-900 dark:text-white text-sm">₹{order.price}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              {/* Wallet Card */}
              <div className="bg-[#0A0A0A] dark:bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-black/20 group">
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                          <CreditCard size={28} className="text-[#007AFF]" />
                       </div>
                       <div className="text-right">
                          <span className="block text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Active Balance</span>
                          <span className="text-xs font-black text-[#007AFF]">PU-GOA PAY</span>
                       </div>
                    </div>
                    
                    <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Personal Funds</h4>
                    <div className="flex items-end gap-2 mb-8">
                       <span className="text-4xl sm:text-5xl font-display font-black tracking-tighter">₹540.00</span>
                       <span className="text-xs font-black text-green-400 mb-2">+12%</span>
                    </div>

                    <button className="relative w-full py-5 bg-[#E31E24] text-white rounded-[28px] font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-red-500/40 overflow-hidden group">
                       <span className="relative z-10 flex items-center justify-center gap-2">
                          Quick Recharge 
                          <ArrowRight size={16} />
                       </span>
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 blur-[80px] rounded-full" />
              </div>

              {/* Reward Points */}
              <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-50 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/10 transition-all hover:border-[#FACC15]/20">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 flex items-center justify-center text-yellow-500">
                       <Star size={24} className="fill-yellow-500" />
                    </div>
                    <div>
                       <h4 className="font-display font-black text-gray-900 dark:text-white uppercase tracking-tighter">Elite Points</h4>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lv. 4 Silver Member</span>
                    </div>
                 </div>
                 <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Reward in <span className="text-gray-900 dark:text-white">255 pts</span></span>
                    <span className="text-xs font-black text-yellow-600">75%</span>
                 </div>
                 <div className="h-2 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "75%" }} 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600" 
                    />
                 </div>
              </div>

              {/* Smart AI Rec */}
              <div className="bg-[#007AFF] rounded-[40px] p-8 text-white shadow-2xl shadow-blue-500/40 relative overflow-hidden group">
                 <Zap className="mb-6 animate-pulse text-white group-hover:scale-110 transition-transform" />
                 <h4 className="font-display font-black text-3xl mb-3 tracking-tighter uppercase leading-none">AI Insight: <br /> <span className="text-blue-100">Midnight Snack?</span></h4>
                 <p className="text-blue-100/70 text-xs mb-8 font-medium leading-relaxed">
                    Orders for "Samosa" peak in 10 mins. Order now to skip the rush.
                 </p>
                 <Link to="/menu" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#007AFF] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                    Pre-Order Now
                    <ArrowRight size={16} />
                 </Link>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

import { Utensils } from "lucide-react";
