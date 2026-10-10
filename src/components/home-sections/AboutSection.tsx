import { homeBandMembers } from '../../data';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>О коллективе</h2>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            NOVA PROJECT — это пять музыкантов, объединённых любовью к живому звуку и эстетике джаза. 
            Мы работаем на мероприятиях любого формата: корпоративы, банкеты, свадьбы, закрытые приёмы, 
            фестивали, фоновая музыка для презентаций и выставок.
          </p>
          <div className={styles.bandMembers}>
            {homeBandMembers.map((member) => (
              <div key={member.name} className={styles.memberCard}>
                <div className={styles.memberIcon}>{member.icon}</div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberDesc}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
