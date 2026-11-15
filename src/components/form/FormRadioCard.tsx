import styles from './FormRadioCard.module.css';

interface FormRadioCardProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function FormRadioCard({ name, value, label, checked, onChange, required }: FormRadioCardProps) {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radio}
        required={required}
        aria-required={required || undefined}
      />
      {label}
    </label>
  );
}
