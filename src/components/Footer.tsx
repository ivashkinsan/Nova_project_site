import { useAppStore } from '../store/store';
import styles from './Footer.module.css';

type FooterLink = {
  label: string;
  page: 'artists' | 'booking' | 'about' | 'contacts' | null;
};

const footerLinks: FooterLink[] = [
  { label: 'artists', page: 'artists' },
  { label: 'booking', page: 'booking' },
  { label: 'about us', page: 'about' },
  { label: 'contacts', page: 'contacts' },
  { label: 'privacy policy', page: null },
  { label: 'terms & conditions', page: null },
  { label: 'disclaimer', page: null },
  { label: 'instagram', page: null },
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
          avantgarde artists agency &copy; 2024
        </div>
        <div className={styles.design}>
          design by uprock
        </div>
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo(0, 0)}
        >
          back to top
        </button>
      </div>
    </footer>
  );
}
