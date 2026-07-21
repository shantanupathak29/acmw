import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from "react-router-dom";
import groupImage from "../../assets/img/grp_photo.jpg";
import groupImageGhibli from "../../assets/img/grp_photo_ghibli.png";
import SectionHeader from "./SectionHeader";
import { createOptimizedObserver, getDevicePerformance } from '../../utils/scrollOptimization';

// Floating particles component - optimized with scroll pause
const FloatingParticle = ({ delay = 0, size = 'small', color = 'purple', position }) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);
  
  const { isMobile } = getDevicePerformance();
  
  const sizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-2 h-2',
    large: 'w-3 h-3'
  };

  const colorClasses = {
    purple: 'bg-purple-400/60',
    cyan: 'bg-cyan-400/60',
    pink: 'bg-pink-400/60',
    white: 'bg-white/60'
  };

  useEffect(() => {
    const observer = createOptimizedObserver((entry) => {
      setIsInView(entry.isIntersecting);
    });
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={elementRef}
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full absolute will-change-transform ${
        isInView && !isMobile ? 'animate-float-gentle' : ''
      }`}
      style={{ 
        ...position,
        animationDelay: `${delay}ms`,
        animationDuration: isMobile ? '3s' : '5s',
        transform: 'translate3d(0, 0, 0)'
      }}
    />
  );
};

// Simplified moving code lines - optimized for performance
const MovingCodeLines = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const { isMobile, isLowEnd } = getDevicePerformance();

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (observerRef.current && !isLowEnd) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLowEnd]);

  const codeLines = useMemo(() => {
    const allLines = [
      { text: "const empowerWomen = () => &#123; console.log('Building the future together'); &#125;", color: "text-cyan-400/50", duration: "20s" },
      { text: "function inspire() &#123; return 'Technology + Passion = Innovation'; &#125;", color: "text-purple-400/50", duration: "25s" },
      { text: "// Women in tech leading the digital revolution", color: "text-pink-400/50", duration: "30s" }
    ];
    
    return isMobile ? allLines.slice(0, 2) : allLines;
  }, [isMobile]);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-8">
      {codeLines.map((line, index) => (
        <div key={index} className="absolute w-full" style={{ top: `${25 + index * 25}%` }}>
          <div 
            className={`${line.color} font-mono text-sm whitespace-nowrap will-change-transform ${
              isVisible ? 'animate-slide-horizontal' : ''
            }`}
            style={{ 
              animationDuration: isMobile ? '15s' : line.duration,
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {line.text}
          </div>
        </div>
      ))}
    </div>
  );
};

// Animated text reveal component - optimized
const AnimatedText = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLowEnd } = getDevicePerformance();

  useEffect(() => {
    if (isLowEnd) {
      setIsVisible(true); // Skip animation on low-end devices
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay, isLowEnd]);

  if (isLowEnd) {
    return <div className="will-change-transform" style={{ transform: 'translate3d(0, 0, 0)' }}>{children}</div>;
  }

  return (
    <div 
      className={`transition-all duration-500 will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </div>
  );
};

// Code-themed background elements - optimized
const CodeElements = () => {
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
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const codeSnippets = useMemo(() => ['{', '}', '<>', '/>', '&&', '||'], []); // Reduced from 7 to 6

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {codeSnippets.map((snippet, index) => (
        <div
          key={index}
          className={`absolute text-purple-500/8 font-mono text-2xl md:text-3xl transition-opacity duration-500 will-change-opacity ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${15 + (index * 14)}%`,
            left: `${5 + (index * 16) % 80}%`,
            transform: 'translate3d(0, 0, 0)',
            transitionDelay: `${index * 100}ms`
          }}
        >
          {snippet}
        </div>
      ))}
    </div>
  );
};

const AboutSection = () => {
  // Memoize floating particles to prevent re-renders
  const floatingParticles = useMemo(() => [
    { delay: 0, size: "small", color: "purple", position: { top: '20%', left: '10%' } },
    { delay: 1000, size: "medium", color: "cyan", position: { top: '30%', right: '15%' } },
    { delay: 500, size: "small", color: "pink", position: { bottom: '25%', left: '20%' } },
    { delay: 1500, size: "medium", color: "white", position: { bottom: '15%', right: '25%' } }
  ], []);

  return (
    <div className="about-section w-full min-h-screen relative text-white py-16 md:py-20 overflow-hidden will-change-scroll">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1] translate-z-0" />

      {/* Optimized background elements */}
      <CodeElements />
      <MovingCodeLines />

      {/* Reduced floating particles */}
      {floatingParticles.map((particle, index) => (
        <FloatingParticle key={index} {...particle} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 transform-gpu">
        <SectionHeader title="ABOUT" />

        {/* About content */}
        <div className="about-section-container mx-auto w-full max-w-6xl">
          <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Photo container - left side */}
            <AnimatedText delay={200}>
              <div className="photo-container order-2 md:order-1 flex justify-center">
                <div 
                  className="group w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto rounded-3xl shadow-2xl transform-gpu transition-all duration-500 md:hover:scale-105 md:hover:shadow-purple-500/25 md:hover:rotate-1 border-2 border-purple-400/30 overflow-hidden relative will-change-transform contain-paint"
                >
                  <img 
                    src={groupImage} 
                    alt="ACM-W Group"
                    className="w-full h-auto object-cover transition-opacity duration-500 will-change-opacity transform-gpu md:group-hover:opacity-0"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <img 
                    src={groupImageGhibli}
                    alt="ACM-W Group Ghibli Style"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 will-change-opacity transform-gpu md:group-hover:opacity-100"
                    loading="eager"
                    decoding="async"
                  />
                  
                  {/* Animated border effect - only on md+ hover */}
                  <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            </AnimatedText>

            {/* Text container - right side */}
            <div className="text-container order-1 md:order-2">
              <div className="space-y-6">
                <AnimatedText delay={400}>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      WE ARE UPES ACM-W STUDENT CHAPTER
                    </h3>
                  </div>
                </AnimatedText>

                <AnimatedText delay={600}>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    UPES ACM-W is an associated student chapter established 5
                    years after UPES ACM, with the prime objective of empowering
                    women in technology while promoting practical technological
                    knowledge in young university students.
                  </p>
                </AnimatedText>

                <AnimatedText delay={800}>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    We work round-the-clock to hone the adroit programmer in our
                    girl members through many events, workshops, fests,
                    contests, and talks all year long. Our student body is
                    headed by confident and proficient members who work
                    seamlessly for this cause.
                  </p>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>

        {/* Link to About page */}
        <AnimatedText delay={1000}>
          <div className="flex justify-center mt-12">
            <Link
              to="/about"
              className="nbutton group relative overflow-hidden px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 rounded-xl text-white font-semibold transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-2 transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all duration-700 ease-out"></div>
              <span className="relative z-10 text-sm md:text-base">
                Know Our Journey →
              </span>
              <i className="ti-angle-right relative z-10 transform transition-transform duration-500 ease-out group-hover:translate-x-1"></i>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </Link>
          </div>
        </AnimatedText>
      </div>
    </div>
  );
};

export default AboutSection;
