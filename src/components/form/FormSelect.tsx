import { forwardRef } from 'react';
import styles from './FormSelect.module.css';

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  label?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(function FormSelect(
  { name, value, onChange, options, placeholder, required, label },
  ref
) {
  const id = `field-${name}`;

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.reqMark} aria-hidden="true"> *</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
        required={required}
        aria-required={required || undefined}
        ref={ref}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default FormSelect;
