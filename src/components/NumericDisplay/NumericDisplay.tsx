import { getFormattedNumber } from 'utilities';

import styles from './NumericDisplay.module.css';

type TNumericDisplayProps = {
  value?: number | string;
  output?: 'currency' | 'number';
};

const NumericDisplay = ({ output, value }: TNumericDisplayProps) => (
  <span className={styles.container}>{getFormattedNumber(value, output)}</span>
);

export default NumericDisplay;
