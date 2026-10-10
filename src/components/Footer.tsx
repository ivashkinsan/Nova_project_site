import { useAppStore } from '../store/store';
import styles from './Footer.module.css';

type FooterLink = {
  label: string;
  page: 'artists' | 'booking' | 'about' | 'contacts' | 'home' | null;
};

const footerLinks: FooterLink[] = [
  { label: 'Главная', page: 'home' },
  { label: 'О нас', page: 'about' },
  { label: 'Коллектив', page: 'artists' },
  { label: 'Бронирование', page: 'booking' },
  { label: 'Контакты', page: 'contacts' },
];

export default function Footer() {
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  const handleLinkClick = (page: string | null) => {
    if (page) {
      setCurrentPage(page as any);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          {footerLinks.map((link) => (
            <button
              key={link.label}
              className={styles.link}
              onClick={() => handleLinkClick(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className={styles.copyright}>
          NOVA PROJECT &copy; {new Date().getFullYear()}
        </div>
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo(0, 0)}
        >
          Наверх
        </button>
      </div>
    </footer>
  );
}