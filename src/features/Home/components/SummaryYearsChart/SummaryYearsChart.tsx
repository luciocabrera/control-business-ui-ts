import CardChart from 'components/CardChart/CardChart';
import { useFetchInvoicesStats } from 'hooks';
import React from 'react';
import type { AxisOptions } from 'react-charts';
import type { DailyCurrentMonth } from 'types';
import styles from './SummaryYearsChart.module.css';

const SummaryYearsChart = () => {
  const { data, isLoading } = useFetchInvoicesStats('yearly');

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyCurrentMonth> => ({
      getValue: (datum) => datum.date,
    }),
    [],
  );

  const amountAxes = React.useMemo<AxisOptions<typeof data.amounts[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.value,
        stacked: true,
      },
    ],
    [],
  );

  const invoicesAxes = React.useMemo<AxisOptions<typeof data.invoices[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.value,
        elementType: 'area',
      },
    ],
    [],
  );

  if (isLoading) return <>Loading.................</>;

  return (
    <>
      <div className={styles['card-chart-wrapper']}>
        <CardChart
          title={'Amounts by Year'}
          subtitle={'Sub total, Taxes and Total grouped by Year'}
          data={data.amounts}
          primaryAxis={primaryAxis}
          secondaryAxes={amountAxes}
        />
      </div>
      <div className={styles['card-chart-wrapper']}>
        <CardChart
          title={'Invoices by Year'}
          subtitle={'Nr of Invoices groped by Year'}
          data={data.invoices}
          primaryAxis={primaryAxis}
          secondaryAxes={invoicesAxes}
        />
      </div>
    </>
  );
};

export default SummaryYearsChart;
