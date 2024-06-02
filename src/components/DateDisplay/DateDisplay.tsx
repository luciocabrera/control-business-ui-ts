import type { DateOutputType, DateParameterType } from 'types';
import { getDateAsString } from 'utilities';

import styles from './DateDisplay.module.css';

type DateDisplayProps = {
  date?: DateParameterType;
  output?: DateOutputType;
  utc?: boolean;
};

const DateDisplay = ({ date, output, utc }: DateDisplayProps) => (
  <span className={styles.container}>{getDateAsString(date, output, utc)}</span>
);

export default DateDisplay;
