/**
 * iOS Safari Compatibility Utilities
 * Handles specific iOS Safari quirks and issues
 */

/**
 * Fix iOS Safari viewport height issues
 */
export const fixIOSViewport = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Fix for iOS Safari bottom bar
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }
};

/**
 * Prevent iOS Safari zoom on input focus
 */
export const preventIOSZoom = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Add viewport meta tag to prevent zoom
    let viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    
    // Set initial viewport
    const baseViewport = 'width=device-width, initial-scale=1.0, user-scalable=no';
    viewport.content = baseViewport;
    
    // Temporarily allow zoom during input focus to prevent layout issues
    const preventZoomOnFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }
    };
    
    const restoreZoomOnBlur = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        setTimeout(() => {
          viewport.content = baseViewport;
        }, 100);
      }
    };
    
    document.addEventListener('focusin', preventZoomOnFocus);
    document.addEventListener('focusout', restoreZoomOnBlur);
    
    return () => {
      document.removeEventListener('focusin', preventZoomOnFocus);
      document.removeEventListener('focusout', restoreZoomOnBlur);
    };
  }
};

/**
 * Optimize animations for iOS Safari
 */
export const optimizeIOSAnimations = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Add iOS-specific CSS optimizations
    const style = document.createElement('style');
    style.textContent = `
      /* iOS Safari animation optimizations */
      * {
        -webkit-transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
      }
      
      /* Reduce motion on iOS for better performance */
      @media (max-width: 768px) {
        .animate-pulse {
          animation-duration: 3s !important;
        }
        
        .animate-bounce {
          animation-duration: 2s !important;
        }
        
        .animate-float, .animate-drift-slow {
          animation-duration: 8s !important;
          animation-timing-function: ease-out !important;
        }
      }
      
      /* Disable complex animations during scroll on iOS */
      body.scrolling * {
        animation-play-state: paused !important;
        transition-duration: 0ms !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Add scroll optimization
    let scrollTimer;
    const handleScroll = () => {
      document.body.classList.add('scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }
};

/**
 * Fix iOS Safari scroll bounce and improve touch scrolling
 */
export const fixIOSScrolling = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Prevent scroll bounce
    document.body.style.overscrollBehavior = 'none';
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Fix for iOS momentum scrolling
    const style = document.createElement('style');
    style.textContent = `
      /* iOS scroll fixes */
      html, body {
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
      }
      
      /* Prevent horizontal scroll */
      body {
        overflow-x: hidden;
        position: relative;
      }
      
      /* Fix for iOS Safari bottom bar */
      .min-h-screen {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }
};

/**
 * Initialize all iOS compatibility fixes
 */
export const initializeIOSCompatibility = () => {
  const cleanupFunctions = [];
  
  try {
    const viewportCleanup = fixIOSViewport();
    if (viewportCleanup) cleanupFunctions.push(viewportCleanup);
    
    const zoomCleanup = preventIOSZoom();
    if (zoomCleanup) cleanupFunctions.push(zoomCleanup);
    
    const animationCleanup = optimizeIOSAnimations();
    if (animationCleanup) cleanupFunctions.push(animationCleanup);
    
    const scrollCleanup = fixIOSScrolling();
    if (scrollCleanup) cleanupFunctions.push(scrollCleanup);
    
    console.log('iOS compatibility fixes initialized');
    
  } catch (error) {
    console.warn('Failed to initialize some iOS compatibility fixes:', error);
  }
  
  // Return cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Error during iOS compatibility cleanup:', error);
      }
    });
  };
};

/**
 * Check if current device is iOS and get version info
 */
export const getIOSInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  
  if (!isIOS) {
    return { isIOS: false };
  }
  
  const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
  const version = match ? `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}` : 'unknown';
  const majorVersion = match ? parseInt(match[1]) : 0;
  
  const device = /iPad/.test(userAgent) ? 'iPad' : 
                 /iPhone/.test(userAgent) ? 'iPhone' : 
                 /iPod/.test(userAgent) ? 'iPod' : 'unknown';
  
  const isOldIOS = majorVersion < 14;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  return {
    isIOS: true,
    version,
    majorVersion,
    device,
    isOldIOS,
    isSafari,
    standalone: window.navigator.standalone === true
  };
};
