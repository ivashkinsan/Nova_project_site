import styles from './Footer.module.css';
import { footerSectionLinks, contactInfo } from '../data';
import { scrollToTop } from '../utils/scroll';

const orgNotes = [
  'Выезд по Липецку и Липецкой области',
  'Другие города — по договорённости',
  'Райдер согласовывается индивидуально',
  'Фото и видео с выступления — по запросу',
];

export default function Footer() {
  return (
    /* Landmark «footer» получает имя: читалка объявляет его при прыжке,
       как и name у header/nav-земляйндов. */
    <footer className={styles.footer} aria-label="Контакты и дополнительная информация">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <button
              type="button"
              className={styles.logo}
              onClick={scrollToTop}
            >
              {/* Название — латиница, язык задан явно (WCAG 3.1.2). */}
              <span className={styles.logoMark} lang="en">NOVA</span>
              <span className={styles.logoProject} lang="en">PROJECT</span>
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
                <span lang="en">VK</span> · <span lang="en">{contactInfo.vkName}</span>
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
            <span lang="en">NOVA PROJECT</span> &copy; {new Date().getFullYear()}
          </p>
          <p className={styles.credit}>Джаз-квинтет · Липецк</p>
          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
          >
            Наверх
            <span className={styles.backArrow} aria-hidden="true">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* Крупный водяной знак — фактурный финал страницы (латиница, язык задан явно). */}
      <div className={styles.watermark} aria-hidden="true" lang="en">
        NOVA PROJECT
      </div>
    </footer>
  );
}
