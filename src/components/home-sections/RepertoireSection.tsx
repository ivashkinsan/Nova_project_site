import { repertoire, repertoirePhotos } from '../../data';
import type { RepertoireItem, PhotoAsset } from '../../data';
import SectionHeading from '../SectionHeading';
import Photo from '../Photo';
import styles from './RepertoireSection.module.css';

interface CardProps {
  index: string;
  item: RepertoireItem;
  cellClass: string;
}

function RepertoireCard({ index, item, cellClass }: CardProps) {
  return (
    <article className={`${styles.card} ${cellClass}`}>
      <span className={styles.cardIndex}>{index}</span>
      {/* lang есть только у английских заголовков; для русских атрибут не ставим. */}
      <h3 className={styles.cardTitle} lang={item.lang}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.description}</p>
      <span className={styles.cardMark} aria-hidden="true">
        ↗
      </span>
    </article>
  );
}

interface PhotoCellProps {
  photo: PhotoAsset;
  cellClass: string;
}

function PhotoCell({ photo, cellClass }: PhotoCellProps) {
  return (
    <div className={`${styles.photoCell} ${cellClass}`}>
      <Photo
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sources={photo.sources}
        shape="fill"
        /* Карточка репертуара: 3 колонки (2 при ≤1024, 1 при ≤640) */
        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 48vw, 33vw"
        caption={photo.caption}
        meta={photo.meta}
      />
    </div>
  );
}

export default function RepertoireSection({ id = 'repertoire' }: { id?: string }) {
  const headingId = `${id}-title`;
  return (
    <section className={styles.repertoire} id={id} aria-labelledby={headingId}>
      <div className={styles.container}>
        <SectionHeading
          index="02"
          eyebrow="Репертуар"
          title="Программа, собранная под ваш вечер"
          titleId={headingId}
          lead="От классики джаза до авторских композиций — мы выстраиваем сет так, чтобы музыка совпадала с ритмом события."
        />

        <div className={styles.mosaic}>
          <RepertoireCard index="01" item={repertoire[0]} cellClass={styles.cell1} />
          <RepertoireCard index="02" item={repertoire[1]} cellClass={styles.cell2} />
          <PhotoCell photo={repertoirePhotos.tall} cellClass={styles.cell3} />
          <RepertoireCard index="03" item={repertoire[2]} cellClass={styles.cell4} />
          <RepertoireCard index="04" item={repertoire[3]} cellClass={styles.cell5} />
          <RepertoireCard index="05" item={repertoire[4]} cellClass={styles.cell6} />
          <RepertoireCard index="06" item={repertoire[5]} cellClass={styles.cell7} />
          <PhotoCell photo={repertoirePhotos.square} cellClass={styles.cell8} />
        </div>

        <p className={styles.note}>
          Каждая программа — это авторская подборка, выстроенная под конкретный вечер.
          Мы адаптируем репертуар под атмосферу и ваши пожелания.
        </p>
      </div>
    </section>
  );
}
