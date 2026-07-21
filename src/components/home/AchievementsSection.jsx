import { useState, useEffect, useMemo, useRef } from 'react';
import SectionHeader from './SectionHeader';
import AchievementCard from './AchievementCard';
import StatsCard from './StatsCard';
import { createOptimizedObserver, getDevicePerformance } from '../../utils/scrollOptimization';

// Trophy and award icons floating animation - optimized with device awareness
const AwardIcons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const { isMobile, isLowEnd } = getDevicePerformance();

  useEffect(() => {
    if (isLowEnd) return; // Skip on low-end devices
    
    const observer = createOptimizedObserver(
      (entry) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLowEnd]);

  const icons = useMemo(() => {
    const allIcons = ['🏆', '🥇', '🎯', '⭐', '🎖️', '👑'];
    return isMobile ? allIcons.slice(0, 4) : allIcons; // Reduce on mobile
  }, [isMobile]);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`absolute text-2xl transition-opacity duration-500 will-change-opacity ${
            isVisible ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            top: `${15 + (index * 12)}%`,
            left: `${10 + (index * 15) % 70}%`,
            transform: 'translate3d(0, 0, 0)',
            transitionDelay: `${index * 100}ms`
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

// Optimized sparkle effects
const SparkleEffect = ({ delay, position }) => {
  return (
    <div 
      className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-twinkle will-change-opacity"
      style={{ 
        ...position,
        animationDelay: `${delay}ms`,
        animationDuration: '4s',
        transform: 'translate3d(0, 0, 0)'
      }}
    />
  );
};

// Simplified floating elements - CSS only
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
      <div className="absolute top-1/6 left-1/6 animate-float-simple text-3xl">🏆</div>
      <div className="absolute top-2/6 right-1/6 animate-float-simple text-2xl" style={{ animationDelay: '1s' }}>🥇</div>
      <div className="absolute bottom-1/6 left-1/4 animate-float-simple text-2xl" style={{ animationDelay: '2s' }}>⭐</div>
    </div>
  );
};

// Simplified moving metrics - reduced complexity
const MovingMetrics = () => {
  const metrics = useMemo(() => [
    { text: "◆ Awards Won: 4+ ◆ Years of Excellence: 10+ ◆", color: "text-yellow-400/60", duration: "25s" },
    { text: "◇ Success Rate: 100% ◇ Growth: Exponential ◇", color: "text-green-400/60", duration: "30s" }
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {metrics.map((metric, index) => (
        <div key={index} className="absolute w-full" style={{ top: `${25 + index * 50}%` }}>
          <div 
            className={`${metric.color} font-bold text-sm whitespace-nowrap animate-scroll-horizontal will-change-transform`}
            style={{ 
              animationDuration: metric.duration,
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {metric.text}
          </div>
        </div>
      ))}
    </div>
  );
};

// Simplified metrics animation
const MetricsAnimation = () => {
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
      { threshold: 0.3, rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const progressBars = useMemo(() => [
    { width: 'w-16', color: 'from-yellow-400 to-orange-500', delay: '0ms', position: { top: '20%', left: '10%' } },
    { width: 'w-12', color: 'from-green-400 to-blue-500', delay: '200ms', position: { top: '40%', right: '20%' } },
    { width: 'w-20', color: 'from-purple-400 to-pink-500', delay: '400ms', position: { bottom: '30%', left: '25%' } }
  ], []);

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {progressBars.map((bar, index) => (
        <div 
          key={index}
          className={`absolute ${bar.width} h-1 bg-gradient-to-r ${bar.color} transition-all duration-700 will-change-transform ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
          style={{ 
            ...bar.position,
            transitionDelay: bar.delay,
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      ))}
    </div>
  );
};

const achievements = [
  {
    title: 'Outstanding Chapter Award - 2023',
    description: 'Awarded by ACM India',
    icon: '🏆',
    colorScheme: 'cyan'
  },
  {
    title: 'Best Student Chapter Award for Outstanding Community Service - 2021',
    description: 'Awarded by ACM India',
    icon: '🌟',
    colorScheme: 'violet'
  },
  {
    title: 'Student Chapter Excellence Award Winners for Outstanding Chapter Activities - 2020',
    description: 'Awarded by ACM International',
    icon: '🎯',
    colorScheme: 'violet'
  },
  {
    title: 'Best Student Chapter Award (Runner Up) - 2016',
    description: 'Awarded by ACM India',
    icon: '🥈',
    colorScheme: 'slate'
  }
];

const stats = [
  {
    title: 'YEAR OF ESTB.',
    value: '2014',
    icon: '📅',
    colorScheme: 'cyan'
  },
  {
    title: 'AWARDS WON',
    value: 3,
    icon: '🏅',
    colorScheme: 'violet',
    hasCounter: true
  },
  {
    title: 'HAPPY MEMBERS',
    value: 600,
    icon: '👥',
    colorScheme: 'violet',
    hasCounter: true,
    suffix: '+'
  },
  {
    title: 'PROJECTS COMPLETED',
    value: 150,
    icon: '💻',
    colorScheme: 'cyan',
    hasCounter: true,
    suffix: '+'
  }
];

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reduced sparkle effects
  const sparklePositions = useMemo(() => [
    { delay: 0, position: { top: '15%', left: '20%' } },
    { delay: 800, position: { top: '30%', right: '25%' } },
    { delay: 400, position: { bottom: '25%', left: '30%' } }
  ], []);

  return (
    <div 
      ref={sectionRef}
      className="achievements-section w-full min-h-screen relative text-white py-16 md:py-20 overflow-hidden will-change-scroll"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1]" />

      {/* Optimized background elements */}
      <AwardIcons />
      <MetricsAnimation />
      <FloatingElements />
      <MovingMetrics />

      {/* Reduced sparkle effects */}
      {sparklePositions.map((sparkle, index) => (
        <SparkleEffect key={index} {...sparkle} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader title="ACHIEVEMENTS" />

        {/* Awards Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-16 achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 ease-out will-change-transform ${
                cardsVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <AchievementCard {...achievement} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-600 ease-out will-change-transform ${
                cardsVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{ 
                transitionDelay: `${400 + (index * 80)}ms`,
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
