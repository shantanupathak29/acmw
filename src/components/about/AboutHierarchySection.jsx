import { useState, useEffect, useRef, useMemo } from "react";
import {
  createOptimizedObserver,
  getDevicePerformance,
} from "../../utils/scrollOptimization";

// Committee position data structure
const committeeStructure = [
  {
    category: "Technical",
    icon: "💻",
    colorScheme: "cyan",
    positions: [
      {
        description: "The heartbeat of our Chapter, the Technical Team brings ideas to life, designing websites, apps, and managing technical infrastructure of events. Beyond building, they spread the spirit of coding across the campus, inspiring students to learn, create, and grow together.",
      },
    ],
  },
  {
    category: "Events",
    icon: "🎪",
    colorScheme: "violet",
    positions: [
      {
        description: "The Events Team is the driving force behind our chapter’s activities. From planning and organizing to execution, they ensure every event runs seamlessly, creating engaging experiences that inspire participation, foster learning, and build lasting memories for the community and participants.",
      },
    ],
  },
  {
    category: "Public Relations & Sponsorship",
    icon: "🤝",
    colorScheme: "cyan",
    positions: [
      {
        description: "Acting as the chapter’s voice and bridge, this team builds strong relationships, secures valuable sponsorships, and expands our reach. Their efforts ensure every event and initiative shines with the visibility, support, and recognition it truly deserves.",
      },
    ],
  },
  {
    category: "Editorial",
    icon: "📝",
    colorScheme: "violet",
    positions: [
      {
        description: "From formal communications to blogs, social media, and event coverage, this team shapes how the chapter is seen and remembered. They give life to every word and idea, making sure UPES ACM’s journey is shared with clarity and creativity.",
      },
    ],
  },
  {
    category: "Design",
    icon: "🎨",
    colorScheme: "cyan",
    positions: [
      {
        description: "Creativity begins here. From posters and graphics to digital branding, the Design Team turns ideas into visuals that leave a lasting impression. Their work captures attention, sets the tone for every initiative, and makes our chapter’s identity truly unforgettable.",
      },
    ],
  },
  {
    category: "VFX",
    icon: "🎨",
    colorScheme: "cyan",
    positions: [
      {
        description: "Imagination in motion defines the VFX Team. Through videos, edits, and animations, they preserve moments and tell stories in ways that inspire. Their visuals bring events to life, making every initiative more engaging, memorable, and impactful for the community.",
      },
    ],
  },
  {
    category: "CSR",
    icon: "🎗️",
    colorScheme: "violet",
    positions: [
      {
        description: "At the heart of social responsibility, the CSR Team drives outreach initiatives, awareness campaigns, and community projects. Their work reflects our commitment to impact beyond academics, ensuring students contribute to society while learning the true value of empathy and service.",
      },
    ],
  },
  {
    category: "Operations",
    icon: "⚙️",
    colorScheme: "orange",
    positions: [
      {
        description: "Seamless execution starts here. From managing logistics to coordinating teams, Operations ensures everything runs smoothly. Working quietly behind the scenes, they provide the structure and support needed for every event and initiative to succeed without a hitch.",
      },
    ],
  },
];

