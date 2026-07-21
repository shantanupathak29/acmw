import React, { useMemo } from 'react';
import { getAllImages } from '../../data/galleryData';

// Hook for gallery data management
export const useGalleryData = () => {
  // Memoize the combined gallery images to prevent unnecessary recalculations
  const allImages = useMemo(() => getAllImages(), []);

  return {
    allImages
  };
};

// Gallery data provider component (if needed for context in the future)
const GalleryDataProvider = React.memo(({ children }) => {
  const galleryData = useGalleryData();

  return (
    <>
      {typeof children === 'function' ? children(galleryData) : children}
    </>
  );
});

GalleryDataProvider.displayName = 'GalleryDataProvider';

export default GalleryDataProvider;
