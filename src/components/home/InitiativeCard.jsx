const InitiativeCard = ({ 
  title, 
  description, 
  icon, 
  colorScheme = 'cyan' // cyan, violet
}) => {
  const colorMap = {
    cyan: {
      bg: 'from-cyan-900/20 to-blue-900/20',
      border: 'border-cyan-500/30',
      hover: 'from-cyan-600/20 to-blue-600/20',
      gradient: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-300'
    },
    violet: {
      bg: 'from-violet-900/20 to-indigo-900/20',
      border: 'border-violet-500/30',
      hover: 'from-violet-600/20 to-indigo-600/20',
      gradient: 'from-violet-500 to-indigo-500',
      text: 'text-violet-300'
    }
  };

  const colors = colorMap[colorScheme];

  return (
    <div className={`initiative-card group relative overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-3xl p-5 md:p-6 h-auto flex flex-col transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 will-change-transform performance-optimized`} style={{ transform: 'translateZ(0)' }}>
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:${colors.hover} transition-all duration-200 rounded-3xl`}></div>
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-105 transition-transform duration-300 will-change-transform" style={{ transform: 'translateZ(0)' }}></div>

      <div className="relative z-10 flex flex-col">
        <div className="flex items-start mb-4">
          <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-3 group-hover:scale-102 transition-all duration-200 shadow-lg flex-shrink-0 will-change-transform`} style={{ transform: 'translateZ(0)' }}>
            <span className="text-white text-xl md:text-2xl font-bold">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg md:text-xl font-bold text-white group-hover:${colors.text} transition-colors duration-200 leading-tight mb-3`}>
              {title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-200 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 will-change-transform" style={{ transform: 'translateZ(0)' }}></div>
      </div>
    </div>
  );
};

export default InitiativeCard;
