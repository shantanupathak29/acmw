/**
 * Extract dominant color from an image
 * @param {string} imageSrc - Image source URL
 * @param {number} quality - Sampling quality (1-10, lower is faster but less accurate)
 * @returns {Promise<{rgb: string, hex: string, gradient: string}>}
 */
export const extractDominantColor = (imageSrc, quality = 5) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Use smaller canvas for performance
        const width = 100;
        const height = 100;
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const colorMap = {};
        
        // Sample pixels based on quality
        for (let i = 0; i < data.length; i += 4 * quality) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent and very dark/light pixels
          if (a < 125 || (r < 30 && g < 30 && b < 30) || (r > 225 && g > 225 && b > 225)) {
            continue;
          }
          
          // Quantize colors to reduce variations
          const quantR = Math.round(r / 10) * 10;
          const quantG = Math.round(g / 10) * 10;
          const quantB = Math.round(b / 10) * 10;
          
          const key = `${quantR},${quantG},${quantB}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }
        
        // Find most common color
        let maxCount = 0;
        let dominantColor = null;
        
        for (const [color, count] of Object.entries(colorMap)) {
          if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
          }
        }
        
        if (!dominantColor) {
          dominantColor = '100,100,150'; // fallback color
        }
        
        const [r, g, b] = dominantColor.split(',').map(Number);
        
        // Create darker and richer versions
        const darkerR = Math.max(0, Math.round(r * 0.6));
        const darkerG = Math.max(0, Math.round(g * 0.6));
        const darkerB = Math.max(0, Math.round(b * 0.6));
        
        const rgb = `rgb(${r}, ${g}, ${b})`;
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        const gradient = `linear-gradient(145deg, rgb(${r}, ${g}, ${b}), rgb(${darkerR}, ${darkerG}, ${darkerB}), #000000)`;
        const borderColor = `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`;
        
        resolve({ rgb, hex, gradient, borderColor });
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageSrc;
  });
};

/**
 * Extract colors from multiple images
 * @param {Array<{image: string, ...rest}>} items - Array of items with image URLs
 * @returns {Promise<Array>} - Items with added color properties
 */
export const extractColorsFromItems = async (items) => {
  const promises = items.map(async (item) => {
    try {
      const colors = await extractDominantColor(item.image);
      return {
        ...item,
        gradient: colors.gradient,
        borderColor: colors.borderColor,
      };
    } catch (error) {
      console.warn(`Failed to extract color from ${item.image}:`, error);
      // Fallback gradient
      return {
        ...item,
        gradient: 'linear-gradient(145deg, #4F46E5, #2D1B69, #000000)',
        borderColor: '#4F46E5',
      };
    }
  });
  
  return Promise.all(promises);
};

/**
 * Cache for extracted colors to avoid reprocessing
 */
const colorCache = new Map();

/**
 * Extract dominant color with caching
 * @param {string} imageSrc - Image source URL
 * @param {number} quality - Sampling quality
 * @returns {Promise<{rgb: string, hex: string, gradient: string}>}
 */
export const extractDominantColorCached = async (imageSrc, quality = 5) => {
  if (colorCache.has(imageSrc)) {
    return colorCache.get(imageSrc);
  }
  
  const colors = await extractDominantColor(imageSrc, quality);
  colorCache.set(imageSrc, colors);
  return colors;
};
