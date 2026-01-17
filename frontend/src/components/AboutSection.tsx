import { Card, CardContent } from '@/components/ui/card';
import { Ship, Plane, Package, Clock, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const services = [
    {
      icon: Ship,
      title: 'Sea Freight Services',
      description: 'Complete ocean freight solutions for all cargo types'
    },
    {
      icon: Plane,
      title: 'Air Freight Services',
      description: 'Fast and secure air cargo transportation'
    },
    {
      icon: Package,
      title: 'Custom Clearance',
      description: 'Expert handling of import/export documentation'
    },
    {
      icon: Clock,
      title: 'Door-to-Door Delivery',
      description: 'End-to-end logistics management'
    }
  ];

  const advantages = [
    'Experienced team of logistics professionals',
    'Global network of trusted partners',
    'Competitive pricing with transparent cost structure',
    'Real-time tracking and monitoring systems',
    '24/7 customer support and communication',
    'Compliance with international trade regulations',
    'Customized solutions for diverse industry needs'
  ];

  useEffect(() => {
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

    // Intersection Observer for visibility-based animations
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
    <section id="about" ref={sectionRef} className="py-20 bg-background relative overflow-hidden scroll-mt-24 scroll-snap-section">
      {/* Parallax background with GPU acceleration */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent parallax-element"
        style={{
          transform: `translate3d(0, ${scrollY * 30}px, 0)`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ABOUT US
          </h2>
          <div className="text-left space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              D P GLOBAL has gained a stellar reputation within the Industry for its exceptional offerings in Sea Freight and Air Freight services. Our commitment to excellence and customer satisfaction has positioned us as a trusted partner for businesses seeking reliable logistics solutions.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className={`mb-16 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Our Comprehensive Range of Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group gpu-accelerated"
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 gpu-accelerated">
                    <service.icon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6 gpu-accelerated" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Multi-modal logistics visual section with lazy loading */}
        <div className={`mb-16 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
          <div className="relative group max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/assets/D P GLOBAL_page-0001(1).jpg"
              alt="DP Globals Multi-Modal Logistics - Integrated Shipping, Trucking, and Air Freight Operations"
              className={`rounded-2xl shadow-2xl w-full relative z-10 transition-all duration-500 group-hover:scale-[1.02] gpu-accelerated ${imageLoaded ? 'loaded' : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className={`mb-16 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              What Sets Us Apart
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-md group gpu-accelerated"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 gpu-accelerated" />
                  <p className="text-muted-foreground">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className={`max-w-4xl mx-auto text-center space-y-6 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p className="text-lg">
              At D P GLOBAL, we understand that every shipment is critical to your business success. Our dedicated team works tirelessly to ensure your cargo reaches its destination safely, on time, and within budget. We leverage cutting-edge technology and industry best practices to deliver superior logistics services that exceed expectations.
            </p>
            <p className="text-lg">
              Whether you're a small business looking to expand internationally or a large corporation managing complex supply chains, D P GLOBAL has the expertise and resources to support your growth. Our commitment to innovation and continuous improvement ensures that we stay ahead of industry trends and provide our clients with the most efficient and cost-effective logistics solutions available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

