/**
 * Единая подача фотографии: ч/б по умолчанию, цвет и лёгкий зум — при наведении.
 * Подпись появляется поверх снимка.
 */
import styles from './Photo.module.css';

type PhotoShape = 'portrait' | 'wide' | 'square' | 'tall' | 'fill';

interface PhotoProps {
  src: string;
  alt: string;
  shape?: PhotoShape;
  caption?: string;
  meta?: string;
  /** Первый экран — грузим без lazy */
  priority?: boolean;
  className?: string;
}

export default function Photo({
  src,
  alt,
  shape = 'portrait',
  caption,
  meta,
  priority = false,
  className = '',
}: PhotoProps) {
  return (
    <figure className={`${styles.photo} ${styles[shape]} ${className}`}>
      <img
        className={styles.img}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {(caption || meta) && (
        <figcaption className={styles.caption}>
          {caption && <span className={styles.captionTitle}>{caption}</span>}
          {meta && <span className={styles.captionMeta}>{meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
