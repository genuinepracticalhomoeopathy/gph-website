import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import StatsSection from '../../components/StatsSection';
import CoursesSection from '../../components/CoursesSection';
import AboutSection from '../../components/AboutSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import ContactSection from '../../components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
