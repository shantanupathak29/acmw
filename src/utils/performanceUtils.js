// Additional performance utilities for image optimization

/**
 * Check if Intersection Observer is supported
 */
export const supportsIntersectionObserver = () => {
  return 'IntersectionObserver' in window;
};

/**
 * Create a debounced function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create a throttled function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
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

/**
 * Check device capabilities for optimization decisions
 * @returns {object} - Device capabilities
 */
export const getDeviceCapabilities = () => {
  return {
    isLowEndDevice: 'deviceMemory' in navigator && navigator.deviceMemory <= 4,
    isSlowConnection: 'connection' in navigator && 
      (navigator.connection?.effectiveType === 'slow-2g' || 
       navigator.connection?.effectiveType === '2g'),
    hasDataSaver: 'connection' in navigator && navigator.connection?.saveData,
    supportsWebP: checkWebPSupport(),
    supportsAVIF: checkAVIFSupport(),
  };
};

/**
 * Check WebP support
 * @returns {boolean}
 */
const checkWebPSupport = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Check AVIF support
 * @returns {boolean}
 */
const checkAVIFSupport = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
};