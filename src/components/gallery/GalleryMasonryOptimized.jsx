import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, ZoomIn, Heart, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedGalleryImage from './OptimizedGalleryImage';
import { 
  ProgressiveImageLoader, 
  ViewportImageObserver, 
  preloadNearbyImages,
  getLoadingStrategy 
} from '../../utils/galleryImageLoader';

// Simple Modal Components
const SimpleModal = ({ isOpen, onClose, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentScrollY);
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      
      const navbar = document.querySelector('.navbar-container');
      if (navbar) navbar.style.display = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
      
      const navbar = document.querySelector('.navbar-container');
      if (navbar) navbar.style.display = 'block';
    }
    
    return () => {
      const navbar = document.querySelector('.navbar-container');
      if (navbar) navbar.style.display = 'block';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, scrollPosition]);

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

// Enhanced background animation
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

  const gallerySymbols = ['📷', '🖼️', '✨', '🎨', '💫', '🌟', '📸', '🎭'];
  const codeSymbols = ['{ }', '< />', '===', '=>', '&&', '||', '++', '--'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className={`absolute top-20 left-10 w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'left' }} />
      <div className={`absolute top-40 right-20 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 delay-300 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'right' }} />
      <div className={`absolute bottom-32 left-1/4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 delay-500 ${
        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`} style={{ transformOrigin: 'left' }} />

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

      <div className={`absolute top-1/4 left-1/4 w-16 h-16 border border-purple-400/10 rounded-lg transition-all duration-1000 will-change-transform animate-orbit-slow ${
        isVisible ? 'opacity-100 rotate-45 scale-100' : 'opacity-0 rotate-0 scale-75'
      }`} style={{ animationDelay: '300ms' }} />
      
      <div className={`absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full transition-all duration-1000 will-change-transform animate-orbit-reverse ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`} style={{ animationDelay: '500ms' }} />

      <div className={`absolute top-1/2 left-1/6 w-8 h-8 border-2 border-pink-400/15 rounded-full transition-all duration-1000 will-change-transform animate-gentle-float ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`} style={{ animationDelay: '700ms' }} />

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

// Optimized masonry item
const MasonryItem = React.memo(({ image, index, totalImages, onOpenModal }) => {
  const [likedImages, setLikedImages] = useState(new Set());
  const [imageHeight, setImageHeight] = useState(300);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const heights = useMemo(() => [250, 300, 350, 400, 320, 280], []);
  
  useEffect(() => {
    setImageHeight(heights[index % heights.length]);
  }, [index, heights]);

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

  // Determine if this image should load eagerly (first 4 images)
  const isEager = index < 4;

  return (
    <div className="w-full">
      {/* Desktop version with modal */}
      <div className="group relative w-full hidden md:block">
        <div 
          className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 will-change-transform cursor-pointer"
          style={{ 
            height: `${imageHeight}px`,
            transform: 'translateZ(0)',
            contentVisibility: 'auto'
          }}
          onClick={() => onOpenModal && onOpenModal(index)}
        >
          <OptimizedGalleryImage
            src={image.img}
            alt={image.alt}
            index={index}
            totalImages={totalImages}
            eager={isEager}
            className="transition-transform duration-700 group-hover:scale-110 will-change-transform"
            onLoad={() => setLoadProgress(100)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity">
            {/* Top actions */}
            <div className="flex justify-end space-x-2">
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

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-opacity">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Simple image display for mobile */}
      <div className="md:hidden relative">
        <div 
          className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 will-change-transform"
          style={{ 
            height: `${imageHeight}px`,
            transform: 'translateZ(0)',
            contentVisibility: 'auto'
          }}
        >
          <OptimizedGalleryImage
            src={image.img}
            alt={image.alt}
            index={index}
            totalImages={totalImages}
            eager={isEager}
            className="transition-transform duration-700 will-change-transform"
            onLoad={() => setLoadProgress(100)}
          />
          
          {/* Simple overlay for mobile */}
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
    </div>
  );
});

MasonryItem.displayName = 'MasonryItem';

// Main Gallery Masonry Component
const GalleryMasonry = ({ images, title }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const loaderRef = useRef(null);
  const strategy = useMemo(() => getLoadingStrategy(), []);

  const handleOpenModal = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleNavigate = useCallback((newIndex) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImageIndex(newIndex);
    }
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleNavigate(selectedImageIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNavigate(selectedImageIndex + 1);
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImageIndex, handleNavigate, handleCloseModal]);

  useEffect(() => {
    console.log(`📊 Gallery loading strategy:`, strategy);
    
    // Start progressive image loading
    loaderRef.current = new ProgressiveImageLoader(images, {
      onProgress: (loaded, total) => {
        const progress = Math.round((loaded / total) * 100);
        setLoadingProgress(progress);
        console.log(`📈 Loading progress: ${loaded}/${total} (${progress}%)`);
      },
      onComplete: () => {
        setIsFullyLoaded(true);
        console.log(`✅ All ${images.length} gallery images loaded`);
      }
    });

    loaderRef.current.start();

    return () => {
      loaderRef.current = null;
    };
  }, [images, strategy]);

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
          
          {/* Image count and loading progress */}
          <div className="flex flex-col items-center gap-3">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
              {images.length} {images.length === 1 ? 'image' : 'images'}
            </span>
            
            {/* Loading progress bar */}
            {!isFullyLoaded && loadingProgress < 100 && (
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="transition-opacity duration-700 opacity-100">
          {images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {images.map((image, index) => (
                <div key={image.id} className="break-inside-avoid mb-4">
                  <MasonryItem
                    image={image}
                    index={index}
                    totalImages={images.length}
                    onOpenModal={handleOpenModal}
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

      {/* Shared Modal for all images */}
      {selectedImageIndex !== null && (
        <SimpleModal isOpen={true} onClose={handleCloseModal}>
          <div className="relative flex flex-col items-center justify-center p-2 sm:p-4">
            {/* Navigation buttons */}
            {selectedImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(selectedImageIndex - 1);
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all duration-200 border border-white/20 hover:border-white/40 group"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>
            )}
            
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(selectedImageIndex + 1);
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all duration-200 border border-white/20 hover:border-white/40 group"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>
            )}

            <div className="relative w-full flex items-center justify-center">
              <img
                src={images[selectedImageIndex].img}
                alt={images[selectedImageIndex].alt}
                className="max-w-[95vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                style={{ 
                  display: 'block'
                }}
              />
              
              <button
                onClick={handleCloseModal}
                className="close-button absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image info - compact version */}
            <div className="mt-3 bg-black/90 backdrop-blur-md rounded-lg p-2 sm:p-3 shadow-xl max-w-[95vw] w-full">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 text-xs font-medium text-purple-300 bg-purple-900/60 rounded-full border border-purple-400/30">
                      {images[selectedImageIndex].event}
                    </span>
                    {images[selectedImageIndex].category && (
                      <span className="px-2 py-0.5 text-xs font-medium text-cyan-300 bg-cyan-900/60 rounded-full border border-cyan-400/30">
                        {images[selectedImageIndex].category}
                      </span>
                    )}
                    {images[selectedImageIndex].tags && images[selectedImageIndex].tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs font-medium text-gray-300 bg-gray-700/60 rounded-full border border-gray-500/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
                    {images[selectedImageIndex].alt}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </SimpleModal>
      )}
    </section>
  );
};

export default GalleryMasonry;
