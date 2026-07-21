import React from 'react';

const GalleryLoadingSkeleton = ({ type = 'grid' }) => {
  if (type === 'hero') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="h-8 bg-white/10 rounded-lg w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === 'navigation') {
    return (
      <div className="w-full py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 bg-white/10 rounded-full w-24 animate-pulse"
                style={{ animationDelay: `${index * 100}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 animate-pulse"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
                <div className="h-8 bg-white/20 rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default grid skeleton
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-2xl animate-pulse"
              style={{
                height: `${250 + (index % 3) * 50}px`,
                animationDelay: `${index * 50}ms`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryLoadingSkeleton;
