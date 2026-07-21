import React, { useRef, useEffect, useState } from "react";
import TeamHeroSection from "../components/team/TeamHeroSection";
import TeamSection from "../components/team/TeamSection";
import { boe, executives, office_bearers } from "../data/teamData";
import { ViewportOptimizedSection } from "../utils/performanceUtils.jsx";
import { preloadImages, getLoadingStrategy } from "../utils/imageOptimization";

const Team = () => {
  const boeSection = useRef(null);
  const executivesSection = useRef(null);
  const officeBearersSection = useRef(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  // Set component as mounted
  useEffect(() => {
    setIsComponentMounted(true);
    return () => setIsComponentMounted(false);
  }, []);

  // Preload critical images on component mount
  useEffect(() => {
    if (!isComponentMounted) return;
    
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const loadingStrategy = getLoadingStrategy();
        
        if (!isMounted || !isComponentMounted) return;
        
        // Preload BOE images first (they're shown first now)
        const boeImages = boe.slice(0, 6).map(member => member.image);
        preloadImages(boeImages, {
          priority: true,
          sizes: '(max-width: 768px) 100vw, 300px',
          fetchPriority: 'high'
        });

        // Preload executives images with slight delay
        setTimeout(() => {
          if (!isMounted || !isComponentMounted) return;
          const executiveImages = executives.slice(0, 6).map(member => member.image);
          preloadImages(executiveImages, {
            priority: false,
            sizes: '(max-width: 768px) 100vw, 300px',
            fetchPriority: 'auto'
          });
        }, 500);

        // Preload office bearers images with more delay
        setTimeout(() => {
          if (!isMounted || !isComponentMounted) return;
          const officeBearerImages = office_bearers.slice(0, 6).map(member => member.image);
          preloadImages(officeBearerImages, {
            priority: false,
            sizes: '(max-width: 768px) 100vw, 300px',
            fetchPriority: 'low'
          });
        }, 1000);
      } catch (error) {
        console.warn('Failed to preload images:', error);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [isComponentMounted]);

  return (
    <div className="team-page-container">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] min-h-screen text-white" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
        <TeamHeroSection />
      </div>

      {/* Team Sections */}
      <div id="team-main-content" className="team-sections-container bg-gradient-to-br from-[#0a0015] via-[#1a0033] to-[#000000]">
        <ViewportOptimizedSection fallbackHeight="800px">
          <TeamSection 
            ref={boeSection}
            title="Board Of Executives" 
            items={boe} 
            className="boe-section-start" 
          />
        </ViewportOptimizedSection>
        
        <ViewportOptimizedSection fallbackHeight="800px">
          <TeamSection 
            ref={executivesSection}
            title="Executives" 
            items={executives} 
            className="executives-section-start" 
          />
        </ViewportOptimizedSection>
        
        <ViewportOptimizedSection fallbackHeight="800px">
          <TeamSection 
            ref={officeBearersSection}
            title="Office Bearers" 
            items={office_bearers} 
            className="office-bearers-section-start" 
          />
        </ViewportOptimizedSection>
      </div>
    </div>
  );
};

export default Team;
