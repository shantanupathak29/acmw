const CallToAction = () => {
  return (
    <div className="button-container flex flex-col sm:flex-row gap-4 z-20 items-center justify-center w-full px-4" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <a
        href="https://upesacm.org/prodigy"
        target="_blank"
        rel="noopener noreferrer"
        className="nbutton group relative overflow-hidden px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 rounded-xl text-white font-semibold transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all duration-700 ease-out"></div>
        <span className="relative z-10 text-sm md:text-base">
          Prodigy 25 → 
        </span>
        <i className="ti-angle-right relative z-10 transform transition-transform duration-500 ease-out group-hover:translate-x-1"></i>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
      </a>

      <a
        href="https://www.upesacm.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="nbutton group relative overflow-hidden px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl text-white font-semibold transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all duration-700 ease-out"></div>
        <span className="relative z-10 text-sm md:text-base">
          Visit UPES ACM →
        </span>
        <i className="ti-angle-right relative z-10 transform transition-transform duration-500 ease-out group-hover:translate-x-1"></i>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
      </a>
    </div>
  );
};

export default CallToAction;
