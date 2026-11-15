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
  /** Подсказка под полем — связывается через aria-describedby */
  hint?: string;
  autocomplete?: string;
}

/** Нативные подсказки клавиатуры/автозаполнения по имени поля */
const AUTOCOMPLETE_BY_NAME: Record<string, string> = {
  email: 'email',
  phone: 'tel',
};

const INPUT_MODE_BY_TYPE: Record<string, string> = {
  tel: 'tel',
  email: 'email',
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { type, name, value, onChange, placeholder, required, label, hint, autocomplete },
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
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        required={required}
        aria-required={required || undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        /* autoComplete — регистр важен: React знает только camelCase-проп,
           строчный autocomplete тип не проходит */
        autoComplete={autocomplete ?? (label ? AUTOCOMPLETE_BY_NAME[name] : undefined)}
        inputMode={INPUT_MODE_BY_TYPE[type] as 'tel' | 'email' | undefined}
        ref={ref}
      />
      {hint && <p className={styles.hint} id={`${id}-hint`}>{hint}</p>}
    </div>
  );
});

export default FormInput;
