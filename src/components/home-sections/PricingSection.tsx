import { pricing, includedItems, riderNote, pricingPhoto } from '../../data';
import SectionHeading from '../SectionHeading';
import Photo from '../Photo';
import styles from './PricingSection.module.css';

export default function PricingSection({ id = 'pricing' }: { id?: string }) {
  return (
    <section className={styles.pricing} id={id}>
      <div className={styles.container}>
        <SectionHeading
          index="06"
          eyebrow="Бюджет"
          title="Что входит в вечер"
          lead="Прозрачные условия: вы видите полный список всего, что включено в выступление, ещё до подписания договора."
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
              /* Фото-колонка 0.8fr из грида с отступом 72 */
              sizes="(max-width: 1024px) 95vw, 37vw"
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
            <ul className={styles.list}>
              {includedItems.map((item, i) => (
                <li key={item} className={styles.item}>
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
