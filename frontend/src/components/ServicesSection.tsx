import { Card, CardContent } from '@/components/ui/card';
import { Ship, Plane, Package, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ServicesSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const services = [
    {
      icon: Ship,
      title: 'Sea Freight Services',
      description: 'Complete ocean freight solutions for all cargo types',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Plane,
      title: 'Air Freight Services',
      description: 'Fast and secure air cargo transportation',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Package,
      title: 'Custom Clearance',
      description: 'Expert handling of import/export documentation',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Clock,
      title: 'Door-to-Door Delivery',
      description: 'End-to-end logistics management',
      color: 'from-green-500/20 to-emerald-500/20'
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden scroll-mt-24 scroll-snap-section">
      {/* Modern parallax background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 parallax-element"
        style={{
          transform: `translate3d(0, ${scrollY * 30}px, 0)`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`mb-20 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-semibold text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Comprehensive Range of Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-depth-lg hover:-translate-y-3 group gpu-accelerated card-depth bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              >
                <CardContent className="pt-8 text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} border border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 gpu-accelerated shadow-glow group-hover:shadow-glow-lg`}>
                    <service.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 gpu-accelerated" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
