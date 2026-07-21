/**
 * Smart Scroll Utilities
  // Default fallback selectors for different page types
  const defaultSelectors = [
    '#main-content',
    '#content', 
    '#team-main-content',
    '#about-content',
    '#gallery-content',
    '#contact-form',
    '.main-content',
    '.content-section',
    '.about-content',
    '.team-sections-container',
    '.gallery-container',
    '.container.mx-auto',
    '[data-section]',
    'section:not(.hero):not([class*="hero"])',
    'main > section',
    'main > div',
    '.team-sections-container > div',
    '.executives-section-start',
    '.boe-section-start', 
    '.office-bearers-section-start',
    '.about-page .max-w-6xl',
    '[id*="content"]',
    '[class*="content"]',
    '[class*="section"]:not([class*="hero"])',
    'div[class*="py-16"]',
    'div[class*="py-20"]',
    'div[class*="py-24"]'
  ];igent scrolling functionality that can detect and skip empty or placeholder sections
 */

/**
 * Determines if a section has meaningful content
 * @param {Element} element - The DOM element to check
 * @returns {boolean} - True if the section has meaningful content
 */
export const hasMeaningfulContent = (element) => {
  if (!element) return false;
  
  // Check if element is visible
  const rect = element.getBoundingClientRect();
  if (rect.height < 50) return false; // Too small to be meaningful
  
  // Check computed styles to ensure element is visible
  const styles = window.getComputedStyle(element);
  if (styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0') {
    return false;
  }
  
  // Check for images, text content, or interactive elements
  const hasImages = element.querySelectorAll('img').length > 0;
  const hasText = element.textContent.trim().length > 50;
  const hasInteractiveElements = element.querySelectorAll('button, a, input, textarea, form').length > 0;
  const hasCards = element.querySelectorAll('[class*="card"], [class*="item"], [class*="member"], [class*="section"]').length > 0;
  const hasContent = element.querySelectorAll('div, section, article, p, h1, h2, h3, h4, h5, h6').length > 1;
  
  // Additional check for loading states or placeholders
  const isLoadingState = element.textContent.toLowerCase().includes('loading') || 
                        element.querySelector('[class*="skeleton"], [class*="loading"], [class*="spinner"]');
  
  return (hasImages || hasText || hasInteractiveElements || hasCards || hasContent) && !isLoadingState;
};

/**
 * Finds the first meaningful content section on a page
 * @param {string[]} possibleTargets - Array of possible target selectors in order of preference
 * @returns {Element|null} - The first meaningful content element found
 */
export const findFirstMeaningfulSection = (possibleTargets = []) => {
  // Default fallback selectors for different page types
  const defaultSelectors = [
    '#main-content',
    '#content', 
    '#team-main-content',
    '#about-content',
    '#gallery-content',
    '.main-content',
    '.content-section',
    '[data-section]',
    'section:not(.hero):not([class*="hero"])',
    'main > section',
    'main > div',
    '.team-sections-container > div',
    '.executives-section-start',
    '.boe-section-start',
    '.office-bearers-section-start'
  ];
  
  const allSelectors = [...possibleTargets, ...defaultSelectors];
  
  for (const selector of allSelectors) {
    try {
      const elements = document.querySelectorAll(selector);
      
      for (const element of elements) {
        if (hasMeaningfulContent(element)) {
          return element;
        }
      }
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
    }
  }
  
  return null;
};

/**
 * Smart scroll function that finds and scrolls to the first meaningful content
 * @param {string|Element} target - Target selector or element
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Additional offset from top (default: 80)
 * @param {string} options.behavior - Scroll behavior (default: 'smooth')
 * @param {string[]} options.fallbackSelectors - Additional selectors to try
 * @param {boolean} options.debug - Enable debug logging (default: false)
 */
export const smartScrollTo = (target, options = {}) => {
  const {
    offset = 80,
    behavior = 'smooth',
    fallbackSelectors = [],
    debug = false
  } = options;
  
  if (debug) console.log('smartScrollTo called with target:', target, 'options:', options);
  
  let targetElement = null;
  
  // If target is already an element
  if (target instanceof Element) {
    targetElement = target;
    if (debug) console.log('Target is already an element:', targetElement);
  } else if (typeof target === 'string') {
    // Try to find by ID first
    targetElement = document.getElementById(target);
    if (debug) console.log('Searching by ID:', target, 'found:', targetElement);
    
    // If not found by ID, try querySelector
    if (!targetElement) {
      targetElement = document.querySelector(target);
      if (debug) console.log('Searching by querySelector:', target, 'found:', targetElement);
    }
  }
  
  // If still no target found, use smart detection
  if (!targetElement) {
    if (debug) console.log('No direct target found, using smart detection...');
    targetElement = findFirstMeaningfulSection(fallbackSelectors);
    if (debug) console.log('Smart detection result:', targetElement);
  }
  
  // Perform scroll if target found
  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset - offset;
    
    if (debug) {
      console.log('Scrolling to element:', targetElement);
      console.log('Element rect:', rect);
      console.log('Calculated offsetTop:', offsetTop);
      console.log('Current scroll position:', window.pageYOffset);
    }
    
    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior
    });
    
    return true;
  }
  
  console.warn('No suitable scroll target found for:', target);
  if (debug) {
    console.log('Available elements with common IDs:', {
      'team-main-content': document.getElementById('team-main-content'),
      'team-content': document.getElementById('team-content'),
      'main-content': document.getElementById('main-content'),
      'content': document.getElementById('content')
    });
  }
  return false;
};

/**
 * Page-specific scroll configurations
 * Each page has primary targets (preferred) and fallback targets
 */
export const pageScrollConfigs = {
  home: {
    targets: ['#main-content', '[data-section="AboutSection"]', '.about-section', '[data-section]'],
    offset: 80
  },
  about: {
    targets: ['#AboutMissionVisionValues', '#who-we-are', '#about-content', '.about-content', '.mission-section', '.mvv-section', '.about-page .max-w-6xl', 'section:not(.hero):not([class*="hero"])'],
    offset: 80
  },
  team: {
    targets: ['#team-main-content', '.boe-section-start', '.executives-section-start', '.team-sections-container > div', '.team-sections-container'],
    offset: 80 // Standardized offset
  },
  gallery: {
    targets: ['#gallery-content', '.gallery-container', '.gallery-masonry', '[id*="gallery"]', 'section:not(.hero):not([class*="hero"])'],
    offset: 80
  },
  contact: {
    targets: ['#contact-form', '#contact-content', '.contact-form', '.contact-section', '.container.mx-auto', 'section:not(.hero):not([class*="hero"])'],
    offset: 80
  }
};

/**
 * Get scroll configuration for a specific page type
 * @param {string} pageType - The type of page ('home', 'about', 'team', etc.)
 * @returns {Object} - Scroll configuration for the page
 */
export const getPageScrollConfig = (pageType) => {
  return pageScrollConfigs[pageType] || {
    targets: [],
    offset: 80
  };
};
