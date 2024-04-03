import { joinArray } from 'utilities';

import type { TSpanDisplayProps } from './SpanDisplay.types';

import styles from './SpanDisplay.module.css';

const SpanDisplay = ({ shouldCenter, value }: TSpanDisplayProps) => (
  <span
    className={joinArray([styles.container, shouldCenter ? styles.center : ''])}
  >
    {value ?? ''}
  </span>
);

export default SpanDisplay;
