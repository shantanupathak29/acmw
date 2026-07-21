import React, { useState, useEffect } from 'react';

// Gallery container with performance optimizations and loading state
const GalleryContainer = React.memo(({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Use RAF for smooth loading animation
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div 
      className={`gallery-container w-full min-h-screen bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] text-white transition-opacity duration-1000 will-change-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        fontFamily: 'Figtree, system-ui, -apple-system, sans-serif',
        transform: 'translateZ(0)', // GPU acceleration
        contentVisibility: 'auto'
      }}
    >
      {children}
    </div>
  );
});

GalleryContainer.displayName = 'GalleryContainer';

export default GalleryContainer;
