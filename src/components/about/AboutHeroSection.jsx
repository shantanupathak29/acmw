import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import UniversalHeroSection from '../UniversalHeroSection';

const AboutHeroSection = () => {
  // Custom icons for About page
  const AboutIcons = () => (
    <div className="flex justify-center gap-6 mb-8">
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <Users className="w-8 h-8 text-violet-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '0.5s',
          transform: 'translateZ(0)'
        }}
      >
        <Target className="w-8 h-8 text-cyan-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '1s',
          transform: 'translateZ(0)'
        }}
      >
        <Award className="w-8 h-8 text-violet-400" />
      </div>
    </div>
  );

  return (
    <div className="about-hero w-full relative">
      <UniversalHeroSection
        title="About Us"
        subtitle="Empowering Women in Technology Through Innovation & Excellence"
        description="Discover our mission, vision, and the incredible journey of UPES ACM-W Student Chapter as we continue to break barriers and build the future of technology."
        customIcons={<AboutIcons />}
        backgroundIntensity="normal"
        animationDelay={300}
        scrollTarget="MissionVisionValuesSection"
        pageType="about"
        ctaText="Discover Who We Are"
      />
    </div>
  );
};

export default AboutHeroSection;
