import React from "react";
import { Users, Star, Trophy } from "lucide-react";
import UniversalHeroSection from "../UniversalHeroSection";

const TeamHeroSection = () => {
  // Custom icons for Team page
  const TeamIcons = () => (
    <div className="flex justify-center gap-6 mb-6">
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <Users className="w-8 h-8 text-purple-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '0.5s',
          transform: 'translateZ(0)'
        }}
      >
        <Star className="w-8 h-8 text-cyan-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '1s',
          transform: 'translateZ(0)'
        }}
      >
        <Trophy className="w-8 h-8 text-pink-400" />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <UniversalHeroSection
        title="Our Team"
        subtitle="Innovative minds shaping the future of technology"
        description="More than just a team, we are a collective of dreamers, creators, and achievers working together to make a difference."
        customIcons={<TeamIcons />}
        backgroundIntensity="normal"
        animationDelay={300}
        className="pt-16"
        pageType="team"
        ctaText="Meet Our Team"
        scrollTarget="team-main-content"
      />
    </div>
  );
};

export default TeamHeroSection;
