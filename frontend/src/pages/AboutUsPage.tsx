import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import CoreActivitiesSection from '@/components/CoreActivitiesSection';

export default function AboutUsPage() {
  useEffect(() => {
    document.title = 'About Us - DP Globals';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-24">
        <AboutSection />
        <CoreActivitiesSection />
      </main>
      <Footer />
    </div>
  );
}
