import { useAppStore } from '../store/store';
import styles from './Header.module.css';

const navItems = [
  { label: 'О нас', page: 'home' as const },
  { label: 'Репертуар', page: 'artists' as const },
  { label: 'Бронирование', page: 'booking' as const },
  { label: 'Контакты', page: 'contacts' as const },
];

export default function Header() {
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const isMenuOpen = useAppStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useAppStore((state) => state.setIsMenuOpen);

  const handleNavClick = (page: string) => {
    setCurrentPage(page as any);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          onClick={() => handleNavClick('home')}
        >
          NOVA PROJECT
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  className={`${styles.navLink} ${
                    currentPage === item.page ? styles.active : ''
                  }`}
                  onClick={() => handleNavClick(item.page)}
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
  );
}