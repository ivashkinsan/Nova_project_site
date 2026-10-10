import { pricing, includedItems, riderNote } from '../../data';
import styles from './PricingSection.module.css';

export default function PricingSection() {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Стоимость</h2>
        <div className={styles.pricingCard}>
          <div className={styles.priceAmount}>{pricing.amount}</div>
          <p className={styles.priceLocation}>{pricing.locationNote}</p>
          <p className={styles.priceNote}>
            {pricing.travelNote} {pricing.finalNote}
          </p>
        </div>
        
        <div className={styles.included}>
          <h3 className={styles.includedTitle}>Что входит в стоимость</h3>
          <ul className={styles.includedList}>
            {includedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.riderNote}>{riderNote}</p>
        </div>
      </div>
    </section>
  );
}
