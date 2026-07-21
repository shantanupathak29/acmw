import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import acmLogo from "../assets/img/acm_w.png";
import ScrollToTopButton from "./ScrollToTopButton";

// Configuration for navigation and social links
const LINKS = {
    navigation: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Team', path: '/team' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' }
    ],
    social: [
        { name: 'Instagram', icon: faInstagram, url: 'https://www.instagram.com/upesacmwomen/' },
        { name: 'LinkedIn', icon: faLinkedin, url: 'https://linkedin.com/company/upesacmw' },
        { name: 'GitHub', icon: faGithub, url: 'https://github.com/upesacm' }
    ]
};
// Optimized components

const NavLink = memo(({ to, children }) => (
    <Link
        to={to}
        className="relative text-gray-300 hover:text-white transition-colors duration-300 text-lg px-2 py-1 group"
    >
        <span className="relative z-10">{children}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
));

const SocialLink = memo(({ url, icon, name }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-purple-400 transform transition-all duration-300 hover:scale-110"
        aria-label={`Visit our ${name}`}
    >
        <FontAwesomeIcon icon={icon} className="text-2xl" />
    </a>
));

const FooterComponent = () => {

    return (
        <>
            <footer className="relative text-white pt-8 sm:pt-12 pb-6 z-10 bg-[#0a0015]" style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}>
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] z-0"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ 
                            backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(147,51,234,0.1) 50%, transparent 70%)',
                            transform: 'translateZ(0)'
                        }}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main footer content with responsive layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
                        {/* Logo Section - Center on mobile, left on desktop */}
                        <div className="flex justify-center md:justify-start">
                            <img
                                src={acmLogo}
                                alt="UPES ACM-W Logo"
                                className="h-18 w-auto transform transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                                width="128"
                                height="128"
                            />
                        </div>

                        {/* Navigation Links - Center aligned */}
                        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                            {LINKS.navigation.map((link, index) => (
                                <NavLink key={index} to={link.path}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Social Links - Center on mobile, right on desktop */}
                        <div className="flex justify-center md:justify-end gap-6">
                            {LINKS.social.map((social, index) => (
                                <SocialLink 
                                    key={index}
                                    url={social.url}
                                    icon={social.icon}
                                    name={social.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="mt-12 pt-8 border-t border-purple-500/30">
                        <p className="text-gray-400 text-sm text-center">
                            © {new Date().getFullYear()} UPES ACM-W. All rights reserved.
                            <br className="sm:hidden" />
                            <span className="hidden sm:inline"> | </span>
                            Designed with 💜 by ACM-W Web Development Team
                        </p>
                    </div>
                </div>
            </footer>

            <ScrollToTopButton />
        </>
    );
};

// Export memoized component for better performance
const Footer = memo(FooterComponent);
export default Footer;
