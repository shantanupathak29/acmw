import React from 'react';
import { Camera, Images, Sparkles } from 'lucide-react';
import UniversalHeroSection from '../UniversalHeroSection';

const GalleryHero = React.memo(() => {
  // Custom icons for Gallery page
  const GalleryIcons = () => (
    <div className="flex justify-center gap-6 mb-8">
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <Camera className="w-8 h-8 text-purple-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '0.5s',
          transform: 'translateZ(0)'
        }}
      >
        <Images className="w-8 h-8 text-cyan-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '1s',
          transform: 'translateZ(0)'
        }}
      >
        <Sparkles className="w-8 h-8 text-pink-400" />
      </div>
    </div>
  );

  return (
    <UniversalHeroSection
      title="Gallery"
      subtitle="Visual Stories • Captured Moments • Shared Memories"
      description="Immerse yourself in a curated collection of our most impactful moments, breakthrough achievements, and community celebrations that define our journey in technology."
      customIcons={<GalleryIcons />}
      backgroundIntensity="high"
      animationDelay={300}
      pageType="gallery"
      ctaText="Explore Our Journey"
      scrollTarget="gallery-content"
    />
  );
});

GalleryHero.displayName = 'GalleryHero';

export default GalleryHero;
