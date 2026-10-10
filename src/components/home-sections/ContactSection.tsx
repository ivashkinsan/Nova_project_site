import { contactInfo } from '../../data';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Связаться с нами</h2>
        <p className={styles.contactIntro}>
          Готовы обсудить дату, формат и условия. Свяжитесь удобным способом:
        </p>
        <div className={styles.contactCards}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>📞 Телефон</h3>
            <a href={contactInfo.phoneLink} className={styles.contactLink}>
              {contactInfo.phoneDisplay}
            </a>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>📱 Соцсети / мессенджеры</h3>
            <a href={contactInfo.vkLink} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              VK: {contactInfo.vkName}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
