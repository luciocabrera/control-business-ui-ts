import styles from './MonthDisplay.module.css';

type TMonthDisplayProps = {
  value?: number;
};

const getMonthByNumber = (month: number) => {
  const monthNames = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month];
};

const MonthDisplay = ({ value }: TMonthDisplayProps) => (
  <span className={styles.container}>{getMonthByNumber(value ?? 0)}</span>
);

export default MonthDisplay;
