import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { sectionNavItems as navItems } from '../data';
import { scrollToSection, scrollToTop } from '../utils/scroll';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, scrolled } = useScrollProgress();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape закрывает мобильное меню и возвращает фокус на кнопку-бургер
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  /* Прокрутка к секции — общий модуль utils/scroll (prefers-reduced-motion),
     здесь только закрытие меню после перехода */
  const goToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile nav dropdown — rendered outside header for independent z-index */}
      <nav
        id="mobile-nav"
        className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}
        aria-label="Меню секций"
      >
        {/* Список секций: list-style: none снимает семантику списка в WebKit,
            поэтому роль списка и роль элемента возвращаем явно (WCAG). */}
        <ul className={styles.navList} role="list">
          {navItems.map((item, i) => (
            <li key={item.sectionId} role="listitem">
              <button
                type="button"
                className={styles.navLink}
                onClick={() => goToSection(item.sectionId)}
              >
                <span className={styles.navIndex}>{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.navCta}
          onClick={() => goToSection('booking')}
        >
          Оставить заявку
        </button>
      </nav>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.logo}
            onClick={scrollToTop}
          >
            {/* Название — латиница, язык задан явно (WCAG 3.1.2). */}
            <span className={styles.logoMark} lang="en">NOVA</span>
            <span className={styles.logoProject} lang="en">PROJECT</span>
          </button>

          <p className={styles.tagline}>Джаз-квинтет · Липецк</p>

          {/* Desktop nav — роль списка возвращена из-за list-style: none */}
          <nav className={styles.desktopNav} aria-label="Основная навигация">
            <ul className={styles.desktopNavList} role="list">
              {navItems.map((item) => (
                <li key={item.sectionId} role="listitem">
                  <button
                    type="button"
                    className={styles.desktopNavLink}
                    onClick={() => goToSection(item.sectionId)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cta}
              onClick={() => goToSection('booking')}
            >
              Забронировать
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </button>

            <button
              type="button"
              ref={toggleRef}
              className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
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
