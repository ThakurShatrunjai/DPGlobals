import { useEffect, useRef, useState } from 'react';

export default function CoreActivitiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="core-activities" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-background to-accent/5 relative overflow-hidden scroll-snap-section"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            D P GLOBAL - CORE ACTIVITIES
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive logistics solutions across multimodal transport, value-added services, customs compliance, insurance, and supply chain management.
          </p>
        </div>

        <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Main infographic image with lazy loading */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="/assets/zz_page-0001.jpg"
                alt="D P GLOBAL Core Activities - Multimodal Transport, Value Added Services, Customs & Compliance, Insurance, and Supply Chain Solutions"
                className={`w-full h-auto transition-all duration-700 group-hover:scale-[1.02] gpu-accelerated ${imageLoaded ? 'loaded' : ''}`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Additional context cards */}
          <div className="grid md:grid-cols-5 gap-4 mt-8">
            <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gpu-accelerated">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Multimodal Transport</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Ocean, Air, Rail & Road, Project Movement</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gpu-accelerated">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Value Added Service</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Palletisation, Fumigation, Lashing, Packaging</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gpu-accelerated">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Customs & Compliance</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Consulting, Brokerage, GST & Licenses</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gpu-accelerated">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Insurance</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Cargo, Marine, and General Insurance</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 gpu-accelerated">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Supply Chain</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Warehousing, 3PL/4PL, Plant Shifting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

