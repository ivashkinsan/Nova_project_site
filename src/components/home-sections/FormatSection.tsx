import { homeFormatOptions } from '../../data';
import styles from './FormatSection.module.css';

export default function FormatSection({ id = 'format' }: { id?: string }) {
  return (
    <section className={styles.format} id={id}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Формат выступления</h2>
        <div className={styles.formatOptions}>
          {homeFormatOptions.map((option) => (
            <div key={option.title} className={styles.formatCard}>
              <h3 className={styles.formatCardTitle}>{option.title}</h3>
              <p className={styles.formatCardDesc}>{option.description}</p>
              <p className={styles.formatCardNote}>{option.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