// Floating organizational icons
const OrgIcon = ({ icon, delay, position, color, isVisible }) => {
  const { isMobile, isLowEnd } = getDevicePerformance();

  if (isLowEnd) return null;

  const colors = {
    gold: "text-yellow-400/30",
    blue: "text-blue-400/30",
    purple: "text-purple-400/30",
    green: "text-green-400/30",
    cyan: "text-cyan-400/30",
    pink: "text-pink-400/30",
    orange: "text-orange-400/30",
  };

  return (
    <div
      className={`absolute text-xl md:text-2xl transition-all duration-500 will-change-transform ${
        colors[color]
      } ${isVisible ? "animate-float-gentle" : ""}`}
      style={{
        ...position,
        animationDelay: `${delay}ms`,
        animationDuration: isMobile ? "5s" : "7s",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {icon}
    </div>
  );
};

// Animated background elements
const HierarchyBackground = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const { isLowEnd } = getDevicePerformance();

  useEffect(() => {
    if (isLowEnd) return;

    const observer = createOptimizedObserver(
      (entry) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLowEnd]);

  const orgElements = useMemo(
    () => ["⚡", "🔗", "📊", "🎯", "💼", "🏆", "🌐", "⭐"],
    []
  );

  if (isLowEnd) return null;

  return (
    <div
      ref={observerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {orgElements.map((element, index) => (
        <OrgIcon
          key={index}
          icon={element}
          delay={index * 300}
          position={{
            top: `${15 + index * 10}%`,
            left: `${8 + ((index * 12) % 80)}%`,
          }}
          color={
            ["gold", "blue", "purple", "green", "cyan", "pink", "orange"][
              index % 7
            ]
          }
          isVisible={isVisible}
        />
      ))}
    </div>
  );
};

// Committee section card
const CommitteeCard = ({ category, icon, colorScheme, positions, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const colorMap = {
    violet: {
      bg: "from-violet-900/20 to-indigo-900/20",
      border: "border-violet-500/30",
      hover: "from-violet-600/20 to-indigo-600/20",
      gradient: "from-violet-500 to-indigo-500",
      text: "text-violet-300",
      glow: "shadow-violet-500/25",
    },
    cyan: {
      bg: "from-cyan-900/20 to-blue-900/20",
      border: "border-cyan-500/30",
      hover: "from-cyan-600/20 to-blue-600/20",
      gradient: "from-cyan-500 to-blue-500",
      text: "text-cyan-300",
      glow: "shadow-cyan-500/25",
    },
  };

  const colors = colorMap[colorScheme] || colorMap.violet; // Fallback to violet if colorScheme is undefined

  return (
    <div
      ref={observerRef}
      className={`group relative overflow-hidden bg-gradient-to-br ${
        colors.bg
      } backdrop-blur-md border ${
        colors.border
      } rounded-3xl p-6 md:p-8 h-80 md:h-76 transform transition-all duration-700 will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      } hover:scale-105 hover:-translate-y-2 hover:${colors.glow}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {/* Animated background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:${colors.hover} transition-all duration-500 rounded-3xl`}
      ></div>
      <div
        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/15 to-cyan-500/15 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      ></div>

      <div className="relative z-10">
        {/* Category Header */}
        <div className="flex items-center mb-6">
          <div
            className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg will-change-transform`}
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <span className="text-white text-2xl md:text-3xl">{icon}</span>
          </div>
          <h3
            className={`text-xl md:text-2xl font-bold text-white group-hover:${colors.text} transition-colors duration-300`}
          >
            {category}
          </h3>
        </div>

        {/* Positions */}
        <div className="space-y-4">
          {positions.map((position, index) => (
            <div
              key={index}
              className="border-l-4 border-white/20 pl-4 group-hover:border-white/40 transition-colors duration-300"
            >
              <h4 className="text-lg font-semibold text-white mb-1">
                {position.title}
              </h4>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {position.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        ></div>
      </div>
    </div>
  );
};

// Organizational chart visualization
const OrganizationalChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);
};

const AboutHierarchySection = () => {
  return (
    <section className="hierarchy-section w-full relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a0033] to-[#0d1b2a] z-[-1]" />

      {/* Animated background elements */}
      <HierarchyBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-500 to-violet-400 bg-clip-text text-transparent mb-6">
            OUR COMMITTEEs
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our organizational structure designed for excellence, collaboration,
            and impactful leadership
          </p>
        </div>

        {/* Committee Structure Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {committeeStructure.map((committee, index) => (
            <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md">
              <CommitteeCard {...committee} delay={index * 150} />
            </div>
          ))}
        </div>

        {/* Organizational Chart */}
        <OrganizationalChart />
      </div>
    </section>
  );
};

export default AboutHierarchySection;
