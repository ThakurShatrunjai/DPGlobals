import { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/lib/assetUtils';

export default function WhatSetsUsApartSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());

  const imageCards = [
    {
      src: getAssetPath('/assets/1-1.png'),
      title: 'Logistics Excellence',
      description: 'Engineering precision that moves the world with effortless perfection.',
      alt: 'Logistics Excellence - Precision Engineering'
    },
    {
      src: getAssetPath('/assets/2-1.png'),
      title: 'Experienced Team',
      description: 'A distinguished team delivering insight, strategy, and flawless execution.',
      alt: 'Experienced Team - Strategic Insight'
    },
    {
      src: getAssetPath('/assets/3-1.png'),
      title: 'Global Network',
      description: 'An elite global network seamlessly connecting markets without borders.',
      alt: 'Global Network - Worldwide Connectivity'
    },
    {
      src: getAssetPath('/assets/4-1.png'),
      title: 'Customized Solutions',
      description: 'Bespoke logistics solutions crafted to match your ambition.',
      alt: 'Customized Solutions - Tailored Services'
    },
    {
      src: getAssetPath('/assets/5-1.png'),
      title: 'Trusted Logistics Partner',
      description: 'A partner defined by trust, security, and global reliability.',
      alt: 'Trusted Logistics Partner - Reliable Service'
    },
    {
      src: getAssetPath('/assets/6-1.png'),
      title: 'Competitive Pricing',
      description: 'Premium logistics intelligence designed to maximize value.',
      alt: 'Competitive Pricing - Value Optimization'
    },
    {
      src: getAssetPath('/assets/8-1.png'),
      title: '24/7 Support',
      description: 'White-glove support, available whenever excellence demands it.',
      alt: '24/7 Support - Round-the-Clock Service'
    },
    {
      src: getAssetPath('/assets/9-1.png'),
      title: 'Real-Time Tracking',
      description: 'Intelligent visibility delivering control in real time.',
      alt: 'Real-Time Tracking - Live Monitoring'
    }
  ];

  useEffect(() => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const handleImageError = (index: number) => {
    setImageLoadErrors((prev) => new Set(prev).add(index));
    console.error(`Failed to load image at index ${index}: ${imageCards[index].src}`);
  };

  const handleImageLoad = (index: number) => {
    // Remove from error set if it was there
    setImageLoadErrors((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-accent/5 via-background to-accent/5 relative overflow-hidden scroll-mt-24 scroll-snap-section"
    >
      {/* Modern parallax background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 parallax-element"
        style={{
          transform: `translate3d(0, ${scrollY * 30}px, 0)`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <span className="text-sm font-semibold text-primary">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {imageCards.map((card, index) => (
              <div
                key={index}
                data-index={index}
                className={`group relative overflow-hidden rounded-2xl shadow-depth transition-all duration-700 ease-out gpu-accelerated ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Image container with hover zoom effect */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    onError={() => handleImageError(index)}
                    onLoad={() => handleImageLoad(index)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 gpu-accelerated"
                  />
                  
                  {/* Error state overlay */}
                  {imageLoadErrors.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center p-4">
                        <div className="text-muted-foreground text-sm">Image unavailable</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient overlay for better caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  {/* Caption overlay at the top */}
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <h3 className="text-base md:text-lg font-bold text-white drop-shadow-lg mb-1.5 transform transition-all duration-500 group-hover:translate-y-1 gpu-accelerated">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md leading-relaxed transform transition-all duration-500 group-hover:translate-y-1 gpu-accelerated">
                      {card.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Border glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
