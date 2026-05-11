import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, ShoppingBag, X, Zap, ChevronRight, Plus, Minus } from "lucide-react";
import { MENU_ITEMS, FOOD_CATEGORIES } from "../constants";
import { FoodCard } from "../components/FoodCard";
import { cn } from "../lib/utils";
import { getMealRecommendations } from "../services/geminiService";
import { FoodItem } from "../types";

export const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ item: FoodItem; quantity: number }[]>([]);
  const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handleAIRecommend = async () => {
    setIsRecommending(true);
    const recs = await getMealRecommendations({ mood: "hungry", budget: 100 });
    setRecommendations(recs);
    setIsRecommending(false);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : { id: "TEMP", role: "student" };

    const orderData = {
      items: cart.map(i => ({ foodId: i.item.id, quantity: i.quantity, name: i.item.name, price: i.item.price })),
      total: cartTotal,
      userId: user.id,
      userType: user.role,
    };

    try {
      const resp = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (resp.ok) {
        setCart([]);
        setIsCartOpen(false);
        // Using a more attractive notification instead of alert could be better, 
        // but for now keeping it simple as per instructions.
        alert("Order placed successfully! Token: ORD-" + Date.now());
      }
    } catch (err) {
      console.error("Order Failed", err);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-6 bg-[#F8FAFC] overflow-hidden">
      {/* Background Subtle Pattern/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.03] scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop')" }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <span className="text-[#007AFF] font-black tracking-widest uppercase text-[10px] mb-2 block">Premium Menu</span>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/static.aistudio.google.com/artifacts/ef9231f8-084a-49ae-a01f-0e1ce0743bba/input_file_0.png" 
                  alt="KHAANTEEN"
                  className="h-24 md:h-32 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = document.createElement('span');
                    span.className = 'text-3xl md:text-5xl font-display font-black text-[#8B0000] uppercase font-serif';
                    span.innerText = 'KHAANTEEN.';
                    e.currentTarget.parentElement?.appendChild(span);
                  }}
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-gray-900 tracking-tight leading-tight uppercase font-serif">GOA VIBES.</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={handleAIRecommend}
                disabled={isRecommending}
                className="flex-1 md:flex-none px-6 md:px-8 py-3 md:py-4 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl flex items-center justify-center gap-3 text-[#007AFF] font-black text-xs md:text-sm hover:scale-105 transition-all disabled:opacity-50"
             >
                <Zap size={18} className={cn(isRecommending && "animate-pulse")} />
                <span className="whitespace-nowrap">{isRecommending ? "AI THINKING..." : "AI SUGGESTIONS"}</span>
             </button>
             <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-4 md:p-5 bg-[#010816] rounded-2xl text-white shadow-2xl shadow-gray-900/20 hover:scale-105 transition-all group"
             >
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E31E24] text-white text-[10px] font-black w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                        {cart.length}
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
                    className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl py-4.5 pl-14 pr-6 text-gray-900 font-bold focus:outline-none focus:border-[#007AFF]/40"
                />
            </div>
            <div className="md:col-span-3 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {["All", ...FOOD_CATEGORIES].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-7 py-4.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all uppercase tracking-widest border",
                            selectedCategory === cat ? "bg-[#E31E24] text-white border-[#E31E24] shadow-xl shadow-red-500/20" : "bg-white border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm"
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
                    className="mb-16 p-10 bg-white border border-blue-50 shadow-2xl shadow-blue-500/5 rounded-[48px] relative overflow-hidden"
                >
                    <div className="absolute top-8 right-8">
                        <button onClick={() => setRecommendations([])} className="text-gray-200 hover:text-gray-900 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                           <Zap className="text-[#007AFF]" size={24} />
                        </div>
                        <h2 className="text-3xl font-display font-black text-gray-900">AI Personal Menu ✨</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recommendations.map(item => (
                            <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                        ))}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
            <div className="text-center py-32 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                   <Search size={40} className="text-gray-200" />
                </div>
                <span className="text-gray-300 font-display font-black text-2xl uppercase tracking-widest">No results found</span>
                <p className="text-gray-200 text-sm mt-2 font-bold uppercase tracking-tighter">Try clearing your filters</p>
            </div>
        )}
      </div>

      {/* Cart Drawer */}
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
                className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] p-6 sm:p-10 border-l border-gray-100 flex flex-col shadow-2xl shadow-black/10"
            >
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 tracking-tight">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                    {cart.map((cartItem, i) => (
                        <div key={i} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white border border-gray-50 rounded-2xl sm:rounded-[32px] card-shadow transition-all hover:scale-[1.02]">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                {cartItem.item.image ? (
                                   <img src={cartItem.item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                   <span className="font-bold text-lg sm:text-xl text-[#007AFF] uppercase">{cartItem.item.name[0]}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-gray-900 leading-tight text-sm sm:text-base truncate">{cartItem.item.name}</h4>
                                <div className="flex items-center gap-3 sm:gap-4 mt-2">
                                   <button onClick={() => updateQuantity(cartItem.item.id, -1)} className="p-1 text-gray-400 hover:text-[#E31E24]"><Minus size={12} sm:size={14} strokeWidth={3} /></button>
                                   <span className="font-black text-gray-900 text-xs sm:text-sm">{cartItem.quantity}</span>
                                   <button onClick={() => updateQuantity(cartItem.item.id, 1)} className="p-1 text-gray-400 hover:text-[#007AFF]"><Plus size={12} sm:size={14} strokeWidth={3} /></button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
                               <span className="font-display font-black text-base sm:text-lg text-gray-900">₹{cartItem.item.price * cartItem.quantity}</span>
                               <button onClick={() => removeFromCart(cartItem.item.id)} className="text-[8px] sm:text-[10px] font-black text-[#E31E24] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Remove</button>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                               <ShoppingBag size={48} className="text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-display font-black text-gray-900 mb-2">Cart is empty</h3>
                            <p className="text-gray-300 font-bold text-sm uppercase tracking-tighter">Find something delicious in our menu</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-10 border-t border-gray-100">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                           <span className="text-gray-300 uppercase tracking-widest text-[10px] font-black block mb-1">Total Bill</span>
                           <span className="text-4xl font-display font-black text-gray-900 tracking-tighter">₹{cartTotal}</span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Inclusive Taxes</span>
                           <span className="text-[10px] font-black text-gray-200 uppercase tracking-widest">Digital Receipt</span>
                        </div>
                    </div>
                    <button 
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                        className="w-full bg-[#E31E24] text-white font-black py-5 rounded-[28px] shadow-2xl shadow-red-500/30 transition-all hover:bg-red-600 disabled:opacity-50 text-sm tracking-widest"
                    >
                        PROCEED TO CHECKOUT
                        <ChevronRight className="inline ml-2" size={18} />
                    </button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
