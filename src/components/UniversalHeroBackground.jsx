import React, { useState, useEffect, useRef } from 'react';

// Performance-optimized particle system with reduced calculations
const ParticleSystem = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    // Responsive particle count based on screen size
    const isMobile = window.innerWidth <= 768;
    const maxParticles = isMobile ? 15 : 25; // Reduced for mobile

    // Set canvas size with device pixel ratio optimization
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized particle class
    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 0.6;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `hsl(${270 + Math.random() * 50}, 65%, 70%)`;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Wrap around screen edges
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        // Fade out over time
        this.opacity = Math.max(0, (this.maxLife - this.life) / this.maxLife * 0.5);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }

      isDead() {
        return this.life >= this.maxLife;
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30;
    const frameDelay = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= frameDelay) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Update and draw particles, replace dead ones
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.update();
          particle.draw();
          
          if (particle.isDead()) {
            particles[i] = new Particle();
          }
        }

        lastTime = currentTime;
      }
      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ 
        mixBlendMode: 'screen',
        transform: 'translateZ(0)',
        contentVisibility: 'auto'
      }}
    />
  );
});

ParticleSystem.displayName = 'ParticleSystem';

// Enhanced floating orbs with better animation
const FloatingOrbs = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary orb - top left */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/15 via-violet-500/10 to-indigo-500/15 rounded-full blur-3xl animate-float-slow"
        style={{ 
          top: '10%', 
          left: '5%',
          animationDelay: '0s',
          animationDuration: '8s'
        }} 
      />
      
      {/* Secondary orb - bottom right */}
      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/12 via-blue-500/8 to-purple-500/12 rounded-full blur-3xl animate-float-slow"
        style={{ 
          bottom: '15%', 
          right: '8%',
          animationDelay: '2s',
          animationDuration: '10s'
        }} 
      />
      
      {/* Tertiary orb - center */}
      <div 
        className="absolute w-72 h-72 bg-gradient-to-r from-pink-500/10 via-purple-500/8 to-violet-500/10 rounded-full blur-3xl animate-float-slow"
        style={{ 
          top: '45%', 
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDelay: '4s',
          animationDuration: '12s'
        }} 
      />
      
      {/* Accent orb - top right */}
      <div 
        className="absolute w-64 h-64 bg-gradient-to-r from-indigo-500/8 via-purple-500/6 to-pink-500/8 rounded-full blur-2xl animate-float-slow"
        style={{ 
          top: '20%', 
          right: '15%',
          animationDelay: '6s',
          animationDuration: '9s'
        }} 
      />
    </div>
  );
});

FloatingOrbs.displayName = 'FloatingOrbs';

