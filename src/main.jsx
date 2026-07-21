import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

// Enhanced error handling for iPhone compatibility
const initializeImagePreloader = async () => {
  try {
    // Check if we're on iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    // Use dynamic import with better error handling
    const { preloadCriticalImages, preloadSecondaryImages } = await import('./utils/imagePreloader');
    
    // Preload critical images immediately but with iOS-specific delays
    if (isIOS || isSafari) {
      // iOS needs longer delays to prevent blocking
      setTimeout(() => {
        try {
          preloadCriticalImages();
        } catch (error) {
          console.warn('Critical image preloading failed on iOS:', error);
        }
      }, 500);
    } else {
      preloadCriticalImages();
    }
    
    // Preload secondary images with enhanced iOS compatibility
    const scheduleSecondaryPreload = () => {
      try {
        preloadSecondaryImages();
      } catch (error) {
        console.warn('Secondary image preloading failed:', error);
      }
    };

    if (typeof requestIdleCallback === 'function' && !isIOS) {
      // Don't use requestIdleCallback on iOS as it can be unreliable
      requestIdleCallback(scheduleSecondaryPreload, { timeout: 3000 });
    } else {
      // Use longer timeout for iOS devices
      const delay = isIOS ? 3000 : 2000;
      setTimeout(scheduleSecondaryPreload, delay);
    }
    
  } catch (error) {
    console.warn('Image preloader module failed to load:', error);
    // Fallback: at least ensure basic functionality works
    try {
      // Create a minimal fallback preloader
      const criticalImages = [
        '/src/assets/img/acm_w.png',
        '/src/assets/img/acm_and_acm-w_logo.png'
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.onerror = () => console.warn('Failed to preload:', src);
        img.src = src;
      });
    } catch (fallbackError) {
      console.warn('Fallback image preloading failed:', fallbackError);
    }
  }
};

// Initialize with proper error boundaries
initializeImagePreloader();
