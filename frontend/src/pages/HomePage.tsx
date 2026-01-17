import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CoreActivitiesSection from '@/components/CoreActivitiesSection';
import ContactSection from '@/components/ContactSection';
import QueryFormSection from '@/components/QueryFormSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CoreActivitiesSection />
        <ContactSection />
        <QueryFormSection />
      </main>
      <Footer />
    </div>
  );
}
