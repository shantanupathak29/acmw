/**
 * Advanced Gallery Image Loader
 * Implements progressive loading, priority-based loading, and smart preloading
 * Optimized for fastest load times and best user experience
 */

// Image loading priorities
const PRIORITY = {
  CRITICAL: 'high',      // First 4 images (above fold)
  HIGH: 'medium',        // Next 8 images (near viewport)
  NORMAL: 'low',         // Rest of images
  LAZY: 'auto'          // Far from viewport
};

// Device capability detection
const getDeviceCapabilities = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  return {
    // Network detection
    isSlowNetwork: connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g',
    isFastNetwork: connection?.effectiveType === '4g' || connection?.effectiveType === '5g',
    saveData: connection?.saveData || false,
    
    // Device detection
    isLowMemory: navigator.deviceMemory ? navigator.deviceMemory <= 4 : false,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    
    // Browser capabilities
    supportsWebP: checkWebPSupport(),
    supportsAVIF: false, // Disable AVIF for now as it's not widely supported
    supportsLoading: 'loading' in HTMLImageElement.prototype,
    supportsDecoding: 'decoding' in HTMLImageElement.prototype,
  };
};

// Check WebP support
function checkWebPSupport() {
  try {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  } catch (e) {
    return false;
  }
  return false;
}

// Create image cache
const imageCache = new Map();
const loadingPromises = new Map();

/**
 * Preload critical images (first 4-6 images)
 * These load immediately when gallery page loads
 */
export const preloadCriticalGalleryImages = (images) => {
  const capabilities = getDeviceCapabilities();
  const criticalCount = capabilities.isMobile ? 4 : 6;
  const criticalImages = images.slice(0, criticalCount);
  
  console.log(`🚀 Preloading ${criticalCount} critical gallery images`);
  
  criticalImages.forEach((imageData, index) => {
    // Use link preload for absolute fastest loading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageData.img;
    link.fetchPriority = 'high';
    
    // Add to head immediately
    if (document.head) {
      document.head.appendChild(link);
    }
    
    // Also preload via Image constructor for cache
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'high';
    
    const loadPromise = new Promise((resolve, reject) => {
      img.onload = () => {
        imageCache.set(imageData.img, img);
        console.log(`✅ Critical image ${index + 1}/${criticalCount} loaded`);
        resolve(img);
      };
      img.onerror = reject;
      
      // Timeout for slow networks
      setTimeout(() => reject(new Error('Timeout')), 10000);
    });
    
    loadingPromises.set(imageData.img, loadPromise);
    img.src = imageData.img;
  });
};

/**
 * Smart preload images based on scroll position and viewport
 * Preloads images that are likely to be seen next
 */
export const preloadNearbyImages = (images, currentScrollIndex = 0) => {
  const capabilities = getDeviceCapabilities();
  
  // Don't preload aggressively on slow networks or low memory
  if (capabilities.isSlowNetwork || capabilities.saveData || capabilities.isLowMemory) {
    return;
  }
  
  // Preload next 6 images after current position
  const preloadCount = capabilities.isMobile ? 4 : 6;
  const startIndex = Math.max(0, currentScrollIndex);
  const endIndex = Math.min(images.length, startIndex + preloadCount);
  const imagesToPreload = images.slice(startIndex, endIndex);
  
  imagesToPreload.forEach((imageData) => {
    // Skip if already loaded or loading
    if (imageCache.has(imageData.img) || loadingPromises.has(imageData.img)) {
      return;
    }
    
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    
    const loadPromise = new Promise((resolve) => {
      img.onload = () => {
        imageCache.set(imageData.img, img);
        resolve(img);
      };
      img.onerror = () => resolve(null); // Fail silently for preloads
    });
    
    loadingPromises.set(imageData.img, loadPromise);
    img.src = imageData.img;
  });
};

/**
 * Load image with priority and caching
 */
export const loadImageWithPriority = async (src, priority = PRIORITY.NORMAL) => {
  // Return from cache if available
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }
  
  // Return existing loading promise if already loading
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src);
  }
  
  // Create new loading promise
  const loadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    
    // Set priority based on importance
    if (typeof img.fetchPriority !== 'undefined') {
      img.fetchPriority = priority;
    }
    
    img.onload = () => {
      imageCache.set(src, img);
      loadingPromises.delete(src);
      resolve(img);
    };
    
    img.onerror = (error) => {
      loadingPromises.delete(src);
      reject(error);
    };
    
    img.src = src;
  });
  
  loadingPromises.set(src, loadPromise);
  return loadPromise;
};

