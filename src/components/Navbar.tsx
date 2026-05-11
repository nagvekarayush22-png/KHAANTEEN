import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, User, Menu as MenuIcon, X, Moon, Sun, LogIn, Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
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

  // Hide Navbar on Dashboard routes to prevent UI overlap with sidebars
  const hideOnRoutes = ["/student-dashboard", "/admin-dashboard", "/faculty-dashboard"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navLinks = [
    { name: "Dashboard", path: "/student-dashboard" },
    { name: "Smart Features", path: "#" },
    { name: "About Campus", path: "#" },
    { name: "Contact", path: "#" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
      isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3" : "bg-transparent py-4"
    )}>
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#E31E24]" />
        <div className="flex-1 bg-[#007AFF]" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-[60]">
          <div className="h-10 md:h-14 w-auto flex items-center">
            <img 
              src="https://storage.googleapis.com/static.aistudio.google.com/artifacts/ef9231f8-084a-49ae-a01f-0e1ce0743bba/input_file_0.png" 
              alt="KHAANTEEN"
              className="h-full w-auto object-contain transition-all duration-300 group-hover:scale-105" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const span = document.createElement('span');
                span.className = 'text-lg font-serif font-black tracking-widest text-[#8B0000]';
                span.innerText = 'KHAANTEEN';
                e.currentTarget.parentElement?.appendChild(span);
              }}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-widest font-black transition-all hover:text-[#E31E24] relative group px-2 py-1",
                location.pathname === link.path 
                  ? (isScrolled ? "text-[#E31E24]" : "text-white") 
                  : (isScrolled ? "text-gray-400" : "text-white/70")
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E31E24]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 relative z-[60]">
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            <button className={cn("p-1.5 md:p-2.5 rounded-full transition-all", isScrolled ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20")}>
              <Sun size={16} />
            </button>
            <button className={cn("p-1.5 md:p-2.5 rounded-full transition-all relative", isScrolled ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20")}>
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#E31E24] rounded-full border border-white" />
            </button>
          </div>
          
          {user ? (
            <div className="relative" ref={accountMenuRef}>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={cn(
                  "flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl group border border-transparent",
                  isScrolled 
                    ? "bg-white border-gray-100 text-gray-900 shadow-gray-200/50 hover:border-[#E31E24]/20" 
                    : "bg-white/10 text-white backdrop-blur-md border-white/10 hover:bg-white/20"
                )}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#E31E24] flex items-center justify-center text-white text-[10px] sm:text-xs">
                  {user.name?.[0] || 'U'}
                </div>
                <span className="hidden sm:inline-block max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isAccountMenuOpen && "rotate-180")} />
              </motion.button>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-50 p-3 z-[70] overflow-hidden"
                  >
                    <div className="px-4 py-3 mb-2 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-xs font-black text-gray-900 truncate">{user.name}</p>
                    </div>
                    
                    <Link 
                      to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} 
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-3 w-full p-4 rounded-2xl text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-widest group"
                    >
                      <User size={16} className="group-hover:scale-110 transition-transform" />
                      Dashboard
                    </Link>
                    
                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl text-gray-500 hover:text-[#007AFF] hover:bg-blue-50 transition-all font-black text-[10px] uppercase tracking-widest group text-left">
                      <Settings size={16} className="group-hover:scale-110 transition-transform" />
                      Settings
                    </button>
                    
                    <div className="h-px bg-gray-50 my-2 mx-4" />
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-4 rounded-2xl text-[#E31E24] hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-widest group text-left"
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
              isScrolled ? "bg-gray-100 text-gray-400" : "bg-white/10 text-white",
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
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-[55] lg:hidden shadow-2xl p-8 flex flex-col"
            >
              <div className="flex flex-col gap-6 mt-20">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E31E24]">Navigation</span>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
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
                          location.pathname === link.path ? "bg-gray-50 text-[#E31E24]" : "text-gray-400 hover:bg-gray-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                 <div className="flex items-center gap-4">
                    <button className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold text-xs">
                      <Sun size={18} />
                      Light Mode
                    </button>
                    <button className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-bold text-xs relative">
                      <Bell size={18} />
                      Updates
                      <span className="absolute top-4 right-4 w-2 h-2 bg-[#E31E24] rounded-full" />
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
