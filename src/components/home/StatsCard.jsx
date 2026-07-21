import CountUp from '../CountUp';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  colorScheme = 'cyan', // cyan, violet
  hasCounter = false,
  suffix = ''
}) => {
  const colorMap = {
    cyan: {
      bg: 'from-cyan-900/20 to-blue-900/20',
      border: 'border-cyan-500/30',
      hover: 'from-cyan-500/20',
      gradient: 'from-cyan-500 to-blue-500'
    },
    violet: {
      bg: 'from-violet-900/20 to-indigo-900/20',
      border: 'border-violet-500/30',
      hover: 'from-violet-500/20',
      gradient: 'from-violet-500 to-indigo-500'
    }
  };

  const colors = colorMap[colorScheme];

  return (
    <div className={`stat-card group relative overflow-hidden bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-2xl p-6 md:p-8 transform transition-all duration-700 hover:scale-110 hover:rotate-3`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.hover} group-hover:bg-gradient-to-br group-hover:${colors.hover} transition-all duration-500 rounded-2xl`}></div>
      <div className="absolute -top-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-125">
        <span className="text-4xl">{icon}</span>
      </div>

      <div className="relative z-10 text-center">
        <div className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
          {hasCounter ? (
            <>
              <CountUp
                from={0}
                to={value}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
              {suffix}
            </>
          ) : (
            value
          )}
        </div>
        <p className="text-gray-400 text-xs md:text-sm font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
          {title}
        </p>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-2xl group-hover:animate-pulse transition-all duration-500"></div>
    </div>
  );
};

export default StatsCard;
