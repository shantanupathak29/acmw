import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, ZoomIn, Download, Heart, Filter, Search } from 'lucide-react';

// Simple Modal Components to replace MorphingDialog
const SimpleModal = ({ isOpen, onClose, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentScrollY);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      
      // Hide navbar when modal is open
      const navbar = document.querySelector('.navbar-container');
      if (navbar) {
        navbar.style.display = 'none';
      }
    } else {
      // Restore body scroll and position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position immediately
      window.scrollTo(0, scrollPosition);
      
      // Show navbar when modal is closed
      const navbar = document.querySelector('.navbar-container');
      if (navbar) {
        navbar.style.display = 'block';
      }
    }
    
    return () => {
      // Cleanup on unmount - ensure navbar is visible and restore scroll
      const navbar = document.querySelector('.navbar-container');
      if (navbar) {
        navbar.style.display = 'block';
      }
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, scrollPosition]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="gallery-modal">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm modal-backdrop"
        onClick={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <div className="gallery-modal-content">
        {children}
      </div>
    </div>
  );
};

// Enhanced background animation matching Initiative and Achievement sections
const GalleryBackgroundAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.querySelector('.gallery-masonry-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Gallery-focused symbols matching the theme
  const gallerySymbols = ['📷', '🖼️', '✨', '🎨', '💫', '🌟', '📸', '🎭'];
  const codeSymbols = ['{ }', '< />', '===', '=>', '&&', '||', '++', '--'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {/* Animated progress bars like Achievement section */}
      <div className={`absolute top-20 left-10 w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'left' }} />
      <div className={`absolute top-40 right-20 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 delay-300 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'right' }} />
      <div className={`absolute bottom-32 left-1/4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 delay-500 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'left' }} />

      {/* Floating gallery symbols with enhanced animations */}
      {gallerySymbols.map((symbol, index) => (
        <div
          key={`symbol-${index}`}
          className={`absolute text-xl transition-all duration-1000 will-change-transform animate-float-gallery ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            top: `${15 + (index * 10)}%`,
            left: `${8 + (index * 11) % 75}%`,
            animationDelay: `${index * 200}ms`,
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))',
            animationDuration: `${4 + (index % 3)}s`,
          }}
        >
          {symbol}
        </div>
      ))}
      
      {/* Subtle code elements with scroll animation */}
      {codeSymbols.map((code, index) => (
        <div
          key={`code-${index}`}
          className={`absolute text-purple-400/20 font-mono text-sm transition-all duration-1000 will-change-transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            top: `${20 + (index * 12)}%`,
            right: `${10 + (index * 8) % 60}%`,
            animationDelay: `${index * 150}ms`,
          }}
        >
          {code}
        </div>
      ))}

      {/* Geometric shapes with orbital animations */}
      <div className={`absolute top-1/4 left-1/4 w-16 h-16 border border-purple-400/10 rounded-lg transition-all duration-1000 will-change-transform animate-orbit-slow ${
        isVisible ? 'opacity-100 rotate-45 scale-100' : 'opacity-0 rotate-0 scale-75'
      }`} style={{ animationDelay: '300ms' }} />
      
      <div className={`absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full transition-all duration-1000 will-change-transform animate-orbit-reverse ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`} style={{ animationDelay: '500ms' }} />

      <div className={`absolute top-1/2 left-1/6 w-8 h-8 border-2 border-pink-400/15 rounded-full transition-all duration-1000 will-change-transform animate-gentle-float ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`} style={{ animationDelay: '700ms' }} />

      {/* Moving text animations like Initiative section */}
      <div className="absolute top-1/5 left-0 w-full">
        <div className="animate-scroll-right text-purple-400/30 font-mono text-xs whitespace-nowrap">
          📸 capturing memories ◆ 🎨 creating art ◆ ✨ preserving moments ◆ 🖼️ sharing stories ◆
        </div>
      </div>
      <div className="absolute bottom-1/5 right-0 w-full">
        <div className="animate-scroll-left text-cyan-400/30 font-mono text-xs whitespace-nowrap text-right">
          ◇ visual storytelling ◇ creative expression ◇ digital memories ◇ artistic vision ◇
        </div>
      </div>

      {/* Sparkle effects like Achievement section */}
      {[...Array(6)].map((_, index) => (
        <div 
          key={`sparkle-${index}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"
          style={{ 
            top: `${20 + (index * 15)}%`,
            left: `${15 + (index * 13) % 70}%`,
            animationDelay: `${index * 800}ms`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

// Performance-optimized image component with lazy loading
const OptimizedImage = React.memo(({ src, alt, className, onLoad, onError, loading = "lazy" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-xl" />
      )}
      
      {!imageError && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{ 
            contentVisibility: 'auto',
            containIntrinsicSize: '300px 200px'
          }}
        />
      )}
      
      {imageError && (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center rounded-xl">
          <Filter className="w-8 h-8 text-white/40" />
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Performance-optimized masonry item with intersection observer
const MasonryItem = React.memo(({ image, index }) => {
  const [likedImages, setLikedImages] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(300);
  const [isInView, setIsInView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemRef = useRef(null);

  // Intersection observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleLike = useCallback((imageId, e) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newLikedImages = new Set(prev);
      if (newLikedImages.has(imageId)) {
        newLikedImages.delete(imageId);
      } else {
        newLikedImages.add(imageId);
      }
      return newLikedImages;
    });
  }, []);

  const downloadImage = useCallback((imageUrl, imageName, e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName || 'gallery-image';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Optimized height calculation
  const heights = useMemo(() => [250, 300, 350, 400, 320, 280], []);
  
  useEffect(() => {
    setImageHeight(heights[index % heights.length]);
  }, [index, heights]);

  return (
    <div ref={itemRef} className="w-full">
      {isInView && (
        <>
          {/* Desktop version with modal */}
          <div className="group relative w-full hidden md:block">
            <div 
              className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 will-change-transform cursor-pointer ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                height: `${imageHeight}px`,
                transform: 'translateZ(0)', // GPU acceleration
                contentVisibility: 'auto'
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <OptimizedImage
                src={image.img}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
              
              {/* Optimized gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity"></div>
              
              {/* Content overlay with better performance */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity">
                {/* Top actions */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(image.img, image.alt, e);
                    }}
                    className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors duration-200 transform hover:scale-110 will-change-transform"
                    aria-label="Download image"
                  >
                    <Download size={14} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(image.id, e);
                    }}
                    className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors duration-200 transform hover:scale-110 will-change-transform"
                    aria-label="Like image"
                  >
                    <Heart 
                      size={14} 
                      className={`${likedImages.has(image.id) ? 'text-red-400 fill-red-400' : 'text-white'} transition-colors duration-200`} 
                    />
                  </button>
                </div>

                {/* Bottom content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full border border-purple-400/30">
                      {image.event}
                    </span>
                    {image.category && (
                      <span className="px-2 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/50 rounded-full border border-cyan-400/30">
                        {image.category}
                      </span>
                    )}
                  </div>
                  <h4 
                    className="text-white font-semibold text-sm leading-tight"
                    style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
                  >
                    {image.alt}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">Click to view</span>
                    <ZoomIn size={14} className="text-white/70" />
                  </div>
                </div>
              </div>

              {/* Optimized hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Modal for desktop */}
          <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative flex flex-col items-center justify-center p-8">
              <div className="relative">
                <img
                  src={image.img}
                  alt={image.alt}
                  className="max-w-[60vw] max-h-[60vh] object-contain rounded-xl shadow-2xl"
                  style={{ 
                    display: 'block',
                    minWidth: 'min(350px, 50vw)',
                    minHeight: 'min(250px, 35vh)'
                  }}
                />
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="close-button absolute -top-4 -right-4"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Enhanced image info below the image */}
              <div className="mt-6 bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-xl max-w-[60vw] w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/60 rounded-full border border-purple-400/30">
                        {image.event}
                      </span>
                      {image.category && (
                        <span className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/60 rounded-full border border-cyan-400/30">
                          {image.category}
                        </span>
                      )}
                      {image.tags && image.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-700/60 rounded-full border border-gray-500/30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
                      {image.alt}
                    </h3>
                    <p className="text-sm text-gray-300">
                      High resolution • Gallery view
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.img, image.alt, e);
                      }}
                      className="p-2 bg-white/15 hover:bg-white/25 rounded-full transition-colors duration-200 border border-white/20"
                    >
                      <Download size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SimpleModal>

          {/* Simple image display for mobile devices (no overlay) */}
          <div className="md:hidden relative">
            <div 
              className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 will-change-transform ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                height: `${imageHeight}px`,
                transform: 'translateZ(0)', // GPU acceleration
                contentVisibility: 'auto'
              }}
            >
              <OptimizedImage
                src={image.img}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
              
              {/* Simple overlay with just image info for mobile */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full border border-purple-400/30">
                    {image.event}
                  </span>
                  {image.category && (
                    <span className="px-2 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/50 rounded-full border border-cyan-400/30">
                      {image.category}
                    </span>
                  )}
                </div>
                <h4 
                  className="text-white font-semibold text-sm leading-tight"
                  style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
                >
                  {image.alt}
                </h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

MasonryItem.displayName = 'MasonryItem';

// Filter and search component
const GalleryFilters = ({ images, onFilterChange, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');

  // Get unique events from images
  const events = ['all', ...new Set(images.map(img => img.event))];

  useEffect(() => {
    const filteredImages = images.filter(image => {
      const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           image.event.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEvent = selectedEvent === 'all' || image.event === selectedEvent;
      return matchesSearch && matchesEvent;
    });
    onFilterChange(filteredImages);
  }, [searchTerm, selectedEvent, images, onFilterChange]);

  return (
    <div className="mb-8 space-y-4">
      {/* Search bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300"
          style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
        />
      </div>

      {/* Event filters */}
      {events.length > 2 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2">
            {events.map((event) => (
              <button
                key={event}
                onClick={() => setSelectedEvent(event)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedEvent === event
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                }`}
                style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
              >
                {event === 'all' ? 'All Events' : event}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryMasonry = ({ images, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [images]);

  return (
    <section className="gallery-masonry-section relative py-20 overflow-hidden">
      {/* Enhanced background with animation */}
      <GalleryBackgroundAnimation />
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
          >
            {title}
          </h2>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
          >
            Discover our collection of memorable moments and achievements
          </p>
          
          {/* Image count */}
          <div className="flex justify-center">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
              {images.length} {images.length === 1 ? 'image' : 'images'}
            </span>
          </div>
        </div>

        {/* Masonry grid */}
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {images.map((image, index) => (
                <div key={image.id} className="break-inside-avoid mb-4">
                  <MasonryItem
                    image={image}
                    index={index}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 opacity-50">
                <Filter className="w-full h-full text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
                No images found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryMasonry;
