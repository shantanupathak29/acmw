import React, { forwardRef, useState, useEffect } from "react";
import ChromaGrid from "../ChromaGrid";

const TeamSection = forwardRef(function TeamSection({ title, items, className = "" }, ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple delayed visibility instead of complex animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className={`section-start bg-gradient-to-br from-[#0a0015] via-[#1a0033] to-[#000000] ${className}`} style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <div className="section-text w-full flex items-center justify-center h-[15vh] md:h-[20vh] py-8">
        <h2 
          className={`text-white text-3xl md:text-4xl lg:text-6xl font-semibold text-center px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
        >
          {title}
        </h2>
      </div>
      <div className="cards-container min-h-[70vh]">
        <div className="h-full relative">
          <ChromaGrid
            items={items}
            radius={250}
            damping={0.45}
            fadeOut={0.6}
            ease="power1.out"
          />
        </div>
      </div>
    </div>
  );
});

export default TeamSection;
