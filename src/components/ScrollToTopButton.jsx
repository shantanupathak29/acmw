import { useEffect, useState, memo } from "react";

const ScrollToTopButton = memo(() => {
    const [isVisible, setIsVisible] = useState(true); // Temporarily always visible for testing

    useEffect(() => {
        let ticking = false;
        
        const toggleVisibility = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Multiple ways to get scroll position for better mobile compatibility
                    const scrollTop = Math.max(
                        window.pageYOffset || 0,
                        document.documentElement.scrollTop || 0,
                        document.body.scrollTop || 0
                    );
                    
                    // Show button after very minimal scroll - almost immediately
                    const shouldShow = scrollTop > 10;
                    setIsVisible(shouldShow);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Check immediately on mount
        toggleVisibility();

        // Add multiple event listeners for maximum mobile compatibility
        const events = ['scroll', 'touchmove', 'wheel'];
        const targets = [window, document, document.body, document.documentElement];
        
        targets.forEach(target => {
            events.forEach(event => {
                target.addEventListener(event, toggleVisibility, { passive: true });
            });
        });
        
        // Force check every second for debugging
        const interval = setInterval(toggleVisibility, 1000);
        
        return () => {
            targets.forEach(target => {
                events.forEach(event => {
                    target.removeEventListener(event, toggleVisibility);
                });
            });
            clearInterval(interval);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            onClick={scrollToTop}
            className={`
                fixed bottom-4 right-4 sm:bottom-6 sm:right-6 
                w-12 h-12 sm:w-14 sm:h-14 
                bg-gradient-to-r from-purple-500 to-pink-500 
                rounded-full shadow-lg cursor-pointer
                items-center justify-center 
                transition-all duration-300 ease-in-out
                hover:scale-110 active:scale-95 hover:shadow-xl
                hidden md:flex
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
            style={{
                position: 'fixed',
                zIndex: 999999,
                bottom: '1rem',
                right: '1rem',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                willChange: 'transform, opacity'
            }}
            aria-label="Scroll to top"
        >
            <span className="text-white text-xl sm:text-2xl font-bold pointer-events-none">
                ↑
            </span>
        </div>
    );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

export default ScrollToTopButton;
