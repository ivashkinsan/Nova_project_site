/**
 * Единый заголовок секции: индекс → линия → надзаголовок → заголовок → лид.
 * Используется во всех секциях, чтобы держать одну типографическую стилистику.
 */
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** Номер секции, например «01» */
  index?: string;
  /** Надзаголовок в верхнем регистре */
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  size?: 'default' | 'display';
  className?: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = 'left',
  size = 'default',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={[
        styles.head,
        align === 'center' ? styles.center : styles.left,
        size === 'display' ? styles.display : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.meta}>
        {index && <span className={styles.index}>{index}</span>}
        <span className={styles.rule} aria-hidden="true" />
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
