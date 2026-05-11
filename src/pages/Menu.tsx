import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ShoppingBag, X, Zap, ChevronRight, Plus, Minus, Trash2 } from "lucide-react";
import { MENU_ITEMS, FOOD_CATEGORIES } from "../constants";
import { FoodCard } from "../components/FoodCard";
import { cn } from "../lib/utils";
import { getMealRecommendations } from "../services/geminiService";
import { FoodItem } from "../types";
import { useApp } from "../context/AppContext";

import { Logo } from "../components/Logo";

export const Menu: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, addNotification, theme } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAIRecommend = async () => {
    setIsRecommending(true);
    const recs = await getMealRecommendations({ mood: "hungry", budget: 100 });
    setRecommendations(recs);
    setIsRecommending(false);
    addNotification({
      title: "AI Analysis Complete",
      message: "We've curated a special menu based on current campus trends.",
      type: 'promo'
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsRecommending(true); // Reuse as loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrderSuccess(true);
    setIsCartOpen(false);
    setIsRecommending(false);
    
    addNotification({
      title: "Order Confirmed!",
      message: `Token: ORD-${Date.now().toString().slice(-6)}. Head to the counter in 10 mins.`,
      type: 'order'
    });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-6 bg-white overflow-hidden">
      {/* Background Subtle Pattern/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.03] scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')" }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <span className="text-brand-orange font-black tracking-widest uppercase text-[10px] mb-2 block">Premium Menu</span>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center justify-center">
                <Logo className="scale-110 md:scale-125" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-gray-900 tracking-tight leading-tight uppercase font-serif mt-4">GOA VIBES.</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={handleAIRecommend}
                disabled={isRecommending}
                className="flex-1 md:flex-none px-6 md:px-8 py-3 md:py-4 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl flex items-center justify-center gap-3 text-brand-orange font-black text-xs md:text-sm hover:scale-105 transition-all disabled:opacity-50"
             >
                <Zap size={18} className={cn(isRecommending && "animate-pulse")} />
                <span className="whitespace-nowrap">{isRecommending ? "AI THINKING..." : "AI SUGGESTIONS"}</span>
             </button>
             <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-4 md:p-5 bg-gray-900 rounded-2xl text-white shadow-2xl shadow-gray-900/20 hover:scale-105 transition-all group"
             >
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-black w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                )}
             </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="md:col-span-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                    type="text"
                    placeholder="Search favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 font-bold focus:outline-none focus:border-brand-orange/40"
                />
            </div>
            <div className="md:col-span-3 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {["All", ...FOOD_CATEGORIES].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-7 py-4.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all uppercase tracking-widest border",
                            selectedCategory === cat ? "bg-brand-orange text-white border-brand-orange shadow-xl shadow-orange-500/20" : "bg-white border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* AI Recommendations Section */}
        <AnimatePresence>
            {recommendations.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-16 p-10 bg-white border border-orange-50 shadow-2xl shadow-orange-500/5 rounded-[48px] relative overflow-hidden"
                >
                    <div className="absolute top-8 right-8">
                        <button onClick={() => setRecommendations([])} className="text-gray-200 hover:text-gray-900 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                           <Zap className="text-brand-orange" size={24} />
                        </div>
                        <h2 className="text-3xl font-display font-black text-gray-900">AI Personal Menu ✨</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recommendations.map(item => (
                            <FoodCard key={item.id} item={item} onAddToCart={() => addToCart(item)} />
                        ))}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/5 blur-[80px] rounded-full" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} onAddToCart={() => addToCart(item)} />
          ))}
        </div>
      </div>

      {/* Cart Drawer & Success Popup */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-gray-900/20 backdrop-blur-md z-[60]"
            />
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] p-6 sm:p-10 border-l border-gray-100 flex flex-col shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 tracking-tight">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                    {cart.map((cartItem) => (
                        <div key={cartItem.id} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl sm:rounded-[32px] transition-all hover:scale-[1.02]">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                <img src={cartItem.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-gray-900 leading-tight text-sm sm:text-base truncate">{cartItem.name}</h4>
                                <div className="flex items-center gap-3 sm:gap-4 mt-2">
                                   <button onClick={() => updateQuantity(cartItem.id, -1)} className="p-1 text-gray-400 hover:text-brand-orange"><Minus size={12} strokeWidth={3} /></button>
                                   <span className="font-black text-gray-900 text-xs sm:text-sm">{cartItem.quantity}</span>
                                   <button onClick={() => updateQuantity(cartItem.id, 1)} className="p-1 text-gray-400 hover:text-brand-orange"><Plus size={12} strokeWidth={3} /></button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
                               <span className="font-display font-black text-base sm:text-lg text-gray-900">₹{cartItem.price * cartItem.quantity}</span>
                               <button onClick={() => removeFromCart(cartItem.id)} className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Remove</button>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                               <ShoppingBag size={48} className="text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-display font-black text-gray-900 mb-2">Cart is empty</h3>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tighter">Find something delicious in our menu</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-10 border-t border-gray-100">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                           <span className="text-gray-400 uppercase tracking-widest text-[10px] font-black block mb-1">Total Bill</span>
                           <span className="text-4xl font-display font-black text-gray-900 tracking-tighter">₹{cartTotal}</span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Inclusive Taxes</span>
                        </div>
                    </div>
                    <button 
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                        className="w-full bg-brand-orange text-white font-black py-5 rounded-[28px] shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 disabled:opacity-50 text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                    >
                        {isRecommending ? <Loader2 className="animate-spin" /> : "PROCEED TO CHECKOUT"}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>
          </>
        )}

        {orderSuccess && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-white rounded-[48px] p-12 max-w-sm w-full text-center shadow-2xl border border-gray-100"
             >
               <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                  <CheckCircle2 size={48} />
               </div>
               <h2 className="text-3xl font-display font-black text-gray-900 mb-2 uppercase tracking-tighter">SUCCESS!</h2>
               <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Your order has been verified by the blockchain. Scan your digital token at the counter.
               </p>
               <div className="p-6 bg-gray-50 rounded-3xl mb-8 border border-gray-100">
                  <span className="block text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Order Token</span>
                  <span className="text-2xl font-mono font-black text-gray-900">ORD-{Date.now().toString().slice(-6)}</span>
               </div>
               <button 
                 onClick={() => { setOrderSuccess(false); }}
                 className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
               >
                 Got it
               </button>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal Import for missing icons
import { CheckCircle2, Loader2 } from "lucide-react";
