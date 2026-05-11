import React from "react";
import { motion } from "framer-motion";
import { Sun, Trees, MapPin, Tent, Waves, Utensils, Heart, Instagram, Users } from "lucide-react";
import { BeachBackground } from "../components/BeachBackground";

const campusStats = [
  { label: "Students", value: "5,000+", icon: <Users size={16} /> },
  { label: "Faculty", value: "200+", icon: <Users size={16} /> },
  { label: "Canteens", value: "3", icon: <Utensils size={16} /> },
  { label: "Happiness", value: "100%", icon: <Heart size={16} /> },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1512813195386-6cf81d50e3c1?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2522&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2670&auto=format&fit=crop",
];

export const AboutCampus: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 relative overflow-hidden bg-white">
      {/* Dynamic Goa Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <BeachBackground />
      </div>

      <div className="relative z-10 pt-32">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-[#E31E24]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31E24]">Parul University Goa</span>
            <div className="h-px w-8 bg-[#E31E24]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black text-gray-900 mb-8 tracking-tighter"
          >
            Campus Life <br /> 
            <span className="text-[#E31E24]">Under the Palms.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg font-medium italic"
          >
            "Where academic excellence meets the soothing whispers of the Arabian Sea."
          </motion.p>
        </section>

        {/* Tropical Features */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="lg:col-span-2 relative h-[500px] rounded-[50px] overflow-hidden group shadow-2xl"
             >
                <img 
                  src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2522&auto=format&fit=crop" 
                  alt="Main Campus" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                   <div className="absolute bottom-10 left-10 text-white">
                    <div className="flex items-center gap-2 mb-2 text-red-500">
                       <MapPin size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">South Goa Campus</span>
                    </div>
                    <h2 className="text-4xl font-display font-black tracking-tight">An Oasis of Learning.</h2>
                 </div>
             </motion.div>

             <div className="space-y-8">
               {[
                 { title: "Coastal Vibe", text: "Experience a unique blend of modern architecture and tropical surroundings.", icon: <Waves /> },
                 { title: "Smart Dining", text: "Khaanteen leads the way in tech-integrated campus solutions.", icon: <Utensils /> },
                 { title: "Sustainability", text: "Committed to zero waste and plastic-free green initiatives.", icon: <Trees /> }
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 bg-white/60 backdrop-blur-md rounded-[35px] border border-white shadow-xl hover:bg-white transition-all group"
                 >
                   <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                   </div>
                   <h3 className="text-xl font-display font-black text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* Gallery Slider */}
        <section className="mb-32">
          <div className="flex flex-col items-center mb-12">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-4">Gallery Showcase</span>
             <h2 className="text-4xl font-display font-black text-gray-900">Captured Moments.</h2>
          </div>
          
          <div className="flex gap-6 px-6 overflow-x-auto pb-10 no-scrollbar">
             {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.98 }}
                  className="flex-shrink-0 w-[400px] h-[500px] rounded-[40px] overflow-hidden shadow-2xl p-0 m-0"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.div>
             ))}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {campusStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-[35px] border border-gray-100 shadow-xl flex flex-col items-center text-center group hover:border-red-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E31E24] mb-4 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="block text-3xl font-display font-black text-gray-900 mb-1 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
           </div>
        </section>
      </div>

      {/* Floating Action Button for Instagram Highlight */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-32 right-8 w-16 h-16 bg-gradient-to-tr from-purple-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-2xl z-40"
      >
        <Instagram size={28} />
      </motion.button>
    </div>
  );
};
