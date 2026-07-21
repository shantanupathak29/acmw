import React from 'react';

// Performance-optimized loading fallback component
const GalleryFallback = React.memo(() => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60 text-lg font-medium" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
        Loading Gallery...
      </p>
    </div>
  </div>
));

GalleryFallback.displayName = 'GalleryFallback';

export default GalleryFallback;
