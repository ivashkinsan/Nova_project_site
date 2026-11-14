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

  /* Корень — всегда <figure>: на нём shape-класс, ховер-фильтр, подпись и
     aspect-ratio-переопределения секций (.visual figure). Внутри — picture с
     WebP-ступенями (fallback jpg) либо одиночный jpg-снимок. figcaption не может
     быть внутри picture, поэтому он — прямой ребёнок figure. */
  const media = sources && sources.length > 0 ? (
    <picture className={styles.media}>
      <source
        type="image/webp"
        srcSet={sources.map((s) => `${s.width}w`).join(', ')}
        sizes={sizes}
      />
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
    </picture>
  ) : (
    <img
      className={styles.img}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  return (
    <figure className={`${styles.photo} ${styles[shape]} ${className}`}>
      {media}
      {(caption || meta) && (
        <figcaption className={styles.caption}>
          {caption && <span className={styles.captionTitle}>{caption}</span>}
          {meta && <span className={styles.captionMeta}>{meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
