import React, { memo, useState, useEffect, useMemo, useCallback, useRef } from "react";

// Intersection Observer hook for viewport optimization
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);
  const hasIntersectedRef = useRef(false);
  const observerRef = useRef(null);

  // Memoize options to prevent infinite re-renders
  const memoizedOptions = useMemo(() => ({
    threshold: [0, 0.05],
    rootMargin: '200px',
    ...options
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const currentTarget = targetRef.current;
    if (!currentTarget) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once for initial intersection
        if (entry.isIntersecting && !hasIntersectedRef.current) {
          hasIntersectedRef.current = true;
          setIsIntersecting(true);
        }
      },
      memoizedOptions
    );

    observerRef.current.observe(currentTarget);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [memoizedOptions]);

  const setTargetRef = useCallback((node) => {
    targetRef.current = node;
  }, []);

  return [setTargetRef, isIntersecting];
};

// Optimized section wrapper that only renders when in viewport
export const ViewportOptimizedSection = memo(({ children, className = "", fallbackHeight = "400px" }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '200px' // Increased for earlier loading
  });

  const placeholderStyle = useMemo(() => ({
    height: fallbackHeight,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: fallbackHeight,
    contain: 'layout style paint' // Prevent layout shifts
  }), [fallbackHeight]);

  return React.createElement(
    'div',
    { 
      ref: ref, 
      className: className,
      style: { minHeight: fallbackHeight } // Ensure consistent height
    },
    isIntersecting ? 
      children : 
      React.createElement(
        'div',
        { style: placeholderStyle },
        React.createElement('div', {
          className: "animate-pulse bg-gray-800 rounded w-full h-full opacity-20"
        })
      )
  );
});

ViewportOptimizedSection.displayName = 'ViewportOptimizedSection';

// Throttled scroll handler
const useThrottledScroll = (callback, delay = 16) => {
  const [isThrottled, setIsThrottled] = useState(false);
  const timeoutRef = useRef(null);

  const throttledCallback = useCallback((...args) => {
    if (!isThrottled) {
      callback(...args);
      setIsThrottled(true);
      
      timeoutRef.current = setTimeout(() => {
        setIsThrottled(false);
      }, delay);
    }
  }, [callback, delay, isThrottled]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

// Performance monitoring hook
const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // If rendering takes more than 16ms (60fps)
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  }, [componentName]);
};

export { useIntersectionObserver, useThrottledScroll, usePerformanceMonitor };
