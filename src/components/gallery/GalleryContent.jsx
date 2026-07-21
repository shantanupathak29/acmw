import React, { Suspense } from 'react';
import GalleryLoadingSkeleton from './GalleryLoadingSkeleton';
import GalleryMasonryOptimized from './GalleryMasonryOptimized';

// Gallery content wrapper component with optimized loading
const GalleryContent = React.memo(({ images, title = "Our Gallery", category = "all" }) => {
  return (
    <div id="gallery-content" className="relative">
      <Suspense fallback={<GalleryLoadingSkeleton />}>
        <GalleryMasonryOptimized 
          images={images}
          title={title}
          category={category}
        />
      </Suspense>
    </div>
  );
});

GalleryContent.displayName = 'GalleryContent';

export default GalleryContent;
