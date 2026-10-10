import { useState } from 'react';
import styles from './Contacts.module.css';

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.contactsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Телефон:</span>
              <a href="tel:+79205291010" className={styles.contactValue}>
                +7 920 529-10-10 (Дмитрий)
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Соцсети / мессенджеры:</span>
              <a href="https://vk.ru/novaprojekt" target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                VK: NOVA PROJECT
              </a>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Отправить сообщение</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ваш email"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваше сообщение"
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}