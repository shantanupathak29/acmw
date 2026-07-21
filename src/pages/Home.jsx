import { Suspense, lazy, useEffect } from 'react';
import "./Home.css";

// Add performance optimized styles with mobile-specific optimizations
const style = document.createElement('style');
style.textContent = `
  .home-container {
    content-visibility: auto;
    contain-intrinsic-size: 1px 5000px;
    overflow-anchor: none;
  }
  [data-section] {
    content-visibility: auto;
    contain-intrinsic-size: 1px 800px;
    contain: layout style paint;
  }
  
  /* Mobile scroll optimizations */
  @media (max-width: 768px) {
    .home-container {
      -webkit-overflow-scrolling: touch;
      transform: translateZ(0);
      will-change: scroll-position;
    }
    
    [data-section] {
      will-change: auto;
      transform: translateZ(0);
    }
    
    /* Reduce animations during scroll on mobile */
    body.scrolling * {
      animation-play-state: paused !important;
      transition-duration: 0ms !important;
    }
    
    /* Prevent layout shifts */
    .initiative-card, .achievement-card {
      contain: layout style;
      transform: translateZ(0);
    }
  }
`;
document.head.appendChild(style);

// Eager load HeroSection for fastest initial render
const HeroSection = lazy(() => import('../components/home/HeroSection'));

// Lazy load other sections
const AboutSection = lazy(() => import('../components/home/AboutSection'));
const InitiativesSection = lazy(() => import('../components/home/InitiativesSection'));
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'));
const AchievementsSection = lazy(() => import('../components/home/AchievementsSection'));

// Loading fallback component
const SectionFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000]">
    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full"></div>
  </div>
);

// Home component definition
const Home = () => {
  useEffect(() => {
    // Remove loading indicator after initial paint
    const timer = setTimeout(() => {
      document.body.style.opacity = '1';
    }, 0);

    // Add scroll optimization for mobile devices
    let scrollTimeout;
    const handleScroll = () => {
      // Add scrolling class to pause animations
      document.body.classList.add('scrolling');
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Remove scrolling class after scroll stops
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 150);
    };

    // Add passive scroll listener for better performance
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
    <div className="home-container">
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>
      
      <div data-section="AboutSection" style={{ minHeight: '100vh' }}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-[#1a0033]/50 via-[#0d1b2a]/50 to-[#000000]/50 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full"></div>
          </div>
        }>
          <AboutSection />
        </Suspense>
      </div>

      <div data-section="InitiativesSection" style={{ minHeight: '100vh' }}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-[#1a0033]/30 via-[#0d1b2a]/30 to-[#000000]/30 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full"></div>
          </div>
        }>
          <InitiativesSection />
        </Suspense>
      </div>

      <div data-section="AchievementsSection" style={{ minHeight: '100vh' }}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-[#1a0033]/25 via-[#0d1b2a]/25 to-[#000000]/25 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full"></div>
          </div>
        }>
          <AchievementsSection />
        </Suspense>
      </div>

      <div data-section="TestimonialsSection" style={{ minHeight: '100vh' }}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-[#1a0033]/20 via-[#0d1b2a]/20 to-[#000000]/20 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full"></div>
          </div>
        }>
          <TestimonialsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
            