const SectionHeader = ({ title }) => {
  return (
    <div className="text-center mb-12 md:mb-16" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionHeader;
