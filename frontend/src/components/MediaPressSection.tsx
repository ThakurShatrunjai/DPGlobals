import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, FileText, ArrowRight } from 'lucide-react';

export default function MediaPressSection() {
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

    return () => {
      observer.disconnect();
    };
  }, []);

  const pressReleases = [
    {
      date: 'October 15, 2023',
      title: 'D P GLOBAL Announces New European Logistics Hub',
      description: 'Expanding our footprint to better serve the Euro-Asian trade corridor with a state-of-the-art facility in Rotterdam.',
    },
    {
      date: 'September 22, 2023',
      title: 'Vijay Shukla Interviewed on Future of Indian Trade',
      description: 'Our founder discusses the pivotal role of digitalization in modernizing India\'s supply chain infrastructure.',
    },
    {
      date: 'August 05, 2023',
      title: 'D P GLOBAL Achieves ISO 9001:2015 Certification',
      description: 'Reaffirming our commitment to quality management and operational excellence.',
    },
  ];

  const newsArticles = [
    {
      source: 'Global Trade Magazine',
      title: 'Top Logistics Companies to Watch in 2024',
      date: 'November 2023',
    },
    {
      source: 'Supply Chain Digest',
      title: 'The Tech Revolution in Freight Forwarding',
      date: 'October 2023',
    },
  ];

  return (
    <section
      id="media"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-muted/20 scroll-snap-section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out gpu-accelerated ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Media & Press
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Latest updates, press releases, and insights from D P GLOBAL and the world of logistics.
          </p>
        </div>

        {/* Press Releases Section */}
        <div className="mb-16">
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <FileText className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold text-foreground">Press Releases</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 gpu-accelerated ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
                }}
              >
                <CardHeader>
                  <div className="text-sm text-primary font-semibold mb-2">
                    {release.date}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {release.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {release.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary/80"
                  >
                    Read Full Release
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 gpu-accelerated" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In The News Section */}
        <div>
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-1000 ease-out gpu-accelerated ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <Newspaper className="h-8 w-8 text-primary" />
            <h3 className="text-3xl font-bold text-foreground">In The News</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {newsArticles.map((article, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 gpu-accelerated ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${600 + index * 100}ms` : '0ms',
                }}
              >
                <CardHeader>
                  <div className="text-sm text-muted-foreground font-medium mb-2">
                    {article.source}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground italic">
                      {article.date}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn gpu-accelerated"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 gpu-accelerated" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

