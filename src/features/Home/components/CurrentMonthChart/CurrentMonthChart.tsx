// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useFetchInvoicesStatsNew, useState } from 'hooks';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChangeEvent, InvoicesStats } from 'types';

import CardChart from 'components/CardChart/CardChartNew';
import { ReadOnlyTable } from 'components/Table/ReadOnlyTable';

import { useInvoicesStatsConfig } from './useInvoicesStatsConfig';

import styles from './CurrentMonthChart.module.css';

const CurrentMonthChart = () => {
  const [type, setType] = useState('quarter');
  // const fetchInvoicesStatsNewCallback = useFetchInvoicesStatsNewCallback();
  const { data, isLoading } = useFetchInvoicesStatsNew(type ?? 'quarter');

  console.log('CurrentMonthChart', { data, type });
  const columns = useInvoicesStatsConfig();
  const dataChart = data?.filter((stat) => stat?.period) || [];

  console.log('dataChart', { dataChart });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setType(id);
  };

  if (isLoading) return <>Loading.................</>;

  return (
    <div className={styles['section-wrapper']}>
      {/* <div
        className={styles['section-column']}
        data-parent='section-wrapper'
      > */}

      <div>
        <input
          id='monthly'
          name='analysisType'
          type='radio'
          value={type === 'monthly' ? 'monthly' : ''}
          onChange={onInputChange}
        />
        <label htmlFor='monthly'>Monthly</label>
        <input
          id='quarter'
          name='analysisType'
          type='radio'
          value={type === 'quarter' || type.length === 0 ? 'quarter' : ''}
          onChange={onInputChange}
        />
        <label htmlFor='quarter'>Quarter</label>
        <input
          id='yearly'
          name='analysisType'
          type='radio'
          value={type === 'yearly' ? 'yearly' : ''}
          onChange={onInputChange}
        />{' '}
        <label htmlFor='yearly'>Yearly</label>
      </div>
      {/* <div
          className={styles['card-chart-wrapper']}
          data-parent='section-wrapper'
        >
          <CardChart<InvoicesStats>
            data={dataChart}
            subtitle={'Sub total, Taxes and Total grouped by Day'}
            title={'Amounts current month'}
          >
            <ComposedChart
              data={dataChart}
              // height={300}
              margin={{ bottom: 5, left: 20, right: 30, top: 20 }}
              width={500}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='period'
                padding={{ left: 15, right: 15 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='subtotalSum'
                fill='#8884d8'
                name='Sub Total'
                stackId='a'
              />
              <Bar
                dataKey='taxesSum'
                fill='#82ca9d'
                name='Taxes'
                stackId='a'
              />
            </ComposedChart>
          </CardChart>
        </div> 
        <div
          className={styles['card-chart-wrapper']}
          data-parent='section-wrapper'
        >
          <CardChart
            data={dataChart}
            subtitle={'Nr of Invoices grouped by Day'}
            title={'Invoices current month'}
          >
            <LineChart
              data={dataChart}
              margin={{ bottom: 5, left: 20, right: 30, top: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='period'
                padding={{ left: 15, right: 15 }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                dataKey='invoicesCount'
                name='Nr of Invoices'
                stroke='#8884d8'
                type='basis'
              /> 
               <Line
                dataKey='quantitySum'
                name='Nr of Hours'
                stroke='#82ca9d'
                type='basis'
              />
             </LineChart>
          </CardChart>
        </div>
      </div> */}

      {/* <div
        // className={styles['section-column']}
        data-dashboard-role='table'
        data-parent='section-wrapper'
      > */}
      <div data-parent='section-wrapper'>
        <ReadOnlyTable<InvoicesStats>
          columns={columns}
          data={data}
          defaultColumnOrder={[]}
          hidden={[]}
          isLoading={isLoading}
          visible={[]} // showHeader={true}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

CurrentMonthChart.displayName = 'CurrentMonthChart';

export default CurrentMonthChart;
