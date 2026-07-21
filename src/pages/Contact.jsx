import React, { useEffect, useState, useRef, useMemo } from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfoCard from '../components/contact/ContactInfoCard';
import ContactLocationCard from '../components/contact/ContactLocationCard';
import ContactMap from '../components/contact/ContactMap';
import { Mail } from 'lucide-react';

// Subtle floating communication icons - optimized
const FloatingCommunicationIcons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const icons = useMemo(() => ['@', '✉', '📧', '💬', '📞', '🌐'], []);

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`absolute text-2xl font-mono transition-all duration-700 will-change-transform animate-float-gentle ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${15 + (index * 12)}%`,
            left: `${10 + (index * 14) % 75}%`,
            transform: 'translate3d(0, 0, 0)',
            transitionDelay: `${index * 150}ms`,
            animationDelay: `${index * 500}ms`
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

// Moving contact messages - similar to scrolling code
const MovingContactMessages = () => {
  const messages = useMemo(() => [
    { text: "✉ Let's collaborate • 💬 Share your ideas • 🚀 Build together", color: "text-violet-400/40", animation: "animate-scroll-right", duration: "20s" },
    { text: "📧 Connect with us • 🤝 Join our community • 💡 Innovate", color: "text-cyan-400/40", animation: "animate-scroll-left", duration: "25s" },
    { text: "🌐 Global network • 📞 Always reachable • ✨ Ready to help", color: "text-pink-400/40", animation: "animate-scroll-right", duration: "30s" }
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {messages.map((message, index) => (
        <div key={index} className="absolute w-full" style={{ top: `${20 + index * 25}%` }}>
          <div 
            className={`${message.color} font-medium text-sm whitespace-nowrap ${message.animation} will-change-transform`}
            style={{ 
              animationDuration: message.duration,
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

// Floating geometric shapes for contact theme
const ContactGeometricShapes = () => {
  const shapes = useMemo(() => [
    { type: "circle", delay: 0, position: { top: '20%', left: '8%' }, color: "violet" },
    { type: "square", delay: 1000, position: { top: '35%', right: '12%' }, color: "cyan" },
    { type: "diamond", delay: 500, position: { bottom: '25%', left: '15%' }, color: "pink" },
    { type: "circle", delay: 1500, position: { bottom: '40%', right: '18%' }, color: "violet" },
    { type: "square", delay: 2000, position: { top: '60%', left: '5%' }, color: "cyan" },
    { type: "diamond", delay: 750, position: { top: '75%', right: '8%' }, color: "pink" }
  ], []);

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    diamond: 'rounded-md rotate-45'
  };

  const colorClasses = {
    cyan: 'bg-cyan-500/30',
    violet: 'bg-violet-500/30',
    pink: 'bg-pink-500/30'
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <div 
          key={index}
          className={`w-4 h-4 ${shapeClasses[shape.type]} ${colorClasses[shape.color]} absolute animate-float-gentle will-change-transform`}
          style={{ 
            ...shape.position,
            animationDelay: `${shape.delay}ms`,
            animationDuration: '6s',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      ))}
    </div>
  );
};

// Subtle connecting lines animation
const ConnectingLines = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '100px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lines = useMemo(() => [
    { width: 'w-16', color: 'from-violet-400/30 to-cyan-400/30', delay: '0ms', position: { top: '25%', left: '20%' }, rotate: 'rotate-12' },
    { width: 'w-12', color: 'from-cyan-400/30 to-pink-400/30', delay: '300ms', position: { top: '55%', right: '25%' }, rotate: '-rotate-12' },
    { width: 'w-20', color: 'from-pink-400/30 to-violet-400/30', delay: '600ms', position: { bottom: '35%', left: '30%' }, rotate: 'rotate-45' }
  ], []);

  return (
    <div ref={observerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
      {lines.map((line, index) => (
        <div 
          key={index}
          className={`absolute ${line.width} h-0.5 bg-gradient-to-r ${line.color} ${line.rotate} transition-all duration-1000 will-change-transform ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
          style={{ 
            ...line.position,
            transitionDelay: line.delay,
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      ))}
    </div>
  );
};

// Subtle pulsing dots network
const PulsingDots = () => {
  const dots = useMemo(() => [
    { delay: 0, position: { top: '30%', left: '25%' } },
    { delay: 800, position: { top: '45%', right: '30%' } },
    { delay: 400, position: { bottom: '40%', left: '35%' } },
    { delay: 1200, position: { bottom: '55%', right: '25%' } },
    { delay: 600, position: { top: '70%', left: '20%' } },
    { delay: 1000, position: { top: '15%', right: '35%' } }
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {dots.map((dot, index) => (
        <div 
          key={index}
          className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full animate-pulse-gentle will-change-opacity"
          style={{ 
            ...dot.position,
            animationDelay: `${dot.delay}ms`,
            animationDuration: '3s',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] text-white relative overflow-hidden" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content Section */}
      <div id="contact-form" className="relative z-40 container mx-auto px-4 py-16 md:py-24 overflow-hidden">
        {/* Background animations */}
        <FloatingCommunicationIcons />
        <ContactGeometricShapes />
        <ConnectingLines />
        <PulsingDots />
        <MovingContactMessages />

        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We're here to help and answer any questions you might have. 
            We look forward to hearing from you!
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Contact Form Section */}
          <div className="relative z-40 order-2 lg:order-1">
            <ContactForm />
          </div>
          
          {/* Contact Info & Map Section */}
          <div className="space-y-8 relative z-40 order-1 lg:order-2">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <ContactInfoCard 
                icon={Mail} 
                title="Email Us" 
                href="mailto:upesacmpr@gmail.com"
              >
                upesacmpr@gmail.com
              </ContactInfoCard>
              
              <ContactLocationCard />
            </div>
            
            {/* Map Section */}
            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
