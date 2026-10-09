import styles from './Artists.module.css';

const artists = [
  { name: 'Adassiya Live', image: 'https://images.unsplash.com/photo-1493225158459-f9cbc554e5e7?w=600&h=700&fit=crop' },
  { name: 'Diass', image: 'https://images.unsplash.com/photo-1514525652956-d186d7623c00?w=600&h=700&fit=crop' },
  { name: 'CJ JEFF', image: 'https://images.unsplash.com/photo-1470229732664-077b5e526dcw=600&h=700&fit=crop' },
  { name: 'Ravens', image: 'https://images.unsplash.com/photo-1506157786176-656e6bb69812?w=600&h=700&fit=crop' },
  { name: 'Kalamo', image: 'https://images.unsplash.com/photo-1494791973352-7d5e42a56c29?w=600&h=700&fit=crop' },
  { name: 'NADIA BOULIF', image: 'https://images.unsplash.com/photo-1516578627005-5dc2bfef010a?w=600&h=700&fit=crop' },
  { name: 'Katya Livingston', image: 'https://images.unsplash.com/photo-1508701184068-1543cc7dd8c3?w=600&h=700&fit=crop' },
  { name: 'Komoya', image: 'https://images.unsplash.com/photo-1459283993058-3a11f49d23bc?w=600&h=700&fit=crop' },
  { name: 'Lumijay', image: 'https://images.unsplash.com/photo-1511361570776-81ac019530a5?w=600&h=700&fit=crop' },
  { name: 'LUCIA KOSTA', image: 'https://images.unsplash.com/photo-1504808866240-0916be7796c9?w=600&h=700&fit=crop' },
  { name: 'Nikolina', image: 'https://images.unsplash.com/photo-1524368535920-9b95c9f89c6d?w=600&h=700&fit=crop' },
  { name: 'Veronika Fleyta', image: 'https://images.unsplash.com/photo-1518609842253-653a6cc068a8?w=600&h=700&fit=crop' },
  { name: 'Regina Lyu', image: 'https://images.unsplash.com/photo-1534528741528-0c60b8d77c4f?w=600&h=700&fit=crop' },
  { name: 'Urmet K', image: 'https://images.unsplash.com/photo-1507838590789-b3a0b470a236?w=600&h=700&fit=crop' },
  { name: 'Maia Lee', image: 'https://images.unsplash.com/photo-1529626455491-50099ff7c475?w=600&h=700&fit=crop' },
  { name: 'SILA DEREN', image: 'https://images.unsplash.com/photo-1545158708-98a4e7e6d9d9?w=600&h=700&fit=crop' },
  { name: 'Daniel Sehnawi', image: 'https://images.unsplash.com/photo-1516280596437-573a4e0a73b8?w=600&h=700&fit=crop' },
  { name: 'KXD', image: 'https://images.unsplash.com/photo-1493225158459-f9cbc554e5e7?w=600&h=700&fit=crop' },
  { name: 'NANDRA', image: 'https://images.unsplash.com/photo-1514525652956-d186d7623c00?w=600&h=700&fit=crop' },
  { name: 'Nysiades', image: 'https://images.unsplash.com/photo-1470229732664-077b5e526dcw=600&h=700&fit=crop' },
  { name: 'Bojana Katsarova', image: 'https://images.unsplash.com/photo-1506157786176-656e6bb69812?w=600&h=700&fit=crop' },
];

export default function Artists() {
  return (
    <section className={styles.artistsPage}>
      <div className={styles.container}>
        <div className={styles.artistsGrid}>
          {artists.map((artist) => (
            <div key={artist.name} className={styles.artistCard}>
              <div className={styles.artistImage}>
                <img src={artist.image} alt={artist.name} />
                <div className={styles.artistOverlay}>
                  <span className={styles.artistName}>{artist.name}</span>
                  <button className={styles.exploreBtn}>Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
