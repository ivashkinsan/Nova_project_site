import { useState } from 'react';
import styles from './Header.module.css';

const navItems = [
  { label: 'О нас', sectionId: 'about' },
  { label: 'Репертуар', sectionId: 'repertoire' },
  { label: 'Бронирование', sectionId: 'booking' },
  { label: 'Контакты', sectionId: 'contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {navItems.map((item) => (
            <li key={item.sectionId}>
              <button
                className={styles.navLink}
                onClick={() => scrollToSection(item.sectionId)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <header className={styles.header}>
        <div className={styles.container}>
          <div
            className={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            NOVA PROJECT
          </div>

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
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

          <button
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}
