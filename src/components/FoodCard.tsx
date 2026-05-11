import { motion } from "motion/react";
import React from "react";
import { Plus, Minus, Star, Heart, XCircle } from "lucide-react";
import { FoodItem } from "../types";
import { cn } from "../lib/utils";

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl sm:rounded-[32px] overflow-hidden group relative card-shadow border border-gray-100 flex flex-col h-full min-w-0"
    >
      {/* Food Image */}
      <div className="h-40 sm:h-56 relative overflow-hidden shrink-0">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-white/90 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-1.5 shadow-sm">
          <Star size={10} className="text-yellow-400 fill-yellow-400 sm:w-3.5 sm:h-3.5" />
          <span className="text-[10px] sm:text-xs font-black text-gray-900">4.8</span>
        </div>

        {/* Category Label */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 bg-[#E31E24]/10 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#E31E24]/20">
          <span className="text-[8px] sm:text-[10px] font-black text-[#E31E24] uppercase tracking-widest">{item.category}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 relative flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
          <h3 className="font-display font-black text-sm sm:text-lg md:text-xl text-gray-900 group-hover:text-[#E31E24] transition-colors tracking-tight leading-tight line-clamp-2 min-h-[2.5em]">
            {item.name}
          </h3>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-gray-200 hover:text-[#E31E24] transition-all p-1 shrink-0"
          >
            <Heart size={16} className={cn("sm:w-5 sm:h-5", isFavorite && "fill-[#E31E24] text-[#E31E24]")} />
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-5 line-clamp-2 leading-relaxed">
          Delicious campus choice made with fresh ingredients and authentic flavors.
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-gray-50 gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[7px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-black mb-0.5 truncate">Price Per Unit</span>
            <span className="text-xl sm:text-3xl font-display font-black text-gray-900 tracking-tighter truncate font-sans">₹{item.price}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart?.(item)}
            className="w-10 h-10 sm:w-14 sm:h-14 bg-[#E31E24] text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all shrink-0"
          >
            <Plus size={20} className="sm:w-7 sm:h-7" strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* Status Overlay if unavailable */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center">
            <XCircle size={48} className="text-gray-300 mb-4" />
            <span className="text-gray-400 font-black text-lg uppercase tracking-widest">
                Out of Stock
            </span>
            <p className="text-gray-300 text-xs mt-2 font-medium uppercase tracking-tight">Replenishing soon</p>
        </div>
      )}
    </motion.div>
  );
};
