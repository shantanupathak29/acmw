import { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';
import { createOptimizedObserver, getDevicePerformance } from '../../utils/scrollOptimization';

// Import images
import sachiImage from '../../assets/img/acm_team/executives/sachi_choudhary.webp';
import devanshiImage from '../../assets/img/acm_team/executives/devanshi_raghav.jpg';
import kavyaImage from '../../assets/img/acm_team/boe/kavya_chugh.webp';
import stutiImage from '../../assets/img/acm_team/executives/stuti_jain.webp';

// Simple floating animation component
const FloatingElement = ({ delay = 0, size = 'small', color = 'purple' }) => {
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  const colorClasses = {
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    pink: 'bg-pink-500',
    violet: 'bg-violet-500'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-gentle-float opacity-60`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '4s'
      }}
    />
  );
};

// Moving inspirational words - optimized with device awareness
const MovingWords = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const { isMobile, isLowEnd } = getDevicePerformance();

  useEffect(() => {
    if (isLowEnd) return; // Skip on low-end devices
    
    const observer = createOptimizedObserver(
      (entry) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLowEnd]);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-8">
      <div className="absolute top-1/6 left-0 w-full">
        <div className={`text-purple-400/30 font-light text-lg whitespace-nowrap will-change-transform ${
          isVisible ? 'animate-words-right' : ''
        }`} style={{ 
          animationDuration: isMobile ? '15s' : '20s',
          transform: 'translate3d(0, 0, 0)'
        }}>
          ✦ Leadership ✦ Innovation ✦ Empowerment ✦ Excellence ✦
        </div>
      </div>
      <div className="absolute top-3/6 right-0 w-full">
        <div className={`text-cyan-400/30 font-light text-lg whitespace-nowrap text-right will-change-transform ${
          isVisible ? 'animate-words-left' : ''
        }`} style={{ 
          animationDuration: isMobile ? '18s' : '25s',
          transform: 'translate3d(0, 0, 0)'
        }}>
          ◇ Vision ◇ Passion ◇ Growth ◇ Impact ◇ Future ◇
        </div>
      </div>
      {!isMobile && ( // Skip third line on mobile for better performance
        <div className="absolute bottom-1/6 left-0 w-full">
          <div className={`text-pink-400/30 font-light text-lg whitespace-nowrap will-change-transform ${
            isVisible ? 'animate-words-right-slow' : ''
          }`} style={{ 
            animationDuration: '30s',
            transform: 'translate3d(0, 0, 0)'
          }}>
            ★ Teamwork ★ Dedication ★ Success ★ Achievement ★
          </div>
        </div>
      )}
    </div>
  );
};

// Orbiting quote symbols
const OrbitingQuotes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 animate-orbit-slow">
        <span className="text-6xl text-purple-500/20">&ldquo;</span>
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-orbit-reverse">
        <span className="text-5xl text-cyan-500/20">&rdquo;</span>
      </div>
      <div className="absolute top-3/4 left-1/6 animate-orbit-medium">
        <span className="text-4xl text-pink-500/20">&ldquo;</span>
      </div>
      <div className="absolute top-1/6 right-1/6 animate-orbit-fast">
        <span className="text-4xl text-violet-500/20">&rdquo;</span>
      </div>
    </div>
  );
};

// Animated quote marks component
const AnimatedQuotes = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top Left Quote */}
      <div 
        className={`absolute top-20 left-10 text-6xl text-purple-500/20 font-bold transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        &ldquo;
      </div>
      
      {/* Top Right Quote */}
      <div 
        className={`absolute top-32 right-16 text-5xl text-cyan-500/20 font-bold transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        &rdquo;
      </div>
      
      {/* Bottom Left Quote */}
      <div 
        className={`absolute bottom-32 left-20 text-4xl text-pink-500/20 font-bold transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        &ldquo;
      </div>
      
      {/* Bottom Right Quote */}
      <div 
        className={`absolute bottom-20 right-10 text-5xl text-violet-500/20 font-bold transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        &rdquo;
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: 'Mrs. Sachi Chaudhary',
    role: 'Faculty Sponsor, UPES ACM-W',
    message: 'It has been eight years since I became part of UPES ACM-W, and the journey has been nothing short of exciting and rewarding. Over the years, we have proudly earned several national and international awards, reflecting our commitment and hard work. Our flagship event, Prodigy, has thrived for five consecutive years, while impactful CSR initiatives and meaningful collaborations have continuously strengthened our community and helped it flourish.',
    image: sachiImage,
    colorScheme: 'violet'
  },
  {
    name: 'Stuti Jain',
    role: 'Chairperson, UPES ACM-W',
    message: 'When I was exposed to ACM and the ACM-W student organisation at UPES, my programming career had just started. I used to frequently get confused between the fundamentals of coding. Activities like 100 Days of Code, Code Anytime, and Spy C increased my confidence significantly. That\'s when I decided to continue my journey with ACM and the ACM-W student chapter.',
    image: stutiImage,
    colorScheme: 'cyan'
  },
  {
    name: 'Devanshi Raghav',
    role: 'BOE, UPES ACM-W',
    message: 'I have been associated with the chapter for over four years now, witnessing its incredible evolution firsthand. My journey from core committee member to Treasurer and Chairperson has been transformative. UPES ACM & ACM-W has shaped my technical skills and leadership capabilities. It\'s truly a family that empowers every member to reach their potential.',
    image: devanshiImage,
    colorScheme: 'rose'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % testimonials.length
        );
      }, 4000); // Change every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonials-section w-full min-h-screen relative text-white py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1]" />

      {/* Animated background quotes */}
      <AnimatedQuotes />
      
      {/* Moving inspirational words */}
      <MovingWords />
      
      {/* Orbiting quote symbols */}
      <OrbitingQuotes />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader title="VOICES OF LEADERSHIP" />

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Desktop Carousel (3 cards with side preview) */}
          <div className="hidden md:block relative overflow-visible max-w-6xl mx-auto">
            <div className="relative h-[620px] px-8">
              {testimonials.map((testimonial, index) => {
                const position = (index - currentIndex + testimonials.length) % testimonials.length;
                let transform = '';
                let opacity = 0.4;
                let scale = 0.85;
                let zIndex = 1;

                if (position === 0) {
                  // Center card
                  transform = 'translateX(0%)';
                  opacity = 1;
                  scale = 1;
                  zIndex = 3;
                } else if (position === 1 || position === testimonials.length - 1) {
                  // Side cards
                  const isRight = position === 1;
                  transform = `translateX(${isRight ? '75%' : '-75%'})`;
                  opacity = 0.6;
                  scale = 0.85;
                  zIndex = 2;
                } else {
                  // Hidden cards
                  transform = position < testimonials.length / 2 ? 'translateX(150%)' : 'translateX(-150%)';
                  opacity = 0;
                  scale = 0.7;
                  zIndex = 1;
                }

                return (
                  <div
                    key={index}
                    className="absolute top-0 left-1/2 w-96 transition-all duration-700 ease-in-out cursor-pointer"
                    style={{
                      transform: `translateX(-50%) ${transform} scale(${scale})`,
                      opacity,
                      zIndex
                    }}
                    onClick={() => position !== 0 && goToSlide(index)}
                  >
                    <TestimonialCard {...testimonial} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Carousel (1 card at a time) */}
          <div 
            className="md:hidden relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (Desktop only) */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4">
            <button
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 ease-out group shadow-lg"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 ease-out group shadow-lg"
            >
              <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10">
          <FloatingElement delay={0} size="small" color="purple" />
        </div>
        <div className="absolute top-32 right-20">
          <FloatingElement delay={1000} size="medium" color="cyan" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FloatingElement delay={500} size="small" color="pink" />
        </div>
        <div className="absolute bottom-32 right-1/3">
          <FloatingElement delay={1500} size="small" color="violet" />
        </div>
        <div className="absolute top-1/2 left-8">
          <FloatingElement delay={800} size="medium" color="purple" />
        </div>
        <div className="absolute top-3/4 right-12">
          <FloatingElement delay={1200} size="small" color="cyan" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
