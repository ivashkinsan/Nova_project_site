import { homeBandMembers } from '../../data';
import styles from './AboutSection.module.css';

export default function AboutSection({ id = 'about' }: { id?: string }) {
  return (
    <section className={styles.about} id={id}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>О коллективе</h2>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            NOVA PROJECT — это пять музыкантов, объединённых любовью к живому звуку и эстетике джаза. 
            Мы работаем на мероприятиях любого формата: корпоративы, банкеты, свадьбы, закрытые приёмы, 
            фестивали, фоновая музыка для презентаций и выставок.
          </p>
          <p className={styles.aboutText}>
            Наш состав: вокал, саксофон, фортепиано, бас гитара, ударные. 
            Каждый из нас — профессиональный музыкант с многолетним опытом концертной деятельности.
          </p>
          <p className={styles.aboutText}>
            Мы играем всё: от классики джаза до фьюжна. В нашем репертуаре — стандарты, 
            свинг, мейнстрим, мировые хиты в джазовых аранжировках, авторские композиции 
            и русская джазовая программа.
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
