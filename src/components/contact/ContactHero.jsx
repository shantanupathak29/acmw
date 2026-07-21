import React from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import UniversalHeroSection from '../UniversalHeroSection';

const ContactHero = () => {
  // Custom icons for Contact page
  const ContactIcons = () => (
    <div className="flex justify-center gap-6 mb-8">
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <Mail className="w-8 h-8 text-purple-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '0.5s',
          transform: 'translateZ(0)'
        }}
      >
        <Send className="w-8 h-8 text-cyan-400" />
      </div>
      <div 
        className="p-4 bg-white/8 backdrop-blur-sm rounded-full border border-white/15 animate-float will-change-transform" 
        style={{ 
          animationDelay: '1s',
          transform: 'translateZ(0)'
        }}
      >
        <MessageSquare className="w-8 h-8 text-pink-400" />
      </div>
    </div>
  );

  return (
    <section style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <UniversalHeroSection
        title="Contact Us"
        subtitle="Connect with ACM-W UPES for collaboration and opportunities"
        description="Every conversation matters! Whether you're looking to collaborate, explore opportunities, or simply want to connect with our community, we're here to listen and engage."
        customIcons={<ContactIcons />}
        backgroundIntensity="normal"
        animationDelay={300}
        pageType="contact"
        ctaText="Start the Conversation"
        scrollTarget="contact-form"
      />
    </section>
  );
};

export default ContactHero;