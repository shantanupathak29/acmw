import { MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const ContactLocationCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative group overflow-hidden bg-gradient-to-br from-violet-900/40 to-cyan-900/40 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'} hover:scale-105 hover:-rotate-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/10 group-hover:to-cyan-600/10 transition-all duration-500 rounded-2xl"></div>
      
      {/* Floating orb with different position */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 animate-pulse"></div>
      
      {/* Glowing border effect */}
      <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${isHovered ? 'border-violet-400/50 shadow-lg shadow-violet-400/20' : 'border-violet-500/20'}`}></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-all duration-500 shadow-lg ${isHovered ? 'shadow-violet-400/30 scale-110' : ''}`}>
          <MapPin className={`h-6 w-6 text-white transition-all duration-300 ${isHovered ? 'scale-110 animate-bounce' : ''}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-violet-300' : 'text-white'}`}>
            Visit Us
          </h3>
          <p className={`text-gray-300 transition-colors duration-300 ${isHovered ? 'text-white' : ''}`}>
            UPES, Bidholi, Dehradun, India
          </p>
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ContactLocationCard;
