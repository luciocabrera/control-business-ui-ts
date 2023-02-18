import { ReadOnlyTable } from 'components';
import CardChart from 'components/CardChart/CardChartNew';
import { useFetchInvoicesStatsNew } from 'hooks';
import { memo, useMemo } from 'react';
import type { InvoicesStats } from 'types';
import styles from './CurrentMonthChart.module.css';
import { useInvoicesStatsConfig } from './useInvoicesStatsConfig';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ComposedChart
} from 'recharts';

const CurrentMonthChart = memo(() => {
  const { data, isLoading } = useFetchInvoicesStatsNew();
  const { data: customers } = useFetchInvoicesStatsNew(
    'customers_current_month'
  );
  const columns = useInvoicesStatsConfig();
  const dataChart = useMemo(
    () => data?.filter((stat) => stat.date !== '') || [],
    [data]
  );

  console.log('dataChart', { dataChart, data, customers });

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
            data={data}
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
          <CardChart<InvoicesStats>
            data={dataChart}
            title={'Amounts current month'}
            subtitle={'Sub total, Taxes and Total grouped by Day'}
          >
            <ComposedChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' padding={{ left: 15, right: 15 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='subtotalSum'
                stackId='a'
                fill='#8884d8'
                name='Sub Total'
              />
              <Bar dataKey='taxesSum' stackId='a' fill='#82ca9d' name='Taxes' />
              <Bar dataKey='totalSum' fill='#ffc658' name='Total' />
              <Line
                type='basis'
                dataKey='totalAvg'
                name='Total Avg'
                stroke='#03542f'
              />
            </ComposedChart>
          </CardChart>
        </div>
        <div
          data-parent='section-wrapper'
          className={styles['card-chart-wrapper']}
        >
          <CardChart
            title={'Invoices current month'}
            subtitle={'Nr of Invoices grouped by Day'}
            data={dataChart}
          >
            <LineChart
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' padding={{ left: 15, right: 15 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type='basis'
                dataKey='invoicesCount'
                name='Nr of Invoices'
                stroke='#8884d8'
              />
              <Line
                type='basis'
                dataKey='quantitySum'
                name='Nr of Hours'
                stroke='#82ca9d'
              />
            </LineChart>
          </CardChart>
        </div>
      </div>
    </div>
  );
});

CurrentMonthChart.displayName = 'CurrentMonthChart';

export default CurrentMonthChart;
