import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.content}>
          <p className={styles.text}>
            We are a London based booking & management agency dedicated to developing the careers of unique electronic music artists.
          </p>
          <p className={styles.text}>
            Every artist is a superstar in the making, and we're the ones to guide them through the labyrinth of the music industry.
          </p>
          <p className={styles.text}>
            With 20+ years of expertise in talent buying and programming services, the world's best clubs, festivals, restaurants and private members clubs is our canvas.
          </p>
          <p className={styles.text}>
            We bring together the best talent, creating experiences that are nothing short of iconic. Avantgarde Artists Agency – making the ordinary extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}
