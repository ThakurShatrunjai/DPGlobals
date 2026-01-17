import { useEffect, useRef, useState } from 'react';
import { HEADER_HEIGHT } from './Header';

// Smooth scroll utility
const smoothScrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - HEADER_HEIGHT;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Optimized scroll handler with requestAnimationFrame
    const handleScroll = () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const scrollProgress = Math.max(0, -rect.top / (rect.height * 0.5));
          setScrollY(scrollProgress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden mt-20 md:mt-24 scroll-snap-section"
    >
      {/* Parallax background image with GPU-accelerated transform */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-element"
        style={{
          backgroundImage: 'url(/assets/ho.jpg)',
          transform: `translate3d(0, ${scrollY * 50}px, 0)`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Navigating Tomorrow's Supply Chain,{' '}
            <span className="text-primary animate-gradient-text drop-shadow-lg">Today.</span>
          </h1>
          <p 
            className={`text-xl md:text-2xl font-semibold text-white leading-relaxed drop-shadow-lg transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Reliable. Innovative. Global.
          </p>
          <p 
            className={`text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Partner with D P GLOBAL for logistics solutions that drive your business forward.
          </p>
          <div 
            className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <button
              onClick={() => smoothScrollToElement('query')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 gpu-accelerated"
            >
              Get in Touch
            </button>
            <button
              onClick={() => smoothScrollToElement('about')}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 gpu-accelerated"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 gpu-accelerated">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}

