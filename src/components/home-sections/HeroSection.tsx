import styles from './HeroSection.module.css';
import heroImage from '../../assets/1.jpg';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className={styles.hero}
      id="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroTitleWrapper}>
          <span className={styles.heroTitleNova}>NOVA</span>
          <span className={styles.heroTitleProject}>PROJECT</span>
        </div>
        <p className={styles.heroSubtitle}>Джаз-квинтет для ваших мероприятий</p>
        <p className={styles.heroTagline}>
          Профессиональный джаз-квинтет из Липецка. Играем всё: от классики джаза до фьюжна.
        </p>
        <button className={styles.heroCta} onClick={() => scrollToSection('booking')}>
          Связаться с нами
        </button>
      </div>
      <div className={styles.scrollIndicator}>
        <span>↓</span>
      </div>
    </section>
  );
}