// Enhanced gradient mesh with subtle animation and reduced cursor brightness
const GradientMesh = React.memo(({ mousePosition }) => {
  return (
    <div className="absolute inset-0 opacity-90">
      {/* Base gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700 will-change-transform"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(154, 130, 243, 0.18) 0%, 
              rgba(147, 51, 234, 0.12) 25%, 
              rgba(13, 27, 42, 0.85) 50%, 
              rgba(26, 0, 51, 1) 100%
            ),
            linear-gradient(135deg, 
              #1a0033 0%, 
              #0d1b2a 35%,
              #1a1a2e 65%,
              #000000 100%
            )
          `,
          transform: 'translateZ(0)',
          contentVisibility: 'auto'
        }}
      />
      
      {/* Animated overlay mesh */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(120, 119, 198, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(120, 219, 255, 0.25) 0%, transparent 50%)
          `
        }}
      />
    </div>
  );
});

GradientMesh.displayName = 'GradientMesh';

// Performance-optimized animated grid
const AnimatedGrid = React.memo(() => {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-float 20s ease-in-out infinite'
        }}
      />
    </div>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

// New: Floating Geometric Shapes
const FloatingShapes = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {/* Triangle */}
      <div 
        className="absolute animate-drift-slow"
        style={{ 
          top: '15%', 
          left: '20%',
          animationDelay: '0s',
          animationDuration: '25s'
        }}
      >
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-purple-400/40" />
      </div>
      
      {/* Circle */}
      <div 
        className="absolute w-3 h-3 bg-cyan-400/40 rounded-full animate-drift-slow"
        style={{ 
          top: '60%', 
          right: '25%',
          animationDelay: '8s',
          animationDuration: '20s'
        }} 
      />
      
      {/* Square */}
      <div 
        className="absolute w-2 h-2 bg-pink-400/40 rotate-45 animate-drift-slow"
        style={{ 
          bottom: '30%', 
          left: '15%',
          animationDelay: '15s',
          animationDuration: '30s'
        }} 
      />
      
      {/* Diamond */}
      <div 
        className="absolute w-3 h-3 bg-violet-400/40 rotate-45 animate-drift-slow"
        style={{ 
          top: '40%', 
          right: '10%',
          animationDelay: '5s',
          animationDuration: '22s'
        }} 
      />
      
      {/* Plus sign */}
      <div 
        className="absolute animate-drift-slow"
        style={{ 
          bottom: '20%', 
          right: '40%',
          animationDelay: '12s',
          animationDuration: '28s'
        }}
      >
        <div className="relative w-1 h-4 bg-indigo-400/40 mx-auto"></div>
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-indigo-400/40"></div>
      </div>
    </div>
  );
});

FloatingShapes.displayName = 'FloatingShapes';

// New: Subtle Constellation Lines
const ConstellationLines = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg className="w-full h-full animate-constellation-drift" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.4)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.4)" />
          </linearGradient>
        </defs>
        
        {/* Subtle connecting lines */}
        <line x1="10" y1="20" x2="30" y2="15" stroke="url(#lineGrad)" strokeWidth="0.1" opacity="0.6" />
        <line x1="30" y1="15" x2="50" y2="25" stroke="url(#lineGrad)" strokeWidth="0.1" opacity="0.4" />
        <line x1="70" y1="40" x2="85" y2="30" stroke="url(#lineGrad)" strokeWidth="0.1" opacity="0.5" />
        <line x1="20" y1="70" x2="40" y2="80" stroke="url(#lineGrad)" strokeWidth="0.1" opacity="0.3" />
        <line x1="60" y1="75" x2="80" y2="85" stroke="url(#lineGrad)" strokeWidth="0.1" opacity="0.4" />
        
        {/* Connection nodes */}
        <circle cx="10" cy="20" r="0.3" fill="rgba(147, 51, 234, 0.6)" opacity="0.8" />
        <circle cx="30" cy="15" r="0.2" fill="rgba(139, 92, 246, 0.7)" opacity="0.6" />
        <circle cx="50" cy="25" r="0.25" fill="rgba(99, 102, 241, 0.5)" opacity="0.7" />
        <circle cx="70" cy="40" r="0.2" fill="rgba(147, 51, 234, 0.6)" opacity="0.5" />
        <circle cx="85" cy="30" r="0.3" fill="rgba(139, 92, 246, 0.6)" opacity="0.6" />
      </svg>
    </div>
  );
});

ConstellationLines.displayName = 'ConstellationLines';

// New: Themed Emojis Component (can be customized per page)
const ThemedEmojis = React.memo(({ pageType = 'default' }) => {
  const emojiSets = {
    default: ['✨', '💫', '🌟'],
    about: ['🚀', '💡', '⭐'],
    team: ['👥', '🤝', '🏆'],
    contact: ['📧', '💬', '🌐'],
    gallery: ['📸', '🎨', '🖼️']
  };

  const emojis = emojiSets[pageType] || emojiSets.default;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute text-2xl animate-emoji-float"
          style={{
            top: `${30 + index * 20}%`, // Start lower to avoid navbar collision
            left: `${15 + index * 25}%`, // Better spacing
            animationDelay: `${index * 8}s`,
            animationDuration: `${25 + index * 5}s`,
            filter: 'blur(0.5px)'
          }}
        >
          {emoji}
        </div>
      ))}
      
      {/* Additional scattered emojis - positioned to avoid navbar collision */}
      <div
        className="absolute text-xl animate-emoji-float opacity-60"
        style={{
          bottom: '20%', // Moved higher from bottom
          right: '25%', // Better positioning
          animationDelay: '15s',
          animationDuration: '35s'
        }}
      >
        {emojis[0]}
      </div>
      
      <div
        className="absolute text-lg animate-emoji-float opacity-50"
        style={{
          top: '60%', // Moved down from potential collision area
          left: '80%', // Better horizontal positioning
          animationDelay: '20s',
          animationDuration: '40s'
        }}
      >
        {emojis[1]}
      </div>
    </div>
  );
});

ThemedEmojis.displayName = 'ThemedEmojis';

// Main Universal Hero Background Component
const UniversalHeroBackground = React.memo(({ className = '', intensity = 'normal', pageType = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Adjust intensity-based opacity
  const intensityMap = {
    low: 0.6,
    normal: 0.8,
    high: 1.0
  };

  const currentIntensity = intensityMap[intensity] || intensityMap.normal;

  return (
    <div 
      className={`universal-hero-bg absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        opacity: isLoaded ? currentIntensity : 0,
        transition: 'opacity 1s ease-out',
        transform: 'translateZ(0)',
        contentVisibility: 'auto'
      }}
    >
      {/* Base gradient mesh with mouse tracking */}
      <GradientMesh mousePosition={mousePosition} />

      {/* Floating orbs */}
      <FloatingOrbs />

      {/* Animated grid overlay */}
      <AnimatedGrid />

      {/* Performance-optimized particle system */}
      <ParticleSystem />

      {/* New: Floating geometric shapes */}
      <FloatingShapes />

      {/* New: Constellation lines */}
      <ConstellationLines />

      {/* New: Themed emojis */}
      <ThemedEmojis pageType={pageType} />

      {/* Subtle animated border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent h-px top-0 animate-pulse" />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/15 to-transparent w-px left-0 animate-pulse" 
          style={{ animationDelay: '0.5s' }} 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent h-px bottom-0 animate-pulse" 
          style={{ animationDelay: '1s' }} 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent w-px right-0 animate-pulse" 
          style={{ animationDelay: '1.5s' }} 
        />
      </div>
    </div>
  );
});

UniversalHeroBackground.displayName = 'UniversalHeroBackground';

export default UniversalHeroBackground;
