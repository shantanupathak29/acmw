import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import acmLogo from "../assets/img/acm_w.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getCurrentPageName = () => {
    const path = location.pathname;
    const name = path === "/" ? "home" : path.slice(1);
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const currentPage = getCurrentPageName();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(".navbar-container")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="mx-5 sm:w-3/4 sm:mx-auto navbar-container fixed inset-x-0 top-2 z-50 px-4 py-1 pt-safe-area-inset-top backdrop-blur-xl bg-[#d9c5f3]/10 border border-white/20 rounded-full shadow-xl shadow-black/20 font-black" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20 pt-2 sm:pt-0">
          <div className="flex-shrink-0 z-10 relative w-[100px] sm:w-[140px]">
            <Link to="/">
              <img
                src={acmLogo}
                alt="UPES ACM-W Logo"
                className="h-[50px] w-auto transition-all duration-300 hover:scale-110 object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center">
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl shadow-black/20">
                <div className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5">
                  <div className="flex items-center space-x-1">
                    {[
                      ["home", "/"],
                      ["about", "/about"],
                      ["team", "/team"],
                      ["gallery", "/gallery"],
                      ["contact", "/contact"],
                    ].map(([label, href], index) => (
                      <Link
                        key={href}
                        to={href}
                        className={`relative px-3 py-1.5 text-xl font-bold transition-all duration-500 rounded-full overflow-hidden group ${location.pathname === href
                            ? "text-black bg-white/10 shadow-lg"
                            : "text-black/90 hover:text-black"
                          }`}
                      >
                        <span className="flex items-center space-x-2 relative z-10">
                          {location.pathname === href && (
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
                          )}
                          <span>{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</span>
                        </span>
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-500 ${location.pathname === href
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                            }`}
                        />
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-xl shadow-black/20 px-3 py-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
                <span className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
                  {currentPage}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 z-10 relative w-[100px] sm:w-[140px] flex justify-end">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen
                      ? "rotate-45 translate-y-[1px]"
                      : "-translate-y-1"
                    }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-white transition-all duration-300 ${isMenuOpen
                      ? "-rotate-45 -translate-y-[1px]"
                      : "translate-y-1"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 mt-2 transition-all duration-500 ease-out ${isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] border-none rounded-2xl shadow-xl shadow-black/40 overflow-hidden">
            {[
              ["home", "/"],
              ["about", "/about"],
              ["team", "/team"],
              ["gallery", "/gallery"],
              ["contact", "/contact"],
            ].map(([label, href], index) => (
              <Link
                key={href}
                to={href}
                onClick={closeMenu}
                className={`block px-5 py-3 text-base font-bold transition-all duration-500 relative overflow-hidden group ${location.pathname === href
                    ? "text-white bg-white/5 border-l-4 border-violet-400"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                  } ${index !== 4 ? "border-b border-white/5" : ""}`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <span className="flex items-center space-x-3 relative z-10">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${location.pathname === href ? "bg-violet-400 shadow-lg shadow-violet-400/50" : "bg-white/20"
                      }`}
                  />
                  <span>{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Link>
            ))}
          </div>

        </div>
      </div>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 -z-10"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
