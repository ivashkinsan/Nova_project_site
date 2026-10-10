import { useState } from 'react';
import { FormInput, FormSelect, FormTextarea, FormRadioCard } from '../form';
import { eventTypes, bookingFormatOptions, initialBookingForm } from '../../data';
import styles from './BookingSection.module.css';

export default function BookingSection({ id = 'booking' }: { id?: string }) {
  const [formData, setFormData] = useState(initialBookingForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.booking} id={id}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Бронирование</h2>
        <p className={styles.sectionSubtitle}>
          Заполните форму, и мы свяжемся с вами для обсуждения деталей
        </p>
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
            <label className={styles.label}>Формат выступления*</label>
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
            placeholder="Укажите пожелания по программе, времени, технике..."
            label="Дополнительная информация"
          />

          <button type="submit" className={styles.submitBtn}>
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
}