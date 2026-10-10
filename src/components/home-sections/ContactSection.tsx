import { contactInfo, contactPhoto } from '../../data';
import SectionHeading from '../SectionHeading';
import styles from './ContactSection.module.css';

export default function ContactSection({ id = 'contact' }: { id?: string }) {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.contact} id={id}>
      {/* Полоса-фон: фото приглушено, чтобы текст читался */}
      <div className={styles.backdrop} aria-hidden="true">
        <img className={styles.backdropImg} src={contactPhoto.src} alt="" />
        <div className={styles.scrim} />
      </div>

      <div className={styles.container}>
        <SectionHeading
          index="08"
          eyebrow="Контакты"
          title="Свяжитесь с нами"
          lead="Готовы обсудить дату, формат и условия. Свяжитесь удобным способом — ответим и предложим программу."
          size="display"
        />

        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Телефон</span>
            <a href={contactInfo.phoneLink} className={styles.cardValue}>
              {contactInfo.phone}
            </a>
            <span className={styles.cardMeta}>Спросить {contactInfo.contactPerson}</span>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Соцсети</span>
            <a
              href={contactInfo.vkLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardValue}
            >
              VK · {contactInfo.vkName}
            </a>
            <span className={styles.cardMeta}>Записи и анонсы выступлений</span>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Заявка</span>
            <button type="button" className={styles.cardButton} onClick={scrollToBooking}>
              Заполнить форму
              <span className={styles.cardArrow} aria-hidden="true">
                →
              </span>
            </button>
            <span className={styles.cardMeta}>Пара минут — и мы обсудим детали</span>
          </div>
        </div>
      </div>
    </section>
  );
}
