// == Import : npm
// == Import : local
import { ChangeEvent, useId, useState } from 'react';
import './styles.scss';

interface FieldProps {
  type?: string;
  placeholder: string;
}
// == Composant
function Field({ type, placeholder }: FieldProps) {
  const inputId = useId();

  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
      />

      <label htmlFor={inputId} className="field-label">
        {placeholder}
      </label>
    </div>
  );
}

// Valeurs par défaut pour les props
Field.defaultProps = {
  type: 'text',
};

// == Export
export default Field;
