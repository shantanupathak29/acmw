import { useState, useEffect, useRef } from 'react';

const TestimonialCard = ({ 
  name, 
  role, 
  message, 
  image, 
  colorScheme = 'cyan' // cyan, violet, rose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const colorMap = {
    cyan: {
      bg: 'from-cyan-900/20 to-blue-900/20',
      border: 'border-cyan-500/30',
      hover: 'from-cyan-600/20 to-blue-600/20',
      gradient: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-300',
      ring: 'ring-cyan-500/50'
    },
    violet: {
      bg: 'from-violet-900/20 to-indigo-900/20',
      border: 'border-violet-500/30',
      hover: 'from-violet-600/20 to-indigo-600/20',
      gradient: 'from-violet-500 to-indigo-500',
      text: 'text-violet-300',
      ring: 'ring-violet-500/50'
    },
    rose: {
      bg: 'from-rose-900/20 to-pink-900/20',
      border: 'border-rose-500/30',
      hover: 'from-rose-600/20 to-pink-600/20',
      gradient: 'from-rose-500 to-pink-500',
      text: 'text-rose-300',
      ring: 'ring-rose-500/50'
    }
  };

  const colors = colorMap[colorScheme];

  return (
    <div 
      ref={cardRef}
      className={`testimonial-card group relative overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-3xl p-6 md:p-8 min-h-[500px] md:min-h-[540px] flex flex-col transform transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:${colors.hover} transition-all duration-500 rounded-3xl`}></div>
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ${colors.ring} group-hover:ring-8 transition-all duration-500 group-hover:scale-110 ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Quote Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${colors.gradient} rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
            <span className="text-white text-2xl font-bold">&ldquo;</span>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6 flex-1 flex items-center justify-center">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 italic">
            {message}
          </p>
        </div>

        {/* Name and Role */}
        <div className="text-center">
          <h3 className={`text-lg md:text-xl font-bold text-white group-hover:${colors.text} transition-colors duration-300 mb-1`}>
            {name}
          </h3>
          <p className={`text-sm md:text-base ${colors.text} font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
            {role}
          </p>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default TestimonialCard;
