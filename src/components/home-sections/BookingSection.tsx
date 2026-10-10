import { useState } from 'react';
import { FormInput, FormSelect, FormTextarea, FormRadioCard } from '../form';
import {
  eventTypes,
  bookingFormatOptions,
  initialBookingForm,
  bookingSteps,
  bookingPhoto,
  contactInfo,
} from '../../data';
import SectionHeading from '../SectionHeading';
import Photo from '../Photo';
import styles from './BookingSection.module.css';

export default function BookingSection({ id = 'booking' }: { id?: string }) {
  const [formData, setFormData] = useState(initialBookingForm);
  const [isReady, setIsReady] = useState(false);

  const eventTypeLabel =
    eventTypes.find((type) => type.value === formData.eventType)?.label ?? '—';
  const formatLabel =
    bookingFormatOptions.find((option) => option.value === formData.format)?.label ?? '—';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormatChange = (value: string) => {
    setFormData({
      ...formData,
      format: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReady(true);
  };

  const summaryRows = [
    { label: 'Мероприятие', value: eventTypeLabel },
    { label: 'Дата', value: formData.date || '—' },
    { label: 'Город / площадка', value: formData.location || '—' },
    { label: 'Формат', value: formatLabel },
    { label: 'Телефон', value: formData.phone || '—' },
    { label: 'Email', value: formData.email || '—' },
  ];

  return (
    <section className={styles.booking} id={id}>
      <div className={styles.container}>
        <SectionHeading
          index="07"
          eyebrow="Заявка"
          title="Расскажите о вашем мероприятии"
          lead="Заполните короткую форму — этого достаточно, чтобы мы предложили программу и назвали точную стоимость."
        />

        <div className={styles.grid}>
          <aside className={styles.side}>
            <Photo
              src={bookingPhoto.src}
              alt={bookingPhoto.alt}
              shape="portrait"
              caption={bookingPhoto.caption}
              meta={bookingPhoto.meta}
            />

            <ol className={styles.steps}>
              {bookingSteps.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.quick}>
              <span className={styles.quickLabel}>Или сразу</span>
              <a href={contactInfo.phoneLink} className={styles.quickPhone}>
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.vkLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.quickLink}
              >
                VK · {contactInfo.vkName}
              </a>
            </div>
          </aside>

          <div className={styles.formWrap}>
            {isReady ? (
              <div className={styles.summary} role="status">
                <span className={styles.summaryIndex}>Заявка готова</span>
                <h3 className={styles.summaryTitle}>Проверьте данные</h3>
                <p className={styles.summaryText}>
                  Мы сохранили детали вечера. Отправьте их удобным способом — позвоните
                  или напишите в VK, и мы вернёмся с программой и точной стоимостью.
                </p>

                <dl className={styles.summaryList}>
                  {summaryRows.map((row) => (
                    <div key={row.label} className={styles.summaryRow}>
                      <dt className={styles.summaryLabel}>{row.label}</dt>
                      <dd className={styles.summaryValue}>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                {formData.message && (
                  <p className={styles.summaryMessage}>{formData.message}</p>
                )}

                <div className={styles.summaryActions}>
                  <a href={contactInfo.phoneLink} className={styles.summaryPrimary}>
                    Позвонить
                  </a>
                  <button
                    type="button"
                    className={styles.summarySecondary}
                    onClick={() => setIsReady(false)}
                  >
                    Изменить данные
                  </button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <FormSelect
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  options={eventTypes}
                  placeholder="Выберите тип мероприятия"
                  required
                  label="Тип мероприятия*"
                />

                <FormInput
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  label="Дата мероприятия*"
                />

                <FormInput
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Липецк"
                  label="Город / площадка"
                />

                <div className={styles.formGroup}>
                  <span className={styles.label}>Формат выступления*</span>
                  <div className={styles.radioGroup}>
                    {bookingFormatOptions.map((option) => (
                      <FormRadioCard
                        key={option.value}
                        name="format"
                        value={option.value}
                        label={option.label}
                        checked={formData.format === option.value}
                        onChange={handleFormatChange}
                      />
                    ))}
                  </div>
                </div>

                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  label="Email*"
                />

                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  label="Телефон*"
                />

                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Расскажите о ваших пожеланиях..."
                  label="Дополнительная информация"
                />

                <button type="submit" className={styles.submitBtn}>
                  Отправить заявку
                  <span className={styles.submitArrow} aria-hidden="true">
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
