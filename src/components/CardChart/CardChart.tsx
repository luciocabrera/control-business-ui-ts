import { memo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import styles from './CardChart.module.css';

type Series<TData> = {
  label: string;
  data: TData[];
};

type CardChartProps<TData> = {
  title: string;
  subtitle: string;
  colorTitleClass: string;
  data: Series<TData>[];
  primaryAxis: AxisOptions<TData>;
  secondaryAxes: AxisOptions<TData>[];
};

const CardChart = <TData extends Record<string, unknown>>({
  data,
  title,
  subtitle,
  colorTitleClass,
  primaryAxis,
  secondaryAxes,
}: CardChartProps<TData>) => {
  console.log('data', data);
  return (
    <div className={styles['card-chart-wrapper']}>
      {(title || subtitle) && (
        <div className={styles['card-chart-header']}>
          {title && <div className={[styles['title'], styles[colorTitleClass]].join(' ')}>{title}</div>}
          {subtitle && <div className={[styles['subtitle'], styles[colorTitleClass]].join(' ')}>{subtitle}</div>}
        </div>
      )}
      <div className={styles['card-chart-body']}>
        {data?.length > 0 && (
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(CardChart) as typeof CardChart;
