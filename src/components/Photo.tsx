/**
 * Единая подача фотографии: ч/б по умолчанию, цвет и лёгкий зум — при наведении.
 * Подпись появляется поверх снимка.
 *
 * Дериваты — WebP-ступени реестра `photos.ts` (Public/img/): picture/source с
 * srcset по ширине контейнера (sizes зависят от shape), jpg-подложка как
 * fallback. width/height из реестра — защита от CLS при загрузке.
 */
import styles from './Photo.module.css';
import type { PhotoAsset } from '../data';

type PhotoShape = 'portrait' | 'wide' | 'square' | 'tall' | 'fill';

/** Ширина снимка от shape — srcset-ресурсы подбираются под неё */
const SHAPE_SIZES: Record<PhotoShape, string> = {
  portrait: '(max-width: 768px) 85vw, 46vw',
  wide: '(max-width: 768px) 100vw, 48vw',
  square: '(max-width: 768px) 90vw, 30vw',
  tall: '(max-width: 768px) 85vw, 40vw',
  fill: '(max-width: 768px) 100vw, 33vw',
};

interface PhotoProps {
  src: string;
  alt: string;
  shape?: PhotoShape;
  caption?: string;
  meta?: string;
  /** Первый экран — грузим без lazy */
  priority?: boolean;
  /** Натуральные размеры оригинала (реестр) */
  width?: number;
  height?: number;
  /** WebP-дериваты по возрастанию (реестр) */
  sources?: PhotoAsset['sources'];
  className?: string;
}

export default function Photo({
  src,
  alt,
  shape = 'portrait',
  caption,
  meta,
  priority = false,
  width,
  height,
  sources,
  className = '',
}: PhotoProps) {
  const sizes = SHAPE_SIZES[shape];

  const figure = (
    <figure className={`${styles.photo} ${styles[shape]} ${className}`}>
      {(width || height) ? (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
      {(caption || meta) && (
        <figcaption className={styles.caption}>
          {caption && <span className={styles.captionTitle}>{caption}</span>}
          {meta && <span className={styles.captionMeta}>{meta}</span>}
        </figcaption>
      )}
    </figure>
  );

  if (!sources || sources.length === 0) return figure;

  const srcset = sources.map((s) => `${s.url} ${s.width}w`).join(', ');

  return (
    <picture className={`${styles.photo} ${styles[shape]} ${className}`}>
      <source type="image/webp" srcSet={srcset} sizes={sizes} />
      {(width || height) ? (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      ) : (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      )}
    </picture>
  );
}
