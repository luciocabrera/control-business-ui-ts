import { useId } from 'react';

import type { TRadioCheckInputProps } from './RadioCheckInput.types';

import styles from './RadioCheckInput.module.css';

const RadioCheckInput = ({
  checked,
  label = '',
  name,
  onChange,
  type = 'checkbox',
}: TRadioCheckInputProps) => {
  const id = useId();

  return (
    <label className={styles.customCheck}>
      <input
        key={`${type}-${name}-${id}`}
        aria-label={name}
        checked={checked}
        id={`${type}-${name}-${id}`}
        name={name}
        type={type}
        onChange={onChange}
      />
      <span className={styles.mark} />
      <span>{label}</span>
    </label>
  );
};

export default RadioCheckInput;
