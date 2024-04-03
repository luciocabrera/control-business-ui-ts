import type { DateOutputType, DateParameterType } from 'types';
import { getDateAsString, memo } from 'utilities';

import styles from './DateDisplay.module.css';

type DateDisplayProps = {
  date?: DateParameterType;
  output?: DateOutputType;
  utc?: boolean;
};

const DateDisplay = memo(({ date, output, utc }: DateDisplayProps) => (
  <span className={styles.container}>{getDateAsString(date, output, utc)}</span>
));

export default DateDisplay;
