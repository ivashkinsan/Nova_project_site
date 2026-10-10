import { homeFormatOptions, formatPhotos } from '../../data';
import SectionHeading from '../SectionHeading';
import Photo from '../Photo';
import styles from './FormatSection.module.css';

export default function FormatSection({ id = 'format' }: { id?: string }) {
  const photos = [formatPhotos.concert, formatPhotos.ambient];

  return (
    <section className={styles.format} id={id}>
      <div className={styles.container}>
        <SectionHeading
          index="05"
          eyebrow="Формат"
          title="Два способа провести вечер"
          lead="Один и тот же состав звучит по-разному: как концерт, который слушают, и как фон, который создаёт атмосферу."
        />

        <div className={styles.blocks}>
          {homeFormatOptions.map((option, i) => (
            <article
              key={option.title}
              className={`${styles.block} ${i % 2 === 1 ? styles.blockReversed : ''}`}
            >
              <div className={styles.blockVisual}>
                <Photo
                  src={photos[i].src}
                  alt={photos[i].alt}
                  shape="wide"
                  caption={photos[i].caption}
                  meta={photos[i].meta}
                />
              </div>

              <div className={styles.blockBody}>
                <div className={styles.blockMeta}>
                  <span className={styles.blockIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.blockDuration}>{option.duration}</span>
                </div>

                <h3 className={styles.blockTitle}>{option.title}</h3>
                <p className={styles.blockDesc}>{option.description}</p>

                <ul className={styles.blockList}>
                  {option.details.map((detail) => (
                    <li key={detail} className={styles.blockItem}>
                      {detail}
                    </li>
                  ))}
                </ul>

                <p className={styles.blockNote}>{option.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
