import CardChart from 'components/CardChart/CardChart';
import { useFetchInvoicesStats } from 'hooks';
import React from 'react';
import type { AxisOptions } from 'react-charts';
import type { DailyCurrentMonth } from 'types';
import styles from './CurrentMonthChart.module.css';

const CurrentMonthChart = () => {
  const { data, isLoading } = useFetchInvoicesStats();
  debugger;
  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyCurrentMonth> => ({
      getValue: (datum) => datum.date,
      scaleType: 'band',
    }),
    [],
  );

  const amountAxes = React.useMemo<AxisOptions<typeof data.amounts[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.value,
        stacked: true,
        scaleType: 'linear',
      },
    ],
    [],
  );

  const invoicesAxes = React.useMemo<AxisOptions<typeof data.invoices[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.value,
        elementType: 'area',
        scaleType: 'linear',
      },
    ],
    [],
  );

  if (isLoading) return <>Loading.................</>;

  return (
    <>
      <div className={styles['card-chart-wrapper']}>
        <CardChart
          title={'Amounts current month'}
          subtitle={'Sub total, Taxes and Total grouped by Day'}
          colorTitleClass="color3"
          data={data.amounts}
          primaryAxis={primaryAxis}
          secondaryAxes={amountAxes}
        />
      </div>
      <div className={styles['card-chart-wrapper']}>
        <CardChart
          title={'Invoices current month'}
          subtitle={'Nr of Invoices groped by Day'}
          colorTitleClass="color3"
          data={data.invoices}
          primaryAxis={primaryAxis}
          secondaryAxes={invoicesAxes}
        />
      </div>
    </>
  );
};

export default CurrentMonthChart;
