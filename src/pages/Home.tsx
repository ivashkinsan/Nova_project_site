import { useAppStore } from '../store/store';
import styles from './Home.module.css';

const artists = [
  { name: 'Adassiya Live', image: 'https://images.unsplash.com/photo-1493225158459-f9cbc554e5e7?w=400&h=500&fit=crop' },
  { name: 'Diass', image: 'https://images.unsplash.com/photo-1514525652956-d186d7623c00?w=400&h=500&fit=crop' },
  { name: 'CJ JEFF', image: 'https://images.unsplash.com/photo-1470229732664-077b5e526dcw=400&h=500&fit=crop' },
  { name: 'Ravens', image: 'https://images.unsplash.com/photo-1506157786176-656e6bb69812?w=400&h=500&fit=crop' },
  { name: 'Kalamo', image: 'https://images.unsplash.com/photo-1494791973352-7d5e42a56c29?w=400&h=500&fit=crop' },
  { name: 'NADIA BOULIF', image: 'https://images.unsplash.com/photo-1516578627005-5dc2bfef010a?w=400&h=500&fit=crop' },
  { name: 'Katya Livingston', image: 'https://images.unsplash.com/photo-1508701184068-1543cc7dd8c3?w=400&h=500&fit=crop' },
  { name: 'Komoya', image: 'https://images.unsplash.com/photo-1459283993058-3a11f49d23bc?w=400&h=500&fit=crop' },
  { name: 'Lumijay', image: 'https://images.unsplash.com/photo-1511361570776-81ac019530a5?w=400&h=500&fit=crop' },
  { name: 'LUCIA KOSTA', image: 'https://images.unsplash.com/photo-1504808866240-0916be7796c9?w=400&h=500&fit=crop' },
  { name: 'Nikolina', image: 'https://images.unsplash.com/photo-1524368535920-9b95c9f89c6d?w=400&h=500&fit=crop' },
  { name: 'Veronika Fleyta', image: 'https://images.unsplash.com/photo-1518609842253-653a6cc068a8?w=400&h=500&fit=crop' },
];

export default function Home() {
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>Making</span>
            <span className={styles.heroLine}>the</span>
            <span className={`${styles.heroLine} ${styles.accent}`}>ordinary extraordinary</span>
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About us</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              We are a London based booking & management agency dedicated to developing the careers of unique electronic music artists.
            </p>
            <p className={styles.aboutText}>
              Every artist is a superstar in the making, and we're the ones to guide them through the labyrinth of the music industry.
            </p>
            <p className={styles.aboutText}>
              With 20+ years of expertise in talent buying and programming services, the world's best clubs, festivals, restaurants and private members clubs is our canvas.
            </p>
          </div>
        </div>
      </section>

      {/* Curate Section */}
      <section className={styles.curate}>
        <div className={styles.container}>
          <h2 className={styles.curateTitle}>We curate</h2>
          <p className={styles.curateText}>
            We bring together the best talent, creating experiences that are nothing short of iconic.
          </p>
        </div>
      </section>

      {/* Artists Section */}
      <section className={styles.artists}>
        <div className={styles.container}>
          <div className={styles.artistsGrid}>
            {artists.map((artist) => (
              <div key={artist.name} className={styles.artistCard}>
                <div className={styles.artistImage}>
                  <img src={artist.image} alt={artist.name} />
                  <div className={styles.artistOverlay}>
                    <span className={styles.artistName}>{artist.name}</span>
                    <button className={styles.exploreBtn} onClick={() => {}}>Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.viewAll}>
            <button className={styles.viewAllBtn} onClick={() => setCurrentPage('artists')}>
              View All Artists
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
