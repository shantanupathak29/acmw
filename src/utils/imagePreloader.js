// Critical image preloader for immediate loading
// This should be called as early as possible in the app lifecycle

import { boe } from '../data/teamData';

/**
 * Enhanced preload critical team images with iOS Safari compatibility
 * Call this function as early as possible in your app
 */
export const preloadCriticalImages = () => {
  try {
    // Check if we're on iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    // Get first 6 BOE images (most likely to be seen first)
    const criticalImages = boe.slice(0, 6).map(member => member.image);
    
    criticalImages.forEach((src, index) => {
      try {
        // Create preload link with enhanced iOS compatibility
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        link.fetchPriority = index < 3 ? 'high' : 'auto';
        link.setAttribute('imagesizes', '(max-width: 768px) 100vw, 300px');
        
        // Add error handling for iOS
        link.onerror = () => {
          console.warn(`Failed to preload image via link: ${src}`);
        };
        
        // Insert at the beginning of head for highest priority
        if (document.head) {
          document.head.insertBefore(link, document.head.firstChild);
        }
      } catch (linkError) {
        console.warn(`Failed to create preload link for: ${src}`, linkError);
      }
    });

    // Also preload using Image constructor with enhanced error handling
    criticalImages.forEach((src, index) => {
      try {
        const img = new Image();
        
        // Add proper error handling for iOS
        img.onerror = (error) => {
          console.warn(`Failed to preload image via Image constructor: ${src}`, error);
        };
        
        img.onload = () => {
          // Image loaded successfully
          if (index === 0) {
            console.log('First critical image loaded successfully');
          }
        };
        
        // Set timeout for iOS Safari which can sometimes hang on image loading
        if (isIOS || isSafari) {
          setTimeout(() => {
            img.src = src;
          }, index * 100); // Stagger loading on iOS
        } else {
          img.src = src;
        }
        
      } catch (imgError) {
        console.warn(`Failed to create Image object for: ${src}`, imgError);
      }
    });
    
  } catch (error) {
    console.error('Critical image preloading failed:', error);
  }
};

/**
 * Enhanced preload images in background after initial render with iOS compatibility
 */
export const preloadSecondaryImages = () => {
  try {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    const secondaryImages = [
      ...boe.slice(6).map(member => member.image),
      // Add other image sets as needed
    ];

    // Use smaller batch size for iOS to prevent memory issues
    const batchSize = (isIOS || isSafari) ? 2 : 3;
    let currentBatch = 0;

    const loadBatch = () => {
      try {
        const start = currentBatch * batchSize;
        const end = start + batchSize;
        const batch = secondaryImages.slice(start, end);

        batch.forEach((src, index) => {
          try {
            const img = new Image();
            
            img.onerror = (error) => {
              console.warn(`Failed to preload secondary image: ${src}`, error);
            };
            
            // Add timeout for iOS to prevent hanging
            if (isIOS || isSafari) {
              setTimeout(() => {
                img.src = src;
              }, index * 50);
            } else {
              img.src = src;
            }
            
          } catch (imgError) {
            console.warn(`Failed to create Image object for secondary image: ${src}`, imgError);
          }
        });

        currentBatch++;
        if (end < secondaryImages.length) {
          // Use longer delay on iOS to prevent overwhelming the browser
          const delay = (isIOS || isSafari) ? 500 : 200;
          setTimeout(loadBatch, delay);
        }
        
      } catch (batchError) {
        console.warn('Error loading image batch:', batchError);
      }
    };

    // Start loading after a longer delay on iOS
    const initialDelay = (isIOS || isSafari) ? 2000 : 1000;
    setTimeout(loadBatch, initialDelay);
    
  } catch (error) {
    console.error('Secondary image preloading failed:', error);
  }
};
