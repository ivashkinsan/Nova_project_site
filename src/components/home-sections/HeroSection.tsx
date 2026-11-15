import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import Typewriter from '../Typewriter';
import { heroPhoto, heroMeta, heroGenres } from '../../data';
import { scrollToSection } from '../../utils/scroll';

export default function HeroSection() {
  const backdropRef = useRef<HTMLDivElement>(null);

  /* Лёгкий параллакс фона. Значение пишем в CSS-переменную — без ре-рендера.
     Настройку «уменьшить движение» слуаем и после монтирования: её можно
     включить уже во время сессии, а JS-эффект глобальный CSS-блок не гасит. */
  useEffect(() => {
    const element = backdropRef.current;
    if (!element) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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

    const attach = () => {
      if (motionQuery.matches) {
        /* Фон возвращаем на место: смещение осталось бы зафиксированным. */
        element.style.setProperty('--parallax', '0px');
        return;
      }
      window.addEventListener('scroll', onScroll, { passive: true });
    };

    const detach = () => window.removeEventListener('scroll', onScroll);

    const onMotionChange = () => {
      detach();
      attach();
    };

    attach();
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      detach();
      motionQuery.removeEventListener('change', onMotionChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Первый экран">
      <div className={styles.backdrop} ref={backdropRef} aria-hidden="true">
        <img
          className={styles.backdropImg}
          src={heroPhoto.src}
          srcSet={heroPhoto.sources.map((s) => `${s.url} ${s.width}w`).join(', ')}
          sizes="100vw"
          width={heroPhoto.width}
          height={heroPhoto.height}
          alt=""
          loading="eager"
          /* camelCase: React 18 умеет fetchPriority, строчная запись даёт
             предупреждение в консоли разработчика. */
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Липецк · Джаз-квинтет
          <span className={styles.eyebrowLine} aria-hidden="true" />
        </p>

        {/* Название группы — латиница: язык задаём явно, чтобы читалка произнесла
            его по английским правилам, а не по русским (WCAG 3.1.2). */}
        <h1 className={styles.title}>
          <span className={styles.titleNova} lang="en">NOVA</span>
          <span className={styles.titleProject} lang="en">PROJECT</span>
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

      {/* Метрики вечера — тонкая строка-подвал героя. list-style: none снимает
          семантику списка в WebKit, поэтому роль списка возвращаем явно. */}
      <div className={styles.metaStrip}>
        <ul className={styles.metaList} role="list">
          {heroMeta.map((item) => (
            <li key={item.label} className={styles.metaItem} role="listitem">
              <span className={styles.metaValue}>{item.value}</span>
              <span className={styles.metaLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
