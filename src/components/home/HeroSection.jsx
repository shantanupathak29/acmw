import { lazy, Suspense } from 'react';
// Preload Galaxy component with highest priority
const Galaxy = lazy(() => import("../Galaxy"), { priority: 'high' });
// Defer loading of animation components
const SplitText = lazy(() => 
  new Promise(resolve => 
    requestIdleCallback(() => 
      import("../SplitText").then(resolve)
    )
  )
);
const BlurText = lazy(() => 
  new Promise(resolve => 
    requestIdleCallback(() => 
      import("../BlurText").then(resolve)
    )
  )
);
import CallToAction from './CallToAction';

const HeroSection = () => {
  return (
    <div className="main-div w-full h-screen relative bg-black flex items-center justify-center text-white overflow-hidden">
      {/* Galaxy background layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000]" />
        }>
          {/* Galaxy component with optimized performance settings */}
          <Galaxy
            focal={[0.5, 0.5]}
            rotation={[1.0, 0.0]}
            starSpeed={0.8}
            density={0.5}
            hueShift={285}               
            saturation={1.0}             
            glowIntensity={0.5}        
            twinkleIntensity={0.3}
            speed={2.0}
            rotationSpeed={0.05}
            mouseRepulsion
            repulsionStrength={1.5}
            autoCenterRepulsion={0.0}
            transparent
            disableAnimation={window.matchMedia('(prefers-reduced-motion: reduce)').matches}
            mouseInteraction={!window.matchMedia('(prefers-reduced-motion: reduce)').matches}
          />
        </Suspense>
      </div>

      {/* Foreground content */}
      <div className="home-intro relative z-10 flex flex-col justify-center items-center w-full max-w-6xl mx-auto px-4">
        <div className="welcome-text text-center">
          <Suspense fallback={
            <div className="text-3xl sm:text-4xl md:text-6xl font-semibold text-center whitespace-nowrap">Welcome to</div>
          }>
            <div className="animate-fadeIn">
              <SplitText
                text="Welcome to"
                className="text-3xl sm:text-4xl md:text-6xl font-semibold text-center whitespace-nowrap tracking-wide sm:tracking-normal"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
                rootMargin="-20px"
                textAlign="center"
              />
            </div>
          </Suspense>
        </div>

        <div className="upes-acm-text flex justify-center items-center gap-3 cursor-pointer text-center w-full">
          <Suspense fallback={
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mt-4 md:mt-8 font-bold text-[#9a82f3] text-center whitespace-nowrap">
              UPES ACM - W
            </div>
          }>
            <div className="animate-fadeIn animation-delay-300">
              <BlurText
                text="UPES ACM - W"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mt-4 md:mt-8 font-bold text-[#9a82f3] text-center whitespace-nowrap"
              />
            </div>
          </Suspense>
        </div>

        <CallToAction />
      </div>
    </div>
  );
};

export default HeroSection;
