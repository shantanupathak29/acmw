import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  priority = false,
  placeholder = "blur",
  onLoad,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Set image source
  useEffect(() => {
    if (src && src.trim() !== '') {
      setImageSrc(src);
    }
  }, [src]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px', // Increased for faster loading
        threshold: 0.01, // Lower threshold for earlier trigger
      }
    );

    const imgElement = imgRef.current;
    if (imgElement && observerRef.current) {
      observerRef.current.observe(imgElement);
    }

    return () => {
      if (observerRef.current && imgElement) {
        observerRef.current.unobserve(imgElement);
      }
    };
  }, [priority, isInView]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    // Fallback avatar SVG
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 300}" height="${height || 300}" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#374151"/>
        <circle cx="150" cy="120" r="40" fill="#6B7280"/>
        <path d="M150 170C120 170 100 190 100 220V250H200V220C200 190 180 170 150 170Z" fill="#6B7280"/>
      </svg>
    `)}`;
    setIsLoaded(true);
  };

  // Generate low-quality placeholder
  const generatePlaceholder = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 300}" height="${height || 300}" viewBox="0 0 ${width || 300} ${height || 300}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1F2937"/>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </svg>
    `)}`;
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width, height: height }}
    >
      {/* Placeholder while loading */}
      {!isLoaded && placeholder === "blur" && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800"
          style={{
            backgroundImage: `url(${generatePlaceholder()})`,
            backgroundSize: 'cover',
            filter: 'blur(2px)',
            transform: 'scale(1.1)', // Slightly larger to hide blur edges
          }}
        />
      )}

      {/* Actual image */}
      {isInView && imageSrc && imageSrc.trim() !== '' && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center 25%' // Position focus on upper-center area where faces typically are
          }}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* Loading animation */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
