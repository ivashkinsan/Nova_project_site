import { contactInfo, contactPhoto } from '../../data';
import SectionHeading from '../SectionHeading';
import { scrollToSection } from '../../utils/scroll';
import styles from './ContactSection.module.css';

export default function ContactSection({ id = 'contact' }: { id?: string }) {
  const headingId = `${id}-title`;
  const scrollToBooking = () => scrollToSection('booking');

  return (
    <section className={styles.contact} id={id} aria-labelledby={headingId}>
      {/* Полоса-фон: фото приглушено, чтобы текст читался */}
      <div className={styles.backdrop} aria-hidden="true">
        <img
          className={styles.backdropImg}
          src={contactPhoto.src}
          srcSet={contactPhoto.sources.map((s) => `${s.url} ${s.width}w`).join(', ')}
          sizes="100vw"
          width={contactPhoto.width}
          height={contactPhoto.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.container}>
        <SectionHeading
          index="08"
          eyebrow="Контакты"
          title="Свяжитесь с нами"
          titleId={headingId}
          lead="Готовы обсудить дату, формат и условия. Свяжитесь удобным способом — ответим и предложим программу."
          size="display"
        />

        {/* Каналы связи — список: программа чтения объявляет количество пунктов.
            role="list"/"listitem" возвращают семантику списка в WebKit, где
            list-style: none её снимает; облик и сетка не меняются. */}
        <ul className={styles.cards} role="list">
          <li className={styles.card} role="listitem">
            <span className={styles.cardLabel}>Телефон</span>
            <a href={contactInfo.phoneLink} className={styles.cardValue}>
              {contactInfo.phone}
            </a>
            <span className={styles.cardMeta}>Спросить {contactInfo.contactPerson}</span>
          </li>

          <li className={styles.card} role="listitem">
            <span className={styles.cardLabel}>Соцсети</span>
            <a
              href={contactInfo.vkLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardValue}
            >
              <span lang="en">VK</span> · <span lang="en">{contactInfo.vkName}</span>
            </a>
            <span className={styles.cardMeta}>Записи и анонсы выступлений</span>
          </li>

          <li className={styles.card} role="listitem">
            <span className={styles.cardLabel}>Заявка</span>
            <button type="button" className={styles.cardButton} onClick={scrollToBooking}>
              Заполнить форму
              <span className={styles.cardArrow} aria-hidden="true">
                →
              </span>
            </button>
            <span className={styles.cardMeta}>Пара минут — и мы обсудим детали</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
