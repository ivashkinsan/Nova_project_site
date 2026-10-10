import {
  HeroSection,
  AboutSection,
  RepertoireSection,
  FormatSection,
  PricingSection,
  ContactSection,
} from '../components/home-sections';
import BookingSection from '../components/home-sections/BookingSection';
import AnimatedSection from '../components/AnimatedSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimatedSection animation="fade-up">
        <AboutSection id="about" />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <RepertoireSection id="repertoire" />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <FormatSection id="format" />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <PricingSection id="pricing" />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <BookingSection id="booking" />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <ContactSection id="contact" />
      </AnimatedSection>
    </>
  );
}