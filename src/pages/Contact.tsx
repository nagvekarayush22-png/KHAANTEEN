import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Support", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Section */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31E24]/5 rounded-full mb-6 border border-[#E31E24]/10"
              >
                <div className="w-1.5 h-1.5 bg-[#E31E24] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#E31E24]">Contact Support</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-display font-black text-gray-900 tracking-tighter mb-6"
              >
                Let's <span className="text-[#E31E24]">Connect.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg leading-relaxed max-w-md"
              >
                Have questions about our smart systems or want to suggest a feature? We're all ears.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail />, title: "Email Us", detail: "support@khaanteen.com", color: "bg-blue-50 text-blue-600" },
                { icon: <Phone />, title: "Call Us", detail: "+91 98765 43210", color: "bg-green-50 text-green-600" },
                { icon: <MapPin />, title: "Campus Office", detail: "Main Building, PU Goa Campus", color: "bg-red-50 text-red-600" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", item.color)}>
                     {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</span>
                    <span className="text-gray-900 font-bold">{item.detail}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-100">
               <div className="flex gap-4">
                  {[Instagram, Twitter, Facebook].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ y: -5 }}
                      href="#" 
                      className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-gray-50 flex items-center justify-center text-gray-400 hover:text-[#E31E24] transition-all"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
               </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-50 h-full relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 scale-125">
                       <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-display font-black text-gray-900 mb-4 tracking-tight">Message Received!</h2>
                    <p className="text-gray-500 mb-8 max-w-sm">
                      Thank you for reaching out. Our support team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-4 bg-[#E31E24] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/20"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          className={cn(
                            "w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 transition-all outline-none",
                            errors.name ? "border-red-100 bg-red-50/10" : "border-transparent focus:border-[#E31E24]/20 focus:bg-white"
                          )}
                        />
                        {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          className={cn(
                            "w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 transition-all outline-none",
                            errors.email ? "border-red-100 bg-red-50/10" : "border-transparent focus:border-[#E31E24]/20 focus:bg-white"
                          )}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#E31E24]/20 focus:bg-white transition-all outline-none appearance-none"
                      >
                         <option>Orders & Payment</option>
                         <option>Technical Support</option>
                         <option>Suggestions</option>
                         <option>Others</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
                      <textarea 
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we help you?"
                        className={cn(
                          "w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 transition-all outline-none resize-none",
                          errors.message ? "border-red-100 bg-red-50/10" : "border-transparent focus:border-[#E31E24]/20 focus:bg-white"
                        )}
                      />
                      {errors.message && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#E31E24] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section Mock */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
         <div className="h-[400px] bg-gray-100 rounded-[50px] overflow-hidden relative border border-gray-200">
            <div className="absolute inset-0 bg-[#E5E7EB] flex items-center justify-center flex-col text-gray-400">
               <MapPin size={48} className="mb-4 text-[#E31E24]" />
               <p className="font-black text-xs uppercase tracking-widest">Map API integration required</p>
            </div>
            <div className="absolute top-10 left-10 p-6 bg-white rounded-3xl shadow-xl max-w-xs border border-gray-50">
               <h4 className="text-lg font-display font-black text-gray-900 mb-2 leading-tight">PU Goa Campus</h4>
               <p className="text-xs text-gray-500 leading-relaxed">
                  Located in the beautiful coastal region of Goa, our canteen is centrally located within the academic block.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};
