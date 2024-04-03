import { memo } from 'utilities';

import { TQuarterDisplayProps } from './QuarterDisplay.types';

import styles from './QuarterDisplay.module.css';

const getQuarterByNumber = (quarter: number) => {
  const quarterNames = ['', 'First', 'Second', 'Third', 'Fourth'];

  return quarterNames[quarter];
};

const QuarterDisplay = memo(({ value }: TQuarterDisplayProps) => (
  <span className={styles.container}>{getQuarterByNumber(value ?? 0)}</span>
));

export default QuarterDisplay;
