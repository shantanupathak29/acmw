import { useState, useEffect } from 'react';

const ContactInfoCard = ({ icon: Icon, title, children, href }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative group overflow-hidden bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'} hover:scale-105 hover:-rotate-1`}
      style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-500 rounded-2xl"></div>
      
      {/* Floating orb with pulse animation */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 animate-pulse"></div>
      
      {/* Glowing border effect */}
      <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${isHovered ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/20' : 'border-blue-500/20'}`}></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-all duration-500 shadow-lg ${isHovered ? 'shadow-cyan-400/30 scale-110' : ''}`}>
          <Icon className={`h-6 w-6 text-white transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-cyan-300' : 'text-white'}`}>
            {title}
          </h3>
          {href ? (
            <a 
              href={href} 
              className={`text-gray-300 hover:text-cyan-400 transition-all duration-300 break-all ${isHovered ? 'text-white scale-105 inline-block' : ''}`}
            >
              {children}
            </a>
          ) : (
            <p className={`text-gray-300 transition-colors duration-300 ${isHovered ? 'text-white' : ''}`}>
              {children}
            </p>
          )}
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
