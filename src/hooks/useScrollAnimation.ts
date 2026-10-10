import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onTrigger?: (self: ScrollTrigger) => void;
}

export function useScrollAnimation(options: UseScrollAnimationOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub || false,
      onUpdate: options.onTrigger,
    });

    return () => {
      trigger.kill();
    };
  }, [options]);

  return ref;
}

export function useParallaxScroll(selector: string, speed: number = 1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.innerWidth <= 998) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(ref.current, {
      y: `${speed * 100}%`,
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [selector, speed]);

  return ref;
}

export function useHeroAnimation() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!heroRef.current || window.innerWidth <= 998) return;

    // Initial positions
    gsap.set('.hero-lottie', { y: '90vh' });
    gsap.set('.hero-title-wrap', { y: '80vh' });

    // Set initial positions for cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const offsets = [90, 150, 130, 170, 110];
        gsap.set(card, { y: `${offsets[index]}vh` });
      }
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        // Enable scroll trigger after animation completes
        setupScrollTrigger();
      },
    });

    timeline
      .to('.hero-lottie', { y: '0vh', duration: 1.2, ease: 'power1.out' })
      .to('.hero-title-wrap', { y: '0vh', duration: 1, ease: 'power1.out' }, '<')
      .to(cardsRef.current, { y: '0vh', duration: 1.2, ease: 'power1.out' }, '<');

    return () => {
      timeline.kill();
    };
  }, []);

  function setupScrollTrigger() {
    if (!heroRef.current) return;

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const speeds = [20, 100, 60, 80, 40];
            gsap.set(card, { y: `${speeds[index] * progress}vh` });
          }
        });
      },
    });
  }

  return { heroRef, cardsRef };
}
