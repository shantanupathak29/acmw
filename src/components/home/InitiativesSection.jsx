import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import SectionHeader from './SectionHeader';
import InitiativeCard from './InitiativeCard';
import { createOptimizedObserver, getOptimizedAnimationDuration, getDevicePerformance } from '../../utils/scrollOptimization';

// Global scroll state to pause animations during scroll
let isScrolling = false;
let scrollTimeout = null;

// Optimized scroll handler with RAF throttling
const handleScroll = () => {
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add('scrolling');
  }
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('scrolling');
  }, 150);
};

// Animated coding symbols for initiatives - optimized version
const CodingSymbols = () => {
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

  const symbols = useMemo(() => {
    const allSymbols = ['{ }', '< />', '++', '--', '===', '!==', '&&', '||', '=>'];
    return isMobile ? allSymbols.slice(0, 6) : allSymbols; // Reduce on mobile
  }, [isMobile]);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className={`absolute text-cyan-400/30 font-mono text-lg md:text-xl transition-opacity duration-700 will-change-opacity ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${10 + (index * 9)}%`,
            left: `${8 + (index * 11) % 75}%`,
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            transitionDelay: `${index * 100}ms`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

// Floating geometric shapes - optimized with pure CSS animations and device awareness
const GeometricShape = ({ type, delay, position, color, isVisible }) => {
  const { isMobile, isLowEnd } = getDevicePerformance();
  
  if (isLowEnd) return null;

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    diamond: 'rounded-md rotate-45'
  };

  const colors = {
    cyan: 'bg-cyan-500/20',
    violet: 'bg-violet-500/20',
    pink: 'bg-pink-500/20'
  };

  return (
    <div 
      className={`w-4 h-4 ${shapes[type]} ${colors[color]} absolute will-change-transform ${
        isVisible ? 'animate-float-shape' : ''
      }`}
      style={{ 
        ...position,
        animationDelay: `${delay}ms`,
        animationDuration: isMobile ? '4s' : '6s', // Faster on mobile
        transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
      }}
    />
  );
};

// Continuous scrolling code snippets - optimized with device detection
const ScrollingCode = () => {
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

  const codeLines = useMemo(() => {
    const allLines = [
      { text: "for(let day = 1; day &lt;= 100; day++) &#123; code(); learn(); grow(); &#125;", color: "text-green-400/60", animation: "animate-scroll-right", duration: "15s" },
      { text: "while(passion) &#123; innovate(); inspire(); impact++; &#125;", color: "text-blue-400/60", animation: "animate-scroll-left", duration: "18s" },
      { text: "const spyC = students =&gt; students.map(s =&gt; s.masterC());", color: "text-purple-400/60", animation: "animate-scroll-right", duration: "20s" },
      { text: "setInterval(() =&gt; &#123; codeAnytime(); &#125;, 0);", color: "text-cyan-400/60", animation: "animate-scroll-left", duration: "22s" },
      { text: "// Empowering tomorrow's tech leaders through code", color: "text-pink-400/60", animation: "animate-scroll-right", duration: "25s" }
    ];
    
    return isMobile ? allLines.slice(0, 3) : allLines; // Reduce on mobile
  }, [isMobile]);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
      {codeLines.map((line, index) => (
        <div key={index} className="absolute w-full" style={{ top: `${15 + index * 15}%` }}>
          <div 
            className={`${line.color} font-mono text-xs whitespace-nowrap will-change-transform ${
              isVisible ? line.animation : ''
            }`}
            style={{ 
              animationDuration: isMobile ? '10s' : line.duration, // Faster on mobile
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

// Binary rain effect - simplified and optimized with device awareness
const BinaryRain = () => {
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

  // Static drops to avoid re-renders during scroll
  const drops = useMemo(() => 
    Array.from({ length: isMobile ? 4 : 8 }, (_, i) => ({ // Further reduced on mobile
      id: i,
      x: 10 + (i * (isMobile ? 20 : 12)),
      delay: i * 800,
      binary: i % 2 === 0 ? '1' : '0'
    })), [isMobile]
  );

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {drops.map(drop => (
        <div
          key={drop.id}
          className={`absolute text-green-400/60 font-mono text-xs will-change-transform ${
            isVisible ? 'animate-binary-fall' : ''
          }`}
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}ms`,
            animationDuration: isMobile ? '3s' : '4s', // Faster on mobile
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {drop.binary}
        </div>
      ))}
    </div>
  );
};

const initiatives = [
  {
    title: '100 Days Of Code',
    description: 'We launched 100 Days of Code to promote competitive programming and instil coding as a daily habit. Every year, we witness active programmers join with the spirit to learn, code and practice consistently.',
    icon: '100',
    colorScheme: 'cyan'
  },
  {
    title: 'CODE ANYTIME',
    description: 'Code Anytime is our round-the-year initiative to encourage free-spirited coding among beginners and amplify their passion for programming. This program provides continuous learning opportunities and coding challenges throughout the year.',
    icon: '∞',
    colorScheme: 'violet'
  },
  {
    title: 'SPY-C',
    description: 'SPY-C is an initiative to build core programming foundations and help students overcome their fear of coding by perfecting their knowledge of the C language through guidance from experienced seniors.',
    icon: 'C',
    colorScheme: 'violet'
  },
  {
    title: 'Hour of AI',
    description: 'Our CSR team puts words to action, bringing smiles to underprivileged communities. The team delivers education in exciting ways, making activities interactive and engaging while promoting digital literacy and coding awareness.',
    icon: 'AI',
    colorScheme: 'cyan'
  }
];

const InitiativesSection = () => {
  const sectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const { isMobile } = getDevicePerformance();

  // Add scroll event listener for performance optimization
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Optimized intersection observer with better thresholds
  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          // Use RAF to batch DOM updates
          requestAnimationFrame(() => {
            setCardsVisible(true);
            setBackgroundVisible(true);
          });
          observer.disconnect(); // Disconnect after triggering
        }
      },
      { 
        threshold: isMobile ? 0.1 : 0.15, 
        rootMargin: isMobile ? '30px' : '50px' // Reduced margins for better performance
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  // Reduce geometric shapes further for better performance
  const geometricShapes = useMemo(() => {
    const allShapes = [
      { type: "circle", delay: 0, position: { top: '15%', left: '5%' }, color: "cyan" },
      { type: "square", delay: 800, position: { top: '25%', right: '10%' }, color: "violet" },
      { type: "diamond", delay: 400, position: { bottom: '20%', left: '15%' }, color: "pink" }
    ];
    
    return isMobile ? allShapes.slice(0, 2) : allShapes; // Further reduced
  }, [isMobile]);

  return (
    <div 
      ref={sectionRef}
      className="initiatives-section w-full min-h-screen relative text-white py-16 md:py-20 overflow-hidden will-change-scroll performance-optimized"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1]" />

      {/* Animated background elements - only render when visible */}
      <CodingSymbols />
      <BinaryRain />
      <ScrollingCode />

      {/* Floating geometric shapes */}
      {geometricShapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} isVisible={backgroundVisible} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader title="INITIATIVES" />

        {/* Initiatives Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 initiatives-grid">
          {initiatives.map((initiative, index) => (
            <div 
              key={index}
              className={`transition-all ease-out will-change-transform ${
                cardsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 120}ms`,
                transitionDuration: `${getOptimizedAnimationDuration(600)}ms`,
                transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
              }}
            >
              <InitiativeCard {...initiative} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitiativesSection;
