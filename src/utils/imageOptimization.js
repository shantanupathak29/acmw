/**
 * Image optimization utilities for the ACM-W website
 * Handles lazy loading, responsive images, and performance optimization
 */

/**
 * Preload critical images with modern techniques
 * @param {string[]} imageSrcs - Array of image URLs to preload
 * @param {object} options - Preload options
 */
export const preloadImages = (imageSrcs, options = {}) => {
  const { 
    priority = false,
    sizes = '(max-width: 768px) 100vw, 50vw',
    onLoad = () => {},
    onError = () => {}
  } = options;

  imageSrcs.forEach((src) => {
    if (!src || src.trim() === '') return;

    // Use Image() for preloading to avoid "not used" warnings
    const img = new Image();
    img.onload = onLoad;
    img.onerror = onError;
    
    // Set loading strategy based on priority
    if (priority) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else {
      img.loading = 'lazy';
      img.fetchPriority = 'auto';
    }
    
    img.src = src;
  });
};

/**
 * Convert image to WebP format if supported
 * @param {string} src - Original image source
 * @returns {string} - WebP source if supported, original otherwise
 */
export const getOptimizedImageSrc = (src) => {
  // Check if browser supports WebP
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  if (supportsWebP() && src) {
    // If the image is already in a modern format, return as is
    if (src.includes('.webp') || src.includes('.avif')) {
      return src;
    }
    
    // For local images, you might want to serve WebP versions
    // This is a placeholder - you'd implement your own logic
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    return webpSrc;
  }
  
  return src;
};

/**
 * Generate responsive image srcset
 * @param {string} baseSrc - Base image source
 * @param {number[]} widths - Array of widths for responsive images
 * @returns {string} - srcset string
 */
export const generateSrcSet = (baseSrc, widths = [300, 600, 900, 1200]) => {
  return widths
    .map(width => {
      // This is a placeholder - you'd implement your own logic for different sizes
      const responsiveSrc = baseSrc.replace(/\.(jpe?g|png|webp)$/i, `_${width}w.$1`);
      return `${responsiveSrc} ${width}w`;
    })
    .join(', ');
};

/**
 * Create a low-quality image placeholder (LQIP)
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} color - Dominant color (optional)
 * @returns {string} - Data URL for placeholder
 */
export const createImagePlaceholder = (width = 300, height = 300, color = '#374151') => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#shimmer)" opacity="0.3"/>
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
          <animateTransform attributeName="gradientTransform" attributeType="XML" type="translate" values="-100 0;100 0;-100 0" dur="2s" repeatCount="indefinite"/>
        </linearGradient>
      </defs>
    </svg>
  `)}`;
};

/**
 * Optimize image loading strategy based on device capabilities
 * @returns {object} - Loading strategy configuration
 */
export const getLoadingStrategy = () => {
  // Check if user has enabled data saver
  const isDataSaverEnabled = 'connection' in navigator && navigator.connection?.saveData;
  
  // Check connection speed
  const isSlowConnection = 'connection' in navigator && 
    (navigator.connection?.effectiveType === 'slow-2g' || 
     navigator.connection?.effectiveType === '2g');

  // Check if device has limited memory
  const isLowEndDevice = 'deviceMemory' in navigator && navigator.deviceMemory <= 4;

  return {
    shouldPreload: !isDataSaverEnabled && !isSlowConnection,
    shouldLazyLoad: isSlowConnection || isLowEndDevice,
    quality: isDataSaverEnabled || isSlowConnection ? 'low' : 'high',
    batchSize: isLowEndDevice ? 3 : 6, // Number of images to load simultaneously
  };
};

/**
 * Batch load images to prevent overwhelming the browser
 * @param {string[]} imageSrcs - Array of image URLs
 * @param {number} batchSize - Number of images to load at once
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const batchLoadImages = async (imageSrcs, batchSize = 6) => {
  const batches = [];
  for (let i = 0; i < imageSrcs.length; i += batchSize) {
    batches.push(imageSrcs.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    const promises = batch.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to load ${src}`));
        img.src = src;
      });
    });

    try {
      await Promise.allSettled(promises);
      // Small delay between batches to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.warn('Some images failed to load in batch:', error);
    }
  }
};