import { useState } from 'react';
import styles from './Header.module.css';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { sectionNavItems as navItems } from '../data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, scrolled } = useScrollProgress();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile nav dropdown — rendered outside header for independent z-index */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          {navItems.map((item, i) => (
            <li key={item.sectionId}>
              <button
                className={styles.navLink}
                onClick={() => scrollToSection(item.sectionId)}
              >
                <span className={styles.navIndex}>{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={styles.navCta}
          onClick={() => scrollToSection('booking')}
        >
          Оставить заявку
        </button>
      </nav>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={styles.logoMark}>NOVA</span>
            <span className={styles.logoProject}>PROJECT</span>
          </button>

          <p className={styles.tagline}>Джаз-квинтет · Липецк</p>

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Основная навигация">
            <ul className={styles.desktopNavList}>
              {navItems.map((item) => (
                <li key={item.sectionId}>
                  <button
                    className={styles.desktopNavLink}
                    onClick={() => scrollToSection(item.sectionId)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.cta}
              onClick={() => scrollToSection('booking')}
            >
              Забронировать
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </button>

            <button
              type="button"
              className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Индикатор прочитанного: тонкая линия прогресса по низу хедера */}
        <div className={styles.progressTrack} aria-hidden="true">
          <span
            className={styles.progressBar}
            style={{ '--progress': progress } as React.CSSProperties}
          />
        </div>
      </header>
    </>
  );
}
