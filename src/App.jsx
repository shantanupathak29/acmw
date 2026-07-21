import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Team from './pages/Team';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Footer from './components/Footer';

// Import iOS compatibility utilities
import { initializeIOSCompatibility, getIOSInfo } from './utils/iosCompatibility';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Enhanced touch device detection for better iOS compatibility
const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true for safety

  useEffect(() => {
    // Enhanced touch device detection with multiple checks
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const noHover = window.matchMedia('(hover: none)').matches;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Consider it a touch device if any of these conditions are true
      setIsTouchDevice(hasTouch || noHover || isIOS || isMobile);
    };
    
    checkTouchDevice();
    
    // Re-check on resize but debounce it
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkTouchDevice, 100);
    };
    
    window.addEventListener('resize', handleResize);

    const updateMousePosition = (e) => {
      // Extra safety check to prevent errors on touch devices
      if (e && typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Only add mouse listeners on non-touch devices
    if (!isTouchDevice) {
      try {
        document.addEventListener('mousemove', updateMousePosition, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      } catch (error) {
        console.warn('Failed to add mouse event listeners:', error);
      }
    }

    return () => {
      try {
        document.removeEventListener('mousemove', updateMousePosition);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      } catch (error) {
        console.warn('Failed to clean up event listeners:', error);
      }
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className={`cursor-spotlight ${isVisible ? 'active' : ''}`}
      style={{
        background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.4) 100%)`,
      }}
    />
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize iOS compatibility fixes
    let iosCleanup;
    
    try {
      const iosInfo = getIOSInfo();
      console.log('Device info:', iosInfo);
      
      if (iosInfo.isIOS) {
        console.log('iOS device detected, initializing compatibility fixes...');
        iosCleanup = initializeIOSCompatibility();
      }
    } catch (error) {
      console.warn('Failed to initialize iOS compatibility:', error);
    }

    // Simulate loading time and ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.opacity = '1';
    }, 100);

    return () => {
      clearTimeout(timer);
      if (iosCleanup) {
        try {
          iosCleanup();
        } catch (error) {
          console.warn('Error during iOS cleanup:', error);
        }
      }
    };
  }, []);

  // Show loading state briefly to ensure iOS compatibility fixes are applied
  if (isLoading) {
    return (
      <div style={{ 
        fontFamily: 'Figtree, system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #1a0033 0%, #0d1b2a 50%, #000000 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTop: '3px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <ScrollToTop />
      <CursorSpotlight />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