/**
 * Get image load priority based on index
 */
export const getImagePriority = (index, totalImages) => {
  if (index < 4) return PRIORITY.CRITICAL;
  if (index < 12) return PRIORITY.HIGH;
  if (index < 24) return PRIORITY.NORMAL;
  return PRIORITY.LAZY;
};

/**
 * Clear image cache (useful for memory management)
 */
export const clearImageCache = () => {
  imageCache.clear();
  loadingPromises.clear();
};

/**
 * Get loading strategy based on device capabilities
 */
export const getLoadingStrategy = () => {
  const capabilities = getDeviceCapabilities();
  
  return {
    // Number of images to load at once
    batchSize: capabilities.isSlowNetwork ? 2 : 
               capabilities.isLowMemory ? 3 :
               capabilities.isMobile ? 4 : 6,
    
    // Delay between batches (ms)
    batchDelay: capabilities.isSlowNetwork ? 500 :
                capabilities.isLowMemory ? 300 :
                capabilities.isMobile ? 150 : 100,
    
    // Preload distance (number of images ahead to preload)
    preloadDistance: capabilities.isSlowNetwork ? 2 :
                     capabilities.isLowMemory ? 3 :
                     capabilities.isMobile ? 4 : 6,
    
    // Use progressive loading
    useProgressive: !capabilities.isSlowNetwork && !capabilities.saveData,
    
    // Enable smart preloading
    enablePreload: !capabilities.isSlowNetwork && !capabilities.saveData && !capabilities.isLowMemory,
    
    capabilities
  };
};

/**
 * Progressive image loader - loads images in optimized batches
 */
export class ProgressiveImageLoader {
  constructor(images, options = {}) {
    this.images = images;
    this.strategy = getLoadingStrategy();
    this.currentBatch = 0;
    this.loadedCount = 0;
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
  }
  
  async start() {
    console.log(`📦 Starting progressive load of ${this.images.length} images`);
    console.log(`⚙️ Strategy:`, this.strategy);
    
    // Load critical images first
    await this.loadBatch(0, Math.min(4, this.images.length), PRIORITY.CRITICAL);
    
    // Load remaining images in batches
    const remainingStart = 4;
    const totalBatches = Math.ceil((this.images.length - remainingStart) / this.strategy.batchSize);
    
    for (let i = 0; i < totalBatches; i++) {
      const start = remainingStart + (i * this.strategy.batchSize);
      const end = Math.min(start + this.strategy.batchSize, this.images.length);
      const priority = i === 0 ? PRIORITY.HIGH : PRIORITY.NORMAL;
      
      await this.loadBatch(start, end, priority);
      
      // Small delay between batches to prevent overwhelming the browser
      if (i < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, this.strategy.batchDelay));
      }
    }
    
    this.onComplete();
    console.log(`✅ All ${this.images.length} images loaded`);
  }
  
  async loadBatch(start, end, priority) {
    const batch = this.images.slice(start, end);
    const promises = batch.map(imageData => 
      loadImageWithPriority(imageData.img, priority)
        .then(() => {
          this.loadedCount++;
          this.onProgress(this.loadedCount, this.images.length);
        })
        .catch(err => {
          console.warn(`Failed to load image: ${imageData.img}`, err);
          this.loadedCount++;
          this.onProgress(this.loadedCount, this.images.length);
        })
    );
    
    await Promise.allSettled(promises);
  }
}

/**
 * Viewport-based image observer
 * Only loads images when they're about to enter viewport
 */
export class ViewportImageObserver {
  constructor(options = {}) {
    this.rootMargin = options.rootMargin || '200px'; // Start loading 200px before entering viewport
    this.threshold = options.threshold || 0.01;
    this.observers = new Map();
  }
  
  observe(element, onIntersect) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onIntersect(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      }
    );
    
    observer.observe(element);
    this.observers.set(element, observer);
  }
  
  unobserve(element) {
    const observer = this.observers.get(element);
    if (observer) {
      observer.unobserve(element);
      this.observers.delete(element);
    }
  }
  
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export default {
  preloadCriticalGalleryImages,
  preloadNearbyImages,
  loadImageWithPriority,
  getImagePriority,
  getLoadingStrategy,
  clearImageCache,
  ProgressiveImageLoader,
  ViewportImageObserver
};
