import { ReadOnlyTable } from 'components';
import CardChart from 'components/CardChart/CardChart';
import { useFetchInvoicesStats } from 'hooks';
import React from 'react';
import type { AxisOptions } from 'react-charts';
import type { DataRowChart, InvoicesStats } from 'types';
import styles from './SummaryLastMonthsChart.module.css';
import { useInvoicesStatsConfig } from './useInvoicesStatsConfig';

const SummaryLastMonthsChart = () => {
  const { data, isLoading } = useFetchInvoicesStats('monthly');
  const columns = useInvoicesStatsConfig();

  const primaryAxis = React.useMemo(
    (): AxisOptions<DataRowChart> => ({
      getValue: (datum) => datum.date,
      scaleType: 'band'
    }),
    []
  );

  const amountAxes = React.useMemo<
    AxisOptions<(typeof data.amounts)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.value,
        stacked: true,
        scaleType: 'linear'
      }
    ],
    []
  );

  const invoicesAxes = React.useMemo<
    AxisOptions<(typeof data.invoices)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.value,
        elementType: 'area',
        scaleType: 'linear'
      }
    ],
    []
  );

  if (isLoading) return <>Loading.................</>;

  return (
    <div className={styles['section-wrapper']}>
      <div
        data-dashboard-role='table'
        data-parent='section-wrapper'
        className={styles['section-column']}
      >
        <div data-parent='section-wrapper'>
          <ReadOnlyTable<InvoicesStats>
            data={data.data}
            columns={columns}
            showHeader={true}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div data-parent='section-wrapper' className={styles['section-column']}>
        <div
          data-parent='section-wrapper'
          className={styles['card-chart-wrapper']}
        >
          <CardChart
            title={'Amounts by Month'}
            subtitle={
              'Sub total, Taxes and Total grouped by Month in the last 12 months'
            }
            data={data.amounts}
            primaryAxis={primaryAxis}
            secondaryAxes={amountAxes}
          />
        </div>
        <div
          data-parent='section-wrapper'
          className={styles['card-chart-wrapper']}
        >
          <CardChart
            title={'Invoices by Month'}
            subtitle={'Nr of Invoices groped by Month in the last 12 months'}
            data={data.invoices}
            primaryAxis={primaryAxis}
            secondaryAxes={invoicesAxes}
          />
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className={styles['card-chart-wrapper']}>
  //       <CardChart
  //         title={'Amounts by Month'}
  //         subtitle={'Sub total, Taxes and Total grouped by Month in the last 12 months'}
  //         data={data.amounts}
  //         primaryAxis={primaryAxis}
  //         secondaryAxes={amountAxes}
  //       />
  //     </div>
  //     <div className={styles['card-chart-wrapper']}>
  //       <CardChart
  //         title={'Invoices by Month'}
  //         subtitle={'Nr of Invoices groped by Month in the last 12 months'}
  //         data={data.invoices}
  //         primaryAxis={primaryAxis}
  //         secondaryAxes={invoicesAxes}
  //       />
  //     </div>
  //   </>
  // );
};

export default SummaryLastMonthsChart;
