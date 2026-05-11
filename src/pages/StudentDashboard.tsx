import React from "react";
import { motion } from "motion/react";
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
  Settings
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export const StudentDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Student","role":"student"}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Subtle Pattern/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.03] scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')" }}
      />
      
      {/* Sidebar - Desktop Focus */}
      <aside className="hidden md:flex w-20 lg:w-24 bg-white border-r border-gray-100 flex-col items-center py-6 fixed left-0 top-0 bottom-0 z-50">
        <Link to="/" className="w-16 h-16 mb-8 group transition-transform hover:scale-110 flex items-center justify-center">
          <img 
            src="https://storage.googleapis.com/static.aistudio.google.com/artifacts/ef9231f8-084a-49ae-a01f-0e1ce0743bba/input_file_0.png" 
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const span = document.createElement('span');
              span.className = 'text-xl font-serif font-black text-[#8B0000]';
              span.innerText = 'K';
              e.currentTarget.parentElement?.appendChild(span);
            }}
          />
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
                  ? "bg-[#E31E24] text-white shadow-lg shadow-red-500/20" 
                  : "text-gray-300 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {item.icon}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
           <button 
             onClick={handleLogout}
             title="Logout"
             className="p-3 rounded-xl text-gray-300 hover:text-[#E31E24] hover:bg-red-50 transition-all"
           >
              <LogOut size={20} />
           </button>
           <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
           </div>
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
              item.active ? "text-[#E31E24]" : "text-gray-300"
            )}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      <main className="flex-1 md:ml-20 lg:ml-24 p-4 sm:p-6 md:p-8 pb-32 md:pb-8 max-w-full overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center justify-center shrink-0">
              <img 
                src="https://storage.googleapis.com/static.aistudio.google.com/artifacts/0bc4d412-f044-484d-961f-1393605e7186/input_file_0.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const span = document.createElement('span');
                  span.className = 'text-lg font-serif font-black text-[#8B0000]';
                  span.innerText = 'K';
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-gray-900 tracking-tight truncate">Canteen Dashboard</h1>
              <p className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm truncate">Welcome back, {user.name}.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <Link to="/menu" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#E31E24] text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:scale-105 transition-all">
                <ShoppingBag size={18} />
                <span className="whitespace-nowrap">Order Food</span>
             </Link>
             <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 shadow-sm sm:hidden">
                <Bell size={20} />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
           <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Active Order Status */}
              <div className="bg-white rounded-3xl sm:rounded-[40px] p-6 sm:p-8 border border-gray-50 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#E31E24] shrink-0">
                             <Clock size={24} className="sm:w-7 sm:h-7" />
                          </div>
                          <div className="min-w-0">
                             <h3 className="font-display font-black text-base sm:text-xl text-gray-900 truncate">Current Order #PU9921</h3>
                             <span className="text-[9px] font-black text-[#007AFF] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">Preparing</span>
                          </div>
                       </div>
                       <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
                          <span className="text-2xl sm:text-3xl font-display font-black text-[#E31E24]">8 min</span>
                          <span className="block text-[8px] font-black uppercase text-gray-300 tracking-widest sm:mt-1">Est. Wait</span>
                       </div>
                    </div>

                    <div className="h-1.5 sm:h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100 mb-8">
                       <motion.div initial={{ width: "0%" }} animate={{ width: "65%" }} className="h-full bg-gradient-to-r from-[#E31E24] to-[#FF4D4D] rounded-full" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                       <p className="text-xs sm:text-sm font-black text-gray-500 truncate">Items: <span className="text-gray-900 ml-1">Cheese Maggi + Black Coffee</span></p>
                       <button className="text-[10px] font-black text-[#007AFF] uppercase tracking-widest flex items-center gap-2 self-end sm:self-auto">Track Detail <ChevronRight size={14} /></button>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 blur-[100px] rounded-full pointer-events-none" />
              </div>

              {/* Order History */}
              <div className="bg-white rounded-3xl sm:rounded-[40px] p-6 sm:p-8 border border-gray-50 shadow-2xl shadow-gray-200/50">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-black text-lg sm:text-xl text-gray-900">Recent Orders</h3>
                    <button className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-all">View All</button>
                 </div>
                 <div className="space-y-3 sm:space-y-4">
                    {[
                       { id: "#2410", item: "Paneer Pulao", price: "120", date: "Yesterday, 1:45 PM", status: "Delivered" },
                       { id: "#2408", item: "Veg Sandwich", price: "60", date: "10 May, 4:10 PM", status: "Delivered" },
                       { id: "#2405", item: "Cold Coffee", price: "50", date: "09 May, 10:30 AM", status: "Delivered" },
                    ].map((order, i) => (
                       <div key={i} className="flex items-center justify-between p-4 sm:p-5 bg-gray-50/50 rounded-2xl sm:rounded-3xl border border-white hover:border-gray-100 transition-all cursor-pointer">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-gray-300 shrink-0">#</div>
                             <div className="min-w-0">
                                <h4 className="font-black text-gray-900 text-xs sm:text-sm truncate">{order.item}</h4>
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter truncate block">{order.date}</span>
                             </div>
                          </div>
                          <div className="text-right shrink-0">
                             <span className="block font-display font-black text-gray-900 text-sm sm:text-base">₹{order.price}</span>
                             <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">{order.status}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              {/* Wallet Card */}
              <div className="bg-[#010816] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                          <Wallet size={28} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Portfolio</span>
                    </div>
                    
                    <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Neural Balance</h4>
                    <div className="flex items-center gap-3 mb-8">
                       <span className="text-4xl font-display font-black">₹540.00</span>
                    </div>

                    <button className="w-full py-4 bg-[#E31E24] text-white rounded-[24px] font-black text-sm hover:scale-[1.02] transition-transform shadow-xl shadow-red-500/30">
                       Top Up Credits
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
              </div>

              {/* Reward Points */}
              <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-2xl shadow-gray-200/50">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-500">
                       <Star size={20} className="fill-yellow-500" />
                    </div>
                    <div>
                       <h4 className="font-display font-black text-gray-900">Elite Points</h4>
                       <span className="text-[10px] font-black text-gray-400 uppercase">1,245 Total</span>
                    </div>
                 </div>
                 <p className="text-xs font-black text-gray-400 mb-6 uppercase tracking-widest">Next Reward in 255 pts</p>
                 <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <div className="h-full w-3/4 bg-yellow-500 animate-glow" />
                 </div>
              </div>

              {/* Smart AI Rec */}
              <div className="bg-gradient-to-br from-[#007AFF] to-[#00D2FF] rounded-[40px] p-8 text-white shadow-2xl shadow-blue-500/30">
                 <Zap className="mb-4 animate-pulse" />
                 <h4 className="font-display font-black text-2xl mb-2">Mood: Hungry?</h4>
                 <p className="text-white/80 text-sm mb-8 font-medium">According to your history, you usually order Poha at this time.</p>
                 <Link to="/menu" className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#007AFF] rounded-2xl font-black text-xs uppercase shadow-xl">
                    Order Poha Now
                    <ArrowRight size={16} />
                 </Link>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
