import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import Typewriter from '../Typewriter';
import { heroPhoto, heroMeta, heroGenres } from '../../data';

export default function HeroSection() {
  const backdropRef = useRef<HTMLDivElement>(null);

  /* Лёгкий параллакс фона. Значение пишем в CSS-переменную — без ре-рендера. */
  useEffect(() => {
    const element = backdropRef.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      element.style.setProperty('--parallax', `${y * 0.22}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backdrop} ref={backdropRef} aria-hidden="true">
        <img className={styles.backdropImg} src={heroPhoto.src} alt="" />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Липецк · Джаз-квинтет
          <span className={styles.eyebrowLine} aria-hidden="true" />
        </p>

        <h1 className={styles.title}>
          <span className={styles.titleNova}>NOVA</span>
          <span className={styles.titleProject}>PROJECT</span>
        </h1>

        <p className={styles.subtitle}>Музыка — это диалог между эпохами</p>

        <p className={styles.tagline}>
          Авторский коллектив, исследующий границы{' '}
          <span className={styles.typewriter}>
            <Typewriter words={heroGenres} typingSpeed={90} erasingSpeed={45} />
          </span>
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={() => scrollToSection('booking')}
          >
            Оставить заявку
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </button>
          <button
            type="button"
            className={styles.ctaGhost}
            onClick={() => scrollToSection('audio')}
          >
            Послушать
          </button>
        </div>

        {/* Индикатор «листайте» — в потоке, чтобы не наезжать на строку метрик */}
        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={() => scrollToSection('about')}
          aria-label="Пролистать к разделу о коллективе"
        >
          <span className={styles.scrollLabel}>Листайте</span>
          <span className={styles.scrollArrow} aria-hidden="true">
            ↓
          </span>
        </button>
      </div>

      {/* Метрики вечера — тонкая строка-подвал героя */}
      <div className={styles.metaStrip}>
        <ul className={styles.metaList}>
          {heroMeta.map((item) => (
            <li key={item.label} className={styles.metaItem}>
              <span className={styles.metaValue}>{item.value}</span>
              <span className={styles.metaLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
