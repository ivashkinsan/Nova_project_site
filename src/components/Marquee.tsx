/**
 * Бегущая строка-разделитель между секциями.
 * Декоративная: скрыта от скринридеров, останавливается при наведении.
 */
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
  /** Длительность одного цикла в секундах */
  speed?: number;
  className?: string;
}

export default function Marquee({ items, speed = 46, className = '' }: MarqueeProps) {
  const group = (key: string) => (
    <div className={styles.group} key={key} aria-hidden="true">
      {items.map((item) => (
        <span className={styles.item} key={item}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`${styles.marquee} ${className}`}>
      <div
        className={styles.track}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}
