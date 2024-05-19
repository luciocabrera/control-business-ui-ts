import { ResponsiveContainer } from 'recharts';
import { ReactElement } from 'types';

import styles from './CardChart.module.css';

type CardChartProps<TData> = {
  title: string;
  subtitle: string;
  data: TData[];
  children: ReactElement;
};

const CardChart = <TData extends Record<string, unknown>>({
  children,
  data,
  subtitle,
  title,
}: CardChartProps<TData>) => {
  console.log('data', data);
  return (
    <div className={styles['card-chart-wrapper']}>
      {(title || subtitle) && (
        <div className={styles['card-chart-header']}>
          {title && <div className={styles['title']}>{title}</div>}
          {subtitle && <div className={styles['subtitle']}>{subtitle}</div>}
        </div>
      )}
      <div className={styles['card-chart-body']}>
        {data?.length > 0 && (
          <ResponsiveContainer>{children}</ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CardChart;
