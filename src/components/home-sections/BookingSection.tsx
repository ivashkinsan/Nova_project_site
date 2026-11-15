import { useEffect, useRef, useState } from 'react';
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
  const headingId = `${id}-title`;
  const [formData, setFormData] = useState(initialBookingForm);
  const [isReady, setIsReady] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* Фокус возвращаем в новую панель: форма уходит из дерева, и курсор не должен
     падать в начало страницы (WCAG 2.4.3). Первый рендер пропускаем: при загрузке
     страницы фокус на поле не нужен. */
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isReady) {
      summaryRef.current?.focus();
    } else {
      /* Параметр-тип обязателен: без него querySelector возвращает Element,
         у которого .focus() нет (tsc: Property 'focus' does not exist) */
      formRef.current?.querySelector<HTMLElement>('select, input, textarea')?.focus();
    }
  }, [isReady]);

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
    <section className={styles.booking} id={id} aria-labelledby={headingId}>
      <div className={styles.container}>
        <SectionHeading
          index="07"
          eyebrow="Заявка"
          title="Расскажите о вашем мероприятии"
          titleId={headingId}
          lead="Заполните короткую форму — этого достаточно, чтобы мы предложили программу и назвали точную стоимость."
        />

        {/* complementary-landmark с именем: боковая колонка объявляется
            отдельной зоной, а не безымянным region внутри секции */}
        <div className={styles.grid}>
          <aside className={styles.side} aria-label="Путь от заявки до вечера">
            <Photo
              src={bookingPhoto.src}
              alt={bookingPhoto.alt}
              width={bookingPhoto.width}
              height={bookingPhoto.height}
              sources={bookingPhoto.sources}
              shape="portrait"
              /* Левая колонка 0.7fr из грида с отступом 64 (≈440px при 1440);
                 при ≤1024 — широкая полоса на всю контейнерную ширину */
              sizes="(max-width: 1024px) 96vw, 31vw"
              caption={bookingPhoto.caption}
              meta={bookingPhoto.meta}
            />

            {/* Шаги работы: list-style: none снимает семантику списка в WebKit
                (нумерация рисуется вручную), поэтому роль списка и роль элемента
                возвращаем явно (WCAG — программа чтения объявит пять шагов). */}
            <ol className={styles.steps} role="list">
              {bookingSteps.map((step, i) => (
                <li key={step.title} className={styles.step} role="listitem">
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
                <span lang="en">VK</span> · <span lang="en">{contactInfo.vkName}</span>
              </a>
            </div>
          </aside>

          <div className={styles.formWrap}>
            {isReady ? (
              <div ref={summaryRef} className={styles.summary} role="status" tabIndex={-1}>
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
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                <FormSelect
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  options={eventTypes}
                  placeholder="Выберите тип мероприятия"
                  required
                  label="Тип мероприятия"
                />

                <FormInput
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  label="Дата мероприятия"
                />

                <FormInput
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Липецк"
                  label="Город / площадка"
                />

                <fieldset className={`${styles.formGroup} ${styles.radioFieldset}`}>
                  {/* Звёздка обязательной группы — только картинка, читалке её не нужно
                      повторять: обязательность группы передаёт required у карточек */}
                  <legend className={styles.label}>
                    Формат выступления
                    <span aria-hidden="true"> *</span>
                  </legend>
                  <div className={styles.radioGroup}>
                    {bookingFormatOptions.map((option) => (
                      <FormRadioCard
                        key={option.value}
                        name="format"
                        value={option.value}
                        label={option.label}
                        checked={formData.format === option.value}
                        onChange={handleFormatChange}
                        required
                      />
                    ))}
                  </div>
                </fieldset>

                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  label="Email"
                />

                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  label="Телефон"
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
