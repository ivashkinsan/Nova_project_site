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
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
        required={required}
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
