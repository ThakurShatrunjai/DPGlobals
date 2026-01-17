import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CorporateInfoSection() {
  const [isVisible, setIsVisible] = useState(false);
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

    return () => observer.disconnect();
  }, []);

  return (
    <section id="corporate" ref={sectionRef} className="py-20 bg-gradient-to-br from-accent/5 to-background scroll-snap-section">
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Corporate Information
          </h2>
          <p className="text-lg text-muted-foreground">
            Our presence across key business hubs in India
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className={`border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group gpu-accelerated ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 gpu-accelerated">
                  <MapPin className="h-6 w-6" />
                </div>
                Registered Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-muted-foreground leading-relaxed">
                FLAT NO. 123, 2nd FLOOR<br />
                New Four Storey, Vishal Enclave<br />
                Tagore Garden Extn.<br />
                New Delhi-110027<br />
                India
              </address>
            </CardContent>
          </Card>

          <Card className={`border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group gpu-accelerated ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 gpu-accelerated">
                  <Building2 className="h-6 w-6" />
                </div>
                Office Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <div className="transition-all duration-300 hover:translate-x-2 gpu-accelerated">
                  <h4 className="font-semibold text-foreground mb-1">Northern India</h4>
                  <p>New Delhi</p>
                </div>
                <div className="transition-all duration-300 hover:translate-x-2 gpu-accelerated">
                  <h4 className="font-semibold text-foreground mb-1">Western India</h4>
                  <p>Mumbai / Gandhi-Dham</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

