import React, { useState, useEffect } from 'react';
import UniversalHeroBackground from './UniversalHeroBackground';
import { smartScrollTo, getPageScrollConfig } from '../utils/smartScrollUtils';

const UniversalHeroSection = React.memo(({ 
  title,
  subtitle,
  description,
  icon: IconComponent,
  onScrollAction = null, // Made optional - will use scroll to content by default
  scrollTarget = null,
  animationDelay = 300, // Standardized default
  backgroundIntensity = 'normal',
  customIcons = null,
  className = '',
  pageType = 'default',
  ctaText = 'Explore More' // Standardized CTA text
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smooth loading animation
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
  }, []);

  const handleScrollAction = React.useCallback(() => {
    if (onScrollAction) {
      onScrollAction();
    } else {
      // Default behavior: scroll to content for this page
      handleScrollIndicator();
    }
  }, [onScrollAction]);

  const handleScrollIndicator = React.useCallback(() => {
    // Determine scroll target with smart fallback
    let targetToScroll = scrollTarget;
    
    // If no specific target provided, use page-specific defaults
    if (!targetToScroll) {
      const pageConfig = getPageScrollConfig(pageType);
      targetToScroll = pageConfig.targets[0]; // Use first target as primary
    }
    
    if (targetToScroll) {
      // Get page-specific scroll configuration
      const pageConfig = getPageScrollConfig(pageType);
      
      // Use smart scroll with page-specific targets
      const success = smartScrollTo(targetToScroll, {
        offset: pageConfig.offset,
        behavior: 'smooth',
        fallbackSelectors: pageConfig.targets
      });
      
      // If smart scroll failed, try original method as final fallback
      if (!success) {
        const element = document.getElementById(targetToScroll) || document.querySelector(targetToScroll);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [scrollTarget, pageType]);

  // Default icons for various pages
  const DefaultIcons = () => (
    <div className="flex justify-center gap-6 mb-6">
      {IconComponent && (
        <div 
          className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <IconComponent className="w-8 h-8 text-purple-400" />
        </div>
      )}
      
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '0.5s',
          transform: 'translateZ(0)'
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-80" />
      </div>
      
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '1s',
          transform: 'translateZ(0)'
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full opacity-80" />
      </div>
    </div>
  );

  return (
    <div className={`relative w-full h-screen flex items-center justify-center text-white overflow-hidden ${className}`}>
      {/* Universal animated background */}
      <UniversalHeroBackground intensity={backgroundIntensity} pageType={pageType} />
      
      {/* Main content container - perfectly centered */}
      <div 
        className={`relative z-20 text-center px-6 max-w-6xl transition-all duration-1000 will-change-transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          animationDelay: `${animationDelay}ms`,
          transform: 'translateZ(0)',
          paddingTop: '5rem', // Better spacing from navbar
          paddingBottom: '8rem' // Space for scroll indicator and CTA button
        }}
      >
        {/* Hero content area with optimized spacing */}
        <div className="space-y-6 md:space-y-8">
          {/* Animated icons */}
          {customIcons || <DefaultIcons />}

          {/* Hero text with optimized animations */}
          <div className="space-y-4 md:space-y-6">
            {/* Subtitle */}
            {subtitle && (
              <div className="overflow-hidden">
                <p 
                  className="hero-subtitle text-purple-300 font-medium animate-slide-up will-change-transform"
                  style={{ 
                    fontFamily: 'Figtree, system-ui, -apple-system, sans-serif',
                    animationDelay: `${animationDelay + 300}ms`,
                    transform: 'translateZ(0)'
                  }}
                >
                  {subtitle}
                </p>
              </div>
            )}

            {/* Main title */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <h1 
                  className="hero-title font-black leading-tight animate-slide-up will-change-transform"
                  style={{ 
                    fontFamily: 'Figtree, system-ui, -apple-system, sans-serif',
                    animationDelay: `${animationDelay + 600}ms`,
                    transform: 'translateZ(0)'
                  }}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="overflow-hidden">
                <p 
                  className="hero-description text-gray-300 leading-relaxed animate-slide-up will-change-transform"
                  style={{ 
                    fontFamily: 'Figtree, system-ui, -apple-system, sans-serif',
                    animationDelay: `${animationDelay + 900}ms`,
                    transform: 'translateZ(0)'
                  }}
                >
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Call-to-Action Button - Always standardized scroll to content behavior */}
          <div className="overflow-hidden mt-8 md:mt-12">
            <div 
              className="animate-slide-up will-change-transform"
              style={{ 
                animationDelay: `${animationDelay + 1200}ms`,
                transform: 'translateZ(0)'
              }}
            >
              <div className="flex justify-center">
                <button
                  onClick={handleScrollAction}
                  className="nbutton group relative overflow-hidden px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 rounded-xl text-white font-semibold transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-2 transform-gpu will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all duration-700 ease-out"></div>
                  <span className="relative z-10 text-sm md:text-base">
                    {ctaText} →
                  </span>
                  <i className="ti-angle-right relative z-10 transform transition-transform duration-500 ease-out group-hover:translate-x-1"></i>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator removed for cleaner design */}
    </div>
  );
});

UniversalHeroSection.displayName = 'UniversalHeroSection';

export default UniversalHeroSection;
