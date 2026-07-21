import React from 'react';
import { getImagesByCategory } from '../../data/galleryData';

// Gallery section component for future use (if sections need to be separated)
const GallerySection = React.memo(({ category, title, className = "" }) => {
  const images = getImagesByCategory(category);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className={`gallery-section ${className}`}>
      {title && (
        <div className="section-header text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <img
              src={image.img}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm">{image.event}</p>
                <p className="text-white/80 text-xs">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
