import { useState, useEffect, useRef, useMemo } from 'react';
import { createOptimizedObserver, getDevicePerformance } from '../../utils/scrollOptimization';

// Consolidated core pillars data
const corePillars = [
  {
    type: 'mission',
    icon: '🎯',
    title: 'Our Mission',
    headline: 'Empowering Women in Technology',
    description: 'Empowering women to excel in technology by building an inclusive space driven by mentorship, innovation, and leadership.',
    metrics: [
      { value: '500+', label: 'Women Mentored' },
      { value: '80%', label: 'Success Rate' }
    ],
    colorScheme: 'violet'
  },
  {
    type: 'vision',
    icon: '🚀',
    title: 'Our Vision',
    headline: 'Shaping Tomorrow\'s Tech Leaders',
    description: 'Building a future where women confidently lead technology, spark innovation, and create an inclusive digital world.',
    metrics: [
      { value: '50+', label: 'Tech Events' },
      { value: '15+', label: 'Partnerships' }
    ],
    colorScheme: 'cyan'
  },
  {
    type: 'values',
    icon: '💎',
    title: 'Our Values',
    headline: 'Excellence Through Collaboration',
    description: 'Together, we grow. By sharing knowledge, supporting one another, and working as a community, we achieve excellence that goes beyond technology and touches lives.',
    metrics: [
      { value: '100+', label: 'Projects' },
      { value: '25+', label: 'Awards' }
    ],
    colorScheme: 'violet'
  }
];

// Core principles (condensed from original values)
const keyPrinciples = [
  {
    icon: '🤝',
    title: 'Inclusive Innovation',
    description: 'Embracing diverse perspectives to drive technological advancement'
  },
  {
    icon: '🏆',
    title: 'Excellence & Impact',
    description: 'Maintaining high standards while creating meaningful change'
  },
  {
    icon: '🌱',
    title: 'Continuous Growth',
    description: 'Fostering lifelong learning and professional development'
  },
  {
    icon: '🌐',
    title: 'Global Mindset',
    description: 'Thinking beyond boundaries to create worldwide positive impact'
  }
];

// Floating background icons
const FloatingIcon = ({ icon, delay, position, color, isVisible }) => {
  const { isMobile, isLowEnd } = getDevicePerformance();
  
  if (isLowEnd) return null;

  const colors = {
    violet: 'text-violet-400/20',
    cyan: 'text-cyan-400/20',
    purple: 'text-purple-400/20'
  };

  return (
    <div 
      className={`absolute text-xl md:text-2xl transition-all duration-500 will-change-transform ${colors[color]} ${
        isVisible ? 'animate-float-gentle' : ''
      }`}
      style={{ 
        ...position,
        animationDelay: `${delay}ms`,
        animationDuration: isMobile ? '4s' : '6s',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {icon}
    </div>
  );
};

// Animated background
const MVVBackground = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const { isLowEnd } = getDevicePerformance();

  useEffect(() => {
    if (isLowEnd) return;
    
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

  const backgroundElements = useMemo(() => [
    '✨', '🌟', '💡', '⚡', '🎯', '🚀', '💎', '🌈'
  ], []);

  if (isLowEnd) return null;

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {backgroundElements.map((element, index) => (
        <FloatingIcon
          key={index}
          icon={element}
          delay={index * 200}
          position={{
            top: `${10 + (index * 11)}%`,
            left: `${5 + (index * 13) % 85}%`
          }}
          color={['violet', 'cyan', 'purple'][index % 3]}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
};

// Main pillar card component
const PillarCard = ({ pillar, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const colorMap = {
    violet: {
      bg: 'from-violet-900/20 to-indigo-900/20',
      border: 'border-violet-500/30',
      hover: 'from-violet-600/20 to-indigo-600/20',
      gradient: 'from-violet-500 to-indigo-500',
      text: 'text-violet-300',
      glow: 'shadow-violet-500/25'
    },
    cyan: {
      bg: 'from-cyan-900/20 to-blue-900/20',
      border: 'border-cyan-500/30',
      hover: 'from-cyan-600/20 to-blue-600/20',
      gradient: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-300',
      glow: 'shadow-cyan-500/25'
    }
  };

  const colors = colorMap[pillar.colorScheme];

  return (
    <div 
      ref={observerRef}
      className={`group relative overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-3xl p-8 md:p-10 transform transition-all duration-700 will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } hover:scale-105 hover:-translate-y-3 hover:${colors.glow}`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:${colors.hover} transition-all duration-500 rounded-3xl`}></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-violet-500/15 to-cyan-500/15 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 will-change-transform" style={{ transform: 'translate3d(0, 0, 0)' }}></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r ${colors.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg will-change-transform`} style={{ transform: 'translate3d(0, 0, 0)' }}>
          <span className="text-white text-4xl md:text-5xl">{pillar.icon}</span>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className={`text-xl md:text-2xl font-bold ${colors.text} mb-2`}>
            {pillar.title}
          </h3>
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {pillar.headline}
          </h4>
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed text-base md:text-lg">
            {pillar.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex justify-between pt-6 border-t border-white/10">
          {pillar.metrics.map((metric, metricIndex) => (
            <div key={metricIndex} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-gray-400 text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 will-change-transform rounded-3xl" style={{ transform: 'translate3d(0, 0, 0)' }}></div>
      </div>
    </div>
  );
};

// Key principles section
const PrinciplesSection = () => {
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
      { threshold: 0.3 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={observerRef}
      className={`mt-16 md:mt-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-gradient-to-br from-violet-600/10 to-cyan-600/10 backdrop-blur-md border border-violet-400/20 rounded-3xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Our Core Principles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyPrinciples.map((principle, index) => (
            <div 
              key={index}
              className={`group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {principle.icon}
              </div>
              <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                {principle.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            "Together, we're not just building careers in technology – we're shaping the future of innovation through diverse perspectives, inclusive leadership, and unwavering commitment to excellence."
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutMissionVisionValues = () => {
  return (
    <section id="AboutMissionVisionValues" className="mvv-section w-full relative text-white py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-[-1]" />

      {/* Animated background elements */}
      <MVVBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="who-we-are" className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6">
            WHO WE ARE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our foundation, aspirations, and guiding principles that drive meaningful change in technology
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-8">
          {corePillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Key Principles */}
        <PrinciplesSection />
      </div>
    </section>
  );
};

export default AboutMissionVisionValues;
