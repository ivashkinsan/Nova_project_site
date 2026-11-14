import styles from './Footer.module.css';
import { footerSectionLinks, contactInfo } from '../data';

const orgNotes = [
  'Выезд по Липецку и Липецкой области',
  'Другие города — по договорённости',
  'Райдер согласовывается индивидуально',
  'Фото и видео с выступления — по запросу',
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <button
              type="button"
              className={styles.logo}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className={styles.logoMark}>NOVA</span>
              <span className={styles.logoProject}>PROJECT</span>
            </button>
            <p className={styles.brandText}>
              Джаз-квинтет из Липецка. Концертные программы и атмосферные сеты —
              живой звук для вечеров, которые хочется помнить.
            </p>
            <div className={styles.brandContacts}>
              <a href={contactInfo.phoneLink} className={styles.phone}>
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.vkLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                VK · {contactInfo.vkName}
              </a>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Разделы сайта">
            <h3 className={styles.colTitle}>Разделы</h3>
            <ul className={styles.links}>
              {footerSectionLinks.map((link) => (
                <li key={link.sectionId}>
                  {/* Нативный якорь — crawlable-навигация; scroll-padding-top в index.css не прячет секцию под шапкой */}
                  <a href={`#${link.sectionId}`} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.meta}>
            <h3 className={styles.colTitle}>Организация</h3>
            <ul className={styles.metaList}>
              {orgNotes.map((note) => (
                <li key={note} className={styles.metaItem}>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            NOVA PROJECT &copy; {new Date().getFullYear()}
          </p>
          <p className={styles.credit}>Джаз-квинтет · Липецк</p>
          <button
            type="button"
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Наверх
            <span className={styles.backArrow} aria-hidden="true">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* Крупный водяной знак — фактурный финал страницы */}
      <div className={styles.watermark} aria-hidden="true">
        NOVA PROJECT
      </div>
    </footer>
  );
}
