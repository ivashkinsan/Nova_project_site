import { forwardRef } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps {
  type: 'text' | 'email' | 'tel' | 'date';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { type, name, value, onChange, placeholder, required, label },
  ref
) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        required={required}
        ref={ref}
      />
    </div>
  );
});

export default FormInput;
