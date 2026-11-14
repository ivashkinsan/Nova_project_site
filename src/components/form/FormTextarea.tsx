import { forwardRef } from 'react';
import styles from './FormTextarea.module.css';

interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(function FormTextarea(
  { name, value, onChange, placeholder, rows = 5, label },
  ref
) {
  const id = `field-${name}`;

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
        rows={rows}
        ref={ref}
      />
    </div>
  );
});

export default FormTextarea;
