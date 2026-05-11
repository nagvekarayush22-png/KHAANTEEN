"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

type FloatingActionMenuProps = {
options: {
  label: string;
  onClick: () => void;
  Icon?: React.ReactNode;
}[];
className?: string;
};

const FloatingActionMenu = ({
options,
className,
}: FloatingActionMenuProps) => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};

return (
  <div className={cn("fixed bottom-8 right-8 z-[100]", className)}>
    <Button
      onClick={toggleMenu}
      className="w-12 h-12 rounded-full bg-[#E31E24] hover:bg-[#E31E24]/90 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Plus className="w-6 h-6" />
      </motion.div>
    </Button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="absolute bottom-14 right-0 mb-2"
        >
          <div className="flex flex-col items-end gap-2">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <Button
                  onClick={() => {
                    option.onClick();
                    setIsOpen(false);
                  }}
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 dark:bg-[#11111198] text-gray-900 border border-gray-100 hover:bg-gray-50 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-xl backdrop-blur-md"
                >
                  {option.Icon}
                  <span className="font-bold text-[10px] uppercase tracking-widest">{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default FloatingActionMenu;
