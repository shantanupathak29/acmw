import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { loadImageWithPriority, getImagePriority } from '../../utils/galleryImageLoader';

/**
 * Highly optimized gallery image component with:
 * - Progressive loading (blur-up effect)
 * - Lazy loading with Intersection Observer
 * - Priority-based loading
 * - Error handling and retry logic
 * - Smooth fade-in animation
 * - GPU acceleration
 */
const OptimizedGalleryImage = memo(({ 
  src, 
  alt, 
  className = '', 
  index = 0,
  totalImages = 0,
  onLoad,
  onError,
  style = {},
  eager = false // Load immediately without lazy loading
}) => {
  const [loadState, setLoadState] = useState('idle'); // idle, loading, loaded, error
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  
  const MAX_RETRIES = 2;
  const priority = getImagePriority(index, totalImages);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || shouldLoad) return;
    
    const options = {
      // Start loading images 300px before they enter viewport
      rootMargin: '300px 0px',
      threshold: 0.01
    };
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          // Disconnect observer after triggering load
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      });
    }, options);
    
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [eager, shouldLoad]);
  
  // Load image when shouldLoad becomes true
  useEffect(() => {
    if (!shouldLoad || loadState === 'loaded' || loadState === 'loading') return;
    
    let isMounted = true;
    setLoadState('loading');
    
    const loadImage = async () => {
      try {
        await loadImageWithPriority(src, priority);
        
        if (isMounted) {
          setLoadState('loaded');
          onLoad?.();
        }
      } catch (error) {
        console.warn(`Failed to load image: ${src}`, error);
        
        if (isMounted) {
          if (retryCount < MAX_RETRIES) {
            // Retry after delay
            setTimeout(() => {
              if (isMounted) {
                setRetryCount(prev => prev + 1);
                setLoadState('idle');
                setShouldLoad(true);
              }
            }, 1000 * (retryCount + 1));
          } else {
            setLoadState('error');
            onError?.();
          }
        }
      }
    };
    
    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [shouldLoad, src, priority, onLoad, onError, retryCount, loadState]);
  
  // Create low-quality placeholder (LQIP) - tiny blurred version
  const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' preserveAspectRatio='xMidYMid slice' filter='url(%23b)' href='${src}'/%3E%3C/svg%3E`;
  
  return (
    <div 
      ref={imgRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        ...style,
        // GPU acceleration
        transform: 'translateZ(0)',
        willChange: loadState === 'loading' ? 'opacity' : 'auto',
        backfaceVisibility: 'hidden',
        // Contain paint operations
        contain: 'layout style paint',
      }}
    >
      {/* Low-quality placeholder with blur effect */}
      {loadState !== 'loaded' && loadState !== 'error' && (
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `url("${placeholderSVG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)', // Prevent blur edge artifacts
            opacity: loadState === 'loading' ? 0.6 : 0.8,
          }}
        />
      )}
      
      {/* Loading shimmer effect */}
      {loadState === 'loading' && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            animation: 'shimmer 2s infinite',
          }}
        />
      )}
      
      {/* Main image */}
      {shouldLoad && loadState !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loadState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            // Content visibility for better performance
            contentVisibility: 'auto',
            containIntrinsicSize: '300px 200px',
            // GPU acceleration
            transform: 'translateZ(0)',
            willChange: 'opacity',
          }}
          onLoad={() => {
            setLoadState('loaded');
            onLoad?.();
          }}
          onError={() => {
            if (retryCount < MAX_RETRIES) {
              setRetryCount(prev => prev + 1);
              setLoadState('idle');
              setTimeout(() => setShouldLoad(true), 1000);
            } else {
              setLoadState('error');
              onError?.();
            }
          }}
        />
      )}
      
      {/* Error state */}
      {loadState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 text-white/40">
          <svg 
            className="w-12 h-12 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs">Failed to load</span>
        </div>
      )}
      
      {/* Loading indicator for first few images */}
      {loadState === 'loading' && index < 4 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

OptimizedGalleryImage.displayName = 'OptimizedGalleryImage';

export default OptimizedGalleryImage;
