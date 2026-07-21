// Scroll optimization utilities for better performance

// Optimized throttle with RAF for smoother scrolling
export const throttleRAF = (func) => {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Throttle function to limit scroll event frequency
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Debounce function for reducing unnecessary re-renders
export const debounce = (func, delay) => {
  let timeoutId;
  return function() {
    const args = arguments;
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
};

// Enhanced IntersectionObserver with iOS-specific performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const { isMobile, isIOS, isLowEnd } = getDevicePerformance();
  
  const defaultOptions = {
    threshold: (isIOS || isLowEnd) ? 0.05 : (isMobile ? 0.1 : 0.15),
    rootMargin: (isIOS || isLowEnd) ? '25px' : (isMobile ? '50px' : '100px'),
    ...options
  };

  // Use higher throttle values for iOS to prevent performance issues
  const throttleDelay = isIOS ? 150 : (isMobile ? 100 : 50);

  return new IntersectionObserver(
    throttle((entries) => {
      try {
        entries.forEach(entry => {
          if (typeof callback === 'function') {
            callback(entry);
          }
        });
      } catch (error) {
        console.warn('IntersectionObserver callback error:', error);
      }
    }, throttleDelay),
    defaultOptions
  );
};

// GPU acceleration helper
export const enableGPUAcceleration = (element) => {
  if (element && element.style) {
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.willChange = 'transform';
    element.style.backfaceVisibility = 'hidden';
  }
};

// Check if device prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia && 
         window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Enhanced performance-aware device detection with iOS-specific checks
export const getDevicePerformance = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  // Enhanced low-end device detection
  const isLowEnd = (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (isIOS && /iPhone|iPod/.test(userAgent) && !/iPhone1[2-9]|iPhone[2-9]/.test(userAgent)) // Older iPhones
  );
  
  const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
                          ['slow-2g', '2g'].includes(navigator.connection.effectiveType);
  
  // iOS-specific performance considerations
  const iosVersion = isIOS ? parseFloat((userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/) || [,13,0,0])[1] + '.' + (userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/) || [,13,0,0])[2]) : null;
  const isOlderIOS = iosVersion && iosVersion < 14;
  
  return {
    isMobile,
    isIOS,
    isSafari,
    isLowEnd: isLowEnd || isOlderIOS,
    isSlowConnection,
    isHighPerformance: !isMobile && !isLowEnd && !isSlowConnection && !isOlderIOS,
    iosVersion
  };
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationDuration = (baseDuration = 300) => {
  const { isMobile, isLowEnd, isSlowConnection } = getDevicePerformance();
  
  if (prefersReducedMotion()) return 0;
  if (isSlowConnection) return Math.max(baseDuration * 0.5, 100);
  if (isMobile || isLowEnd) return Math.max(baseDuration * 0.7, 150);
  
  return baseDuration;
};

// Smart animation controller
export const createAnimationController = () => {
  let activeAnimations = new Set();
  let isScrolling = false;
  let scrollTimeout = null;
  
  // Pause animations during scroll
  const handleScroll = throttleRAF(() => {
    if (!isScrolling) {
      isScrolling = true;
      // Pause heavy animations during scroll
      activeAnimations.forEach(animation => {
        if (animation.pause && typeof animation.pause === 'function') {
          animation.pause();
        }
      });
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      // Resume animations after scroll
      activeAnimations.forEach(animation => {
        if (animation.resume && typeof animation.resume === 'function') {
          animation.resume();
        }
      });
    }, 150);
  });
  
  // Add passive scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return {
    register: (animation) => activeAnimations.add(animation),
    unregister: (animation) => activeAnimations.delete(animation),
    isScrolling: () => isScrolling,
    cleanup: () => {
      window.removeEventListener('scroll', handleScroll);
      activeAnimations.clear();
    }
  };
};

// Viewport-based animation trigger
export const createViewportTrigger = (element, callback, options = {}) => {
  const observer = createOptimizedObserver((entry) => {
    if (entry.isIntersecting) {
      callback(true);
    } else if (options.triggerOnExit) {
      callback(false);
    }
  }, {
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '50px'
  });
  
  if (element) {
    observer.observe(element);
  }
  
  return () => observer.disconnect();
};
