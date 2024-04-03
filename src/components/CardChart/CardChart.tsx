import { memo } from 'react';

import styles from './CardChart.module.css';

type Series<TData> = {
  label: string;
  data: TData[];
};

type CardChartProps<TData> = {
  title: string;
  subtitle: string;
  data: Series<TData>[];
  // primaryAxis: AxisOptions<TData>;
  // secondaryAxes: AxisOptions<TData>[];
};

const CardChart = <TData extends Record<string, unknown>>({
  data,
  title,
  subtitle,
  primaryAxis,
  secondaryAxes,
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
        {/* {data?.length > 0 && (
          // <Chart
          //   options={{
          //     data,
          //     primaryAxis,
          //     secondaryAxes,
          //   }}
          // />
        )} */}
      </div>
    </div>
  );
};

export default memo(CardChart) as typeof CardChart;
