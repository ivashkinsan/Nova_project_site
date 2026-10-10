import { repertoire } from '../../data';
import styles from './RepertoireSection.module.css';

export default function RepertoireSection({ id = 'repertoire' }: { id?: string }) {
  return (
    <section className={styles.repertoire} id={id}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Репертуар</h2>
        <div className={styles.repertoireGrid}>
          {repertoire.map((item) => (
            <div key={item.title} className={styles.repertoireItem}>
              <h3 className={styles.repertoireTitle}>{item.title}</h3>
              <p className={styles.repertoireDesc}>{item.description}</p>
            </div>
          ))}
        </div>
        <p className={styles.repertoireNote}>
          Можем составить программу под конкретное событие из имеющегося репертуара нашего коллектива.
        </p>
      </div>
    </section>
  );
}
