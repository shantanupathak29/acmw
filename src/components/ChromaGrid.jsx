import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import OptimizedImage from "./OptimizedImage";
import { extractDominantColorCached } from "../utils/colorExtractor";

const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const [itemsWithColors, setItemsWithColors] = useState([]);

  const demo = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      github: "alexrivera",
      linkedin: "alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      url: "https://github.com/",
    },
  ];

  const data = items?.length ? items : demo;

  // Extract colors from images on mount
  useEffect(() => {
    const extractColors = async () => {
      const itemsWithExtractedColors = await Promise.all(
        data.map(async (item) => {
          // If gradient already exists, keep it
          if (item.gradient && item.borderColor) {
            return item;
          }
          
          try {
            const colors = await extractDominantColorCached(item.image, 3);
            return {
              ...item,
              gradient: colors.gradient,
              borderColor: colors.borderColor,
            };
          } catch (error) {
            console.warn('Failed to extract color, using fallback');
            return {
              ...item,
              gradient: 'linear-gradient(145deg, #4F46E5, #2D1B69, #000000)',
              borderColor: '#4F46E5',
            };
          }
        })
      );
      
      setItemsWithColors(itemsWithExtractedColors);
    };

    extractColors();
  }, [data]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  // const handleCardClick = (url) => {
  //   if (url) window.open(url, "_blank", "noopener,noreferrer");
  // };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // Use itemsWithColors if available, otherwise use original data
  const displayData = itemsWithColors.length > 0 ? itemsWithColors : data;

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full min-h-[70vh] flex flex-wrap justify-center items-start gap-4 p-4 ${className}`}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
        contain: 'layout style paint',
      }}
    >
      {displayData.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          // onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-full max-w-[300px] min-w-[280px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer m-2 md:m-5"
          style={{
            "--card-border": c.borderColor || "transparent",
            background: c.gradient,
            "--spotlight-color": "rgba(255,255,255,0.3)",
            contain: 'layout style paint',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
            }}
          />
          <div className="relative z-10 flex-1 p-[10px] box-border">
            <div className="w-full h-[300px] overflow-hidden rounded-[10px] bg-gray-800">
              <OptimizedImage
                src={c.image}
                alt={c.title}
                width={280}
                height={300}
                className="w-full h-full object-cover"
                priority={i < 6} // First 6 images get priority loading
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
            <div className="flex items-center justify-end gap-2 text-[1.1rem] opacity-80">
              {c.github && (
                <a
                  href={`https://github.com/${c.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              )}
              {c.linkedin && (
                <a
                  href={`https://www.linkedin.com/in/${c.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
            <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
            {c.location && (
              <span className="text-[0.85rem] opacity-85 text-right">
                {c.location}
              </span>
            )}
          </footer>
        </article>
      ))}
      <div
        ref={fadeRef}
        className="hidden md:absolute inset-0 pointer-events-none duration-[0ms] z-40"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
