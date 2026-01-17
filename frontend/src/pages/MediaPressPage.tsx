import Header from '@/components/Header';
import MediaPressSection from '@/components/MediaPressSection';
import CorporateInfoSection from '@/components/CorporateInfoSection';
import Footer from '@/components/Footer';

export default function MediaPressPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-20 md:pt-24">
        <MediaPressSection />
        <CorporateInfoSection />
      </main>
      <Footer />
    </div>
  );
}
