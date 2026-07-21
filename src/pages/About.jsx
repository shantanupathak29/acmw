import React, { Suspense, lazy, useEffect } from 'react'
import AboutHeroSection from '../components/about/AboutHeroSection'
import './Home.css' // Import for animation classes

// Add performance optimized styles
const style = document.createElement('style');
style.textContent = `
  .about-container {
    content-visibility: auto;
    contain-intrinsic-size: 1px 8000px;
    overflow-anchor: none;
  }
  [data-about-section] {
    content-visibility: auto;
    contain-intrinsic-size: 1px 1000px;
    contain: layout style paint;
  }
  
  /* Mobile scroll optimizations */
  @media (max-width: 768px) {
    .about-container {
      -webkit-overflow-scrolling: touch;
      transform: translateZ(0);
      will-change: scroll-position;
    }
    
    [data-about-section] {
      will-change: auto;
      transform: translateZ(0);
    }
  }
`;
document.head.appendChild(style);

// Lazy load sections for better performance
const AboutMissionVisionValues = lazy(() => import('../components/about/AboutMissionVisionValues'));
const AboutLadyAda = lazy(() => import('../components/about/AboutLadyAda'));
const AboutHierarchySection = lazy(() => import('../components/about/AboutHierarchySection'));

// Loading fallback component
const SectionFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000]">
    <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse rounded-full"></div>
  </div>
);

const About = () => {
  useEffect(() => {
    // Remove loading indicator after initial paint
    const timer = setTimeout(() => {
      document.body.style.opacity = '1';
    }, 0);

    // Add scroll optimization for mobile devices
    let scrollTimeout;
    const handleScroll = () => {
      document.body.classList.add('scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 150);
    };

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="about-container about-page bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] min-h-screen text-white" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <AboutHeroSection />
      
      {/* Mission, Vision & Values Combined Section */}
      <div data-about-section="AboutMissionVisionValues">
        <Suspense fallback={<SectionFallback />}>
          <AboutMissionVisionValues />
        </Suspense>
      </div>

      {/* Lady Ada Section */}
      <div data-about-section="AboutLadyAda">
        <Suspense fallback={<SectionFallback />}>
          <AboutLadyAda />
        </Suspense>
      </div>

      {/* Hierarchy Section */}
      <div data-about-section="AboutHierarchySection">
        <Suspense fallback={<SectionFallback />}>
          <AboutHierarchySection />
        </Suspense>
      </div>
    </div>
  )
}

export default About