import { useState } from 'react';
import styles from './Booking.module.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    bookingFee: 'yes',
    flights: 'yes',
    hotel: 'yes',
    country: '',
    venue: '',
    date: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <section className={styles.bookingPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Booking Form</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Booking fee on top*</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="bookingFee"
                  value="yes"
                  checked={formData.bookingFee === 'yes'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="bookingFee"
                  value="no"
                  checked={formData.bookingFee === 'no'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Flights on top*</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="flights"
                  value="yes"
                  checked={formData.flights === 'yes'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="flights"
                  value="no"
                  checked={formData.flights === 'no'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hotel on top*</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="hotel"
                  value="yes"
                  checked={formData.hotel === 'yes'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="hotel"
                  value="no"
                  checked={formData.hotel === 'no'}
                  onChange={handleChange}
                  className={styles.radio}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Country*</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select country</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="CH">Switzerland</option>
              <option value="AT">Austria</option>
              <option value="PL">Poland</option>
              <option value="UA">Ukraine</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue name"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Additional Information</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional details..."
              className={styles.textarea}
              rows={5}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
