import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const contacts = [
    {
      department: 'Sales',
      email: 'accounts@dpglobal.co.in',
      description: 'For sales inquiries and account management'
    },
    {
      department: 'Operations',
      email: 'customerservice@dpglobal.co.in',
      description: 'For operational support and customer service'
    },
    {
      department: 'General',
      email: 'vijay.shukla@dpglobal.co.in',
      description: 'For general inquiries and information'
    }
  ];

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
    <section id="contact" ref={sectionRef} className="py-20 bg-background scroll-snap-section">
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ease-out gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out to our team for any inquiries or assistance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <Card 
              key={index} 
              className={`border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group gpu-accelerated ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 gpu-accelerated">
                    <Mail className="h-5 w-5" />
                  </div>
                  {contact.department}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:underline font-medium block break-all transition-all duration-300 hover:translate-x-1 gpu-accelerated"
                >
                  {contact.email}
                </a>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

