import {
  HeroSection,
  AboutSection,
  RepertoireSection,
  AudioSection,
  GallerySection,
  FormatSection,
  PricingSection,
  BookingSection,
  ContactSection,
} from '../components/home-sections';
import AnimatedSection from '../components/AnimatedSection';
import Marquee from '../components/Marquee';
import { marqueeItems } from '../data';

export default function Home() {
  return (
    <>
      <HeroSection />

      <Marquee items={marqueeItems} speed={52} />

      <AnimatedSection animation="fade-up">
        <AboutSection id="about" />
      </AnimatedSection>

      <AnimatedSection animation="fade-up">
        <RepertoireSection id="repertoire" />
      </AnimatedSection>

      <AnimatedSection animation="fade-up">
        <AudioSection id="audio" />
      </AnimatedSection>

      <AnimatedSection animation="reveal">
        <GallerySection id="gallery" />
      </AnimatedSection>

      <Marquee items={marqueeItems} speed={68} />

      <AnimatedSection animation="fade-up">
        <FormatSection id="format" />
      </AnimatedSection>

      <AnimatedSection animation="fade-up">
        <PricingSection id="pricing" />
      </AnimatedSection>

      <AnimatedSection animation="fade-up">
        <BookingSection id="booking" />
      </AnimatedSection>

      <AnimatedSection animation="zoom">
        <ContactSection id="contact" />
      </AnimatedSection>
    </>
  );
}
