import { useState, useEffect, useRef } from 'react';
import { createOptimizedObserver } from '../../utils/scrollOptimization';

// Import Lady Ada images - using proper Vite import syntax
const getImageUrl = (name) => {
  return new URL(`../../assets/img/gallery/${name}`, import.meta.url).href;
};

const lady_ada_1 = getImageUrl('lady_ada_2.JPG');
const lady_ada_2 = getImageUrl('lady_ada_6.JPG');

// Lady Ada content data in 2x2 grid format
const ladyAdaContent = [
  {
    type: 'image',
    position: 'top-left',
    // Placeholder for Lady Ada image - replace with actual image path
    imageSrc: lady_ada_1,
    alt: 'Women in Tech'
  },
  {
    type: 'content',
    position: 'top-right',
    title: 'Lady Ada Contest',
    description: 'An exclusive programming contest hosted by UPES ACM and ACM-W in collaboration with ACM-W India. The event challenged talented female coders through three rounds testing problem-solving, debugging, and real-time system thinking. From online eliminations to technical interviews and a mentorship session, finalists competed in an on-campus grand finale, creating a space where students could grow, lead, and let their code speak.'
  },
  {
    type: 'content',
    position: 'bottom-left',
    title: 'AICWiC Conference',
    description: 'AICWiC 2025, hosted by UPES ACM-W in collaboration with ACM-W India, brought together speakers from academia and industry. The event featured keynote sessions, panel discussions, and poster presentations, giving students a platform to showcase their work and interact with experts. An inspiring celebration that connected learners with leaders and highlighted the achievements of women in computing.'
  },
  {
    type: 'image',
    position: 'bottom-right',
    imageSrc: lady_ada_2,
    alt: 'Industry Experts at AICWiC Conference'
  }
];

// Content Card Component
const ContentCard = ({ content, index, isVisible }) => {
  return (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br from-violet-900/20 to-indigo-900/20 backdrop-blur-md border border-violet-500/30 rounded-2xl p-8 transform transition-all duration-700 will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      } hover:scale-105 hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-500/20`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-violet-600/10 group-hover:to-indigo-600/10 transition-all duration-500 rounded-2xl"></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 will-change-transform" style={{ transform: 'translate3d(0, 0, 0)' }}></div>

      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-violet-300 mb-4 group-hover:text-violet-200 transition-colors duration-300">
          {content.title}
        </h3>
        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed text-base md:text-lg">
          {content.description}
        </p>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 will-change-transform rounded-2xl" style={{ transform: 'translate3d(0, 0, 0)' }}></div>
      </div>
    </div>
  );
};

// Image Card Component
const ImageCard = ({ content, index, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.style.display = 'none';
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transform transition-all duration-700 will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      } hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Image container with gradient overlay - 3:2 aspect ratio */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/40 to-indigo-900/40" style={{ aspectRatio: '3/2' }}>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-violet-600/30 to-cyan-600/30 flex items-center justify-center">
            <span className="text-6xl" role="img" aria-label="Woman technologist">👩‍💻</span>
          </div>
        ) : (
          <img
            src={content.imageSrc}
            alt={content.alt}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Image caption on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-medium text-lg drop-shadow-lg">
            {content.alt}
          </p>
        </div>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-violet-500/0 group-hover:border-violet-400/50 transition-all duration-500"></div>
    </div>
  );
};

// Main Lady Ada Section Component
const AboutLadyAda = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={observerRef}
      className="lady-ada-section w-full relative text-white py-16 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1]" />

      {/* Floating background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6">
            LADY ADA & AICWiC
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Honoring Ada Lovelace - The Visionary Who Started It All
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {ladyAdaContent.map((content, index) => (
            content.type === 'image' ? (
              <ImageCard
                key={index}
                content={content}
                index={index}
                isVisible={isVisible}
              />
            ) : (
              <ContentCard
                key={index}
                content={content}
                index={index}
                isVisible={isVisible}
              />
            )
          ))}
        </div>

        {/* Inspirational Quote */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-gradient-to-br from-violet-600/10 to-cyan-600/10 backdrop-blur-md border border-violet-400/20 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed italic mb-4">
              "The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves."
            </p>
            <p className="text-violet-300 font-semibold text-base md:text-lg">
              — Ada Lovelace
            </p>
          </div>
        </div>

        {/* Connection to ACM-W */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
        </div>
      </div>
    </section>
  );
};

export default AboutLadyAda;
