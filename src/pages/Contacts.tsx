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
        <h1 className={styles.title}>Contacts</h1>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>E-mail</span>
              <a href="mailto:hello@avantgardeartistsagency.com" className={styles.contactValue}>
                hello@avantgardeartistsagency.com
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Mobile:</span>
              <a href="tel:+4407878711026" className={styles.contactValue}>
                +44 (0) 7878 711026
              </a>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
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
                  placeholder="Your email"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
