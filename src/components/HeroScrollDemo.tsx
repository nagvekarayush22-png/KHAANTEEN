import React from "react";
import { ContainerScroll } from "@/src/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-display font-black text-gray-900 tracking-tight leading-tight">
              KHAANTEEN. <br />
              <span className="text-4xl md:text-[6rem] font-black mt-4 block text-[#E31E24] tracking-tighter">
                Smart Campus Dining
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2674&auto=format&fit=crop"
          alt="Premium Dining Experience"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </ContainerScroll>
    </div>
  );
}
