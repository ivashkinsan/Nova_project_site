import { pricing, includedItems, riderNote, pricingPhoto } from '../../data';
import SectionHeading from '../SectionHeading';
import Photo from '../Photo';
import styles from './PricingSection.module.css';

export default function PricingSection({ id = 'pricing' }: { id?: string }) {
  const headingId = `${id}-title`;
  return (
    <section className={styles.pricing} id={id} aria-labelledby={headingId}>
      <div className={styles.container}>
        <SectionHeading
          index="06"
          eyebrow="Бюджет"
          title="Что входит в вечер"
          titleId={headingId}
          lead="Список того, что входит в выступление, что считается отдельно и от чего зависит итоговая цена."
        />

        <div className={styles.grid}>
          <div className={styles.visual}>
            <Photo
              src={pricingPhoto.src}
              alt={pricingPhoto.alt}
              width={pricingPhoto.width}
              height={pricingPhoto.height}
              sources={pricingPhoto.sources}
              shape="tall"
              /* Фото-колонка 0.8fr из грида с гутером 64 (≈502px при 1440) */
              sizes="(max-width: 1024px) 95vw, 35vw"
              caption={pricingPhoto.caption}
              meta={pricingPhoto.meta}
            />
          </div>

          <div className={styles.body}>
            <div className={styles.priceRow}>
              <span className={styles.priceLocation}>{pricing.locationNote}</span>
            </div>

            <div className={styles.notes}>
              <p className={styles.note}>{pricing.travelNote}</p>
              <p className={styles.note}>{pricing.finalNote}</p>
            </div>

            <h3 className={styles.listTitle}>Что включено</h3>
            {/* Список включённых пунктов — семантика списка возвращена в WebKit
                (role="list"/"listitem"), где list-style: none её снимает. */}
            <ul className={styles.list} role="list">
              {includedItems.map((item, i) => (
                <li key={item} className={styles.item} role="listitem">
                  <span className={styles.itemIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>

            <p className={styles.rider}>{riderNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
