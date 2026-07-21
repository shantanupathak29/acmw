import React, { useState, useEffect } from 'react';
import { ExternalLink, Navigation } from 'lucide-react';

const ContactMap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const openInGoogleMaps = () => {
    window.open('https://www.google.com/maps/place/University+of+Petroleum+and+Energy+Studies/@30.415828,77.9621319,17z/data=!3m1!4b1!4m6!3m5!1s0x3908d4890d7c1735:0x22d3ae324c238e3c!8m2!3d30.415828!4d77.9647068!16zL20vMGNjM3Ry?entry=ttu', '_blank');
  };

  const getDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(`https://www.google.com/maps/dir/${latitude},${longitude}/30.415828,77.9647068`, '_blank');
      }, () => {
        // Fallback if geolocation is denied
        window.open('https://www.google.com/maps/dir//30.415828,77.9647068', '_blank');
      });
    } else {
      // Fallback for browsers without geolocation
      window.open('https://www.google.com/maps/dir//30.415828,77.9647068', '_blank');
    }
  };

  return (
    <div 
      className={`relative group overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'} hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Map overlay controls */}
      <div className={`absolute top-4 right-4 z-20 flex space-x-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <button
          onClick={openInGoogleMaps}
          className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-lg hover:bg-white hover:scale-105 transition-all duration-200 flex items-center space-x-1 text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Larger</span>
        </button>
        <button
          onClick={getDirections}
          className="bg-violet-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg hover:bg-violet-600 hover:scale-105 transition-all duration-200 flex items-center space-x-1 text-sm font-medium"
        >
          <Navigation className="w-4 h-4" />
          <span>Directions</span>
        </button>
      </div>
      
      {/* Location status badge */}
      <div className={`absolute top-4 left-4 z-20 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">UPES Campus</span>
        </div>
      </div>
      
      <div className="relative z-10 rounded-3xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.714976957089!2d77.96213191512393!3d30.415827581748665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d4890d7c1735%3A0x22d3ae324c238e3c!2sUniversity+of+Petroleum+and+Energy+Studies!5e0!3m2!1sen!2sin!4v1561397082415!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="UPES Dehradun Location"
          className="transition-all duration-300"
        />
      </div>
      
      {/* Simple corner accent */}
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-violet-400/30 rounded-br-lg opacity-40"></div>
    </div>
  );
};

export default ContactMap;
