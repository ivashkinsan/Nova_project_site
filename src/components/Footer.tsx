import styles from './Footer.module.css';

type FooterLink = {
  label: string;
  sectionId: string | null;
};

const footerLinks: FooterLink[] = [
  { label: 'Главная', sectionId: null },
  { label: 'О нас', sectionId: 'about' },
  { label: 'Репертуар', sectionId: 'repertoire' },
  { label: 'Бронирование', sectionId: 'booking' },
  { label: 'Контакты', sectionId: 'contact' },
];

export default function Footer() {
  const scrollToSection = (sectionId: string | null) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
              onClick={() => scrollToSection(link.sectionId)}
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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Наверх
        </button>
      </div>
    </footer>
  );
}