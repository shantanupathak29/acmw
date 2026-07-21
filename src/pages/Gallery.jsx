import React, { Suspense, lazy, useEffect, useState } from "react";
import "./Gallery.css";
import { preloadCriticalGalleryImages } from "../utils/galleryImageLoader";

// Lazy load components for better performance
const GalleryHero = lazy(() => import("../components/gallery/GalleryHero"));
const GalleryContainer = lazy(() => import("../components/gallery/GalleryContainer"));
const GalleryContent = lazy(() => import("../components/gallery/GalleryContent"));
const GalleryFallback = lazy(() => import("../components/gallery/GalleryFallback"));

// Import gallery data hook
import { useGalleryData } from "../components/gallery/GalleryDataProvider";

// Performance-optimized Gallery component
const Gallery = React.memo(() => {
  const [isPreloading, setIsPreloading] = useState(true);
  
  // Use the gallery data hook
  const { allImages } = useGalleryData();
  
  // Preload critical images immediately when component mounts
  useEffect(() => {
    console.log("🎨 Gallery mounted - starting critical image preload");
    const startTime = performance.now();
    
    // Preload critical images (first 4-6 images)
    preloadCriticalGalleryImages(allImages);
    
    // Mark as ready after a short delay to ensure critical images are loading
    const timer = setTimeout(() => {
      setIsPreloading(false);
      const endTime = performance.now();
      console.log(`✅ Gallery ready in ${(endTime - startTime).toFixed(2)}ms`);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [allImages]);

  // Show minimal loading for critical preload phase
  if (isPreloading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-white/60 text-sm">Preparing gallery...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryContainer>
        {/* Performance-optimized Gallery Hero Section */}
        <Suspense fallback={<GalleryFallback />}>
          <GalleryHero />
        </Suspense>

        {/* Performance-optimized Single Continuous Gallery */}
        <Suspense fallback={<GalleryFallback />}>
          <GalleryContent 
            images={allImages}
            title="Our Gallery"
            category="all"
          />
        </Suspense>
      </GalleryContainer>
    </Suspense>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;