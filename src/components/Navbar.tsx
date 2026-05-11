import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu as MenuIcon, X, Moon, Sun, LogIn, Bell, LogOut, Settings, ChevronDown, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useApp } from "../context/AppContext";

import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, cart, removeFromCart, updateQuantity, cartTotal, notifications, markAsRead, unreadCount } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) setIsAccountMenuOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) setIsCartOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAccountMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const hideOnRoutes = ["/student-dashboard", "/admin-dashboard", "/faculty-dashboard"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navLinks = [
    { name: "Smart Features", path: "/smart-features" },
    { name: "About Campus", path: "/about-campus" },
    { name: "Contact", path: "/contact" },
  ];

  const isNavDark = theme === 'dark' || (!isScrolled && location.pathname === '/');

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm py-3" : "bg-transparent py-4"
    )}>
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#E31E24]" />
        <div className="flex-1 bg-[#8B0000]" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-[60] shrink-0">
          <Logo isDark={isNavDark} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-widest font-black transition-all hover:text-[#E31E24] relative group px-2 py-1",
                location.pathname === link.path 
                  ? (isScrolled ? "text-[#E31E24]" : "text-white shadow-sm") 
                  : (isScrolled ? "text-gray-400 dark:text-gray-500" : "text-white/70")
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E31E24] shadow-[0_0_10px_rgba(227,30,36,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 relative z-[60]">
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 md:gap-3">
            <button 
              onClick={toggleTheme}
              className={cn("p-2 rounded-full transition-all", isScrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20")}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={cn("p-2 rounded-full transition-all relative", isScrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20")}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E31E24] rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                )}
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 sm:w-80 bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 p-4 z-[70] overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4 px-2 pt-2">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Alerts</h4>
                       <span className="text-[9px] font-bold text-[#E31E24] cursor-pointer hover:underline uppercase">Clear</span>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                       {notifications.map((n) => (
                         <div 
                           key={n.id} 
                           onClick={() => markAsRead(n.id)}
                           className={cn(
                             "p-3 rounded-2xl transition-all cursor-pointer border border-transparent",
                             n.read ? "bg-transparent opacity-60" : "bg-[#E31E24]/5 border-[#E31E24]/10"
                           )}
                         >
                           <div className="flex gap-3">
                              <div className={cn(
                                "w-2 h-2 rounded-full mt-1.5 shrink-0",
                                n.type === 'order' ? "bg-[#E31E24]" : n.type === 'promo' ? "bg-emerald-500" : "bg-red-500"
                              )} />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-900 dark:text-white mb-0.5 truncate">{n.title}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight line-clamp-2">{n.message}</p>
                              </div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={cartRef}>
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={cn("p-2 rounded-full transition-all relative", isScrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20")}
              >
                <ShoppingCart size={16} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E31E24] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-lg shadow-red-500/30">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 sm:w-80 bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 p-6 z-[70]"
                  >
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Order Tray</h4>
                    {cart.length === 0 ? (
                      <div className="text-center py-10">
                         <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <ShoppingCart size={24} />
                         </div>
                         <p className="text-[10px] uppercase font-black tracking-widest text-gray-300">Tray is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
                           {cart.map((item) => (
                             <div key={item.id} className="flex gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                                   <img src={item.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="text-[11px] font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                                   <p className="text-[11px] text-[#E31E24] font-black mb-2">₹{item.price}</p>
                                   <div className="flex items-center justify-between">
                                      <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-1.5 h-6">
                                         <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-[#E31E24] text-xs px-1">-</button>
                                         <span className="mx-2 text-[9px] font-black text-gray-900 dark:text-white">{item.quantity}</span>
                                         <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-[#E31E24] text-xs px-1">+</button>
                                      </div>
                                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-[#E31E24]">
                                         <Trash2 size={12} />
                                      </button>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                           <div className="flex justify-between mb-4">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subtotal</span>
                              <span className="text-lg font-display font-black text-gray-900 dark:text-white">₹{cartTotal}</span>
                           </div>
                           <button className="w-full py-4 bg-[#E31E24] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/40 active:scale-95 transition-all">
                              Pay & Place Order
                           </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {user ? (
            <div className="relative" ref={accountMenuRef}>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={cn(
                  "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group border border-transparent shadow-sm",
                  isScrolled 
                    ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:border-[#E31E24]/30" 
                    : "bg-white/10 text-white backdrop-blur-md border-white/10 hover:bg-white/20"
                )}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#E31E24] to-[#8B0000] flex items-center justify-center text-white text-[9px] sm:text-[10px] shadow-sm">
                  {user.name?.[0] || 'U'}
                </div>
                <span className="hidden sm:inline-block max-w-[60px] truncate">{user.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300 opacity-40", isAccountMenuOpen && "rotate-180")} />
              </motion.button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-50 dark:border-gray-800 p-3 z-[70] overflow-hidden"
                  >
                    <div className="px-4 py-3 mb-2 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-xs font-black text-gray-900 dark:text-white truncate">{user.name}</p>
                    </div>
                    
                    <Link 
                      to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} 
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-3 w-full p-4 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-[#E31E24] hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest group"
                    >
                      <User size={16} className="group-hover:scale-110 transition-transform" />
                      Dashboard
                    </Link>
                    
                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-[#007AFF] hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all font-black text-[10px] uppercase tracking-widest group text-left">
                      <Settings size={16} className="group-hover:scale-110 transition-transform" />
                      Settings
                    </button>
                    
                    <div className="h-px bg-gray-50 dark:bg-gray-800 my-2 mx-4" />
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-4 rounded-2xl text-[#E31E24] hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest group text-left"
                    >
                      <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1.5 px-3 sm:px-6 py-2 sm:py-3 bg-[#E31E24] text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
            >
              <LogIn size={12} className="sm:w-[14px]" />
              <span>Login</span>
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 sm:p-2.5 rounded-full transition-all", 
              isScrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-400" : "bg-white/10 text-white",
              isMobileMenuOpen && "bg-[#E31E24] text-white"
            )}
          >
            {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Modern Slide-over Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 z-[55] lg:hidden shadow-2xl p-8 flex flex-col"
            >
              <div className="flex flex-col gap-6 mt-20">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E31E24]">Navigation</span>
                <div className="flex flex-col gap-1">
                  {navLinks.concat([{ name: "Dashboard", path: "/student-dashboard" }]).map((link, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={link.name}
                    >
                      <Link
                        to={link.path}
                        className={cn(
                          "px-4 py-4 rounded-2xl text-[14px] font-black uppercase tracking-widest transition-all block",
                          location.pathname === link.path ? "bg-gray-50 dark:bg-gray-800 text-[#E31E24]" : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={toggleTheme}
                      className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold text-xs"
                    >
                      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                      {theme === 'light' ? "Dark Mode" : "Light Mode"}
                    </button>
                    <button className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold text-xs relative">
                      <Bell size={18} />
                      Updates
                      {unreadCount > 0 && <span className="absolute top-4 right-4 w-2 h-2 bg-[#E31E24] rounded-full" />}
                    </button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
