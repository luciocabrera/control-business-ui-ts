import CardChart from 'components/CardChart/CardChart';
import { useFetchInvoicesStats } from 'hooks';
import React from 'react';
import type { AxisOptions } from 'react-charts';
import type { DailyCurrentMonth } from 'types';

const CurrentMonthChart = () => {
  const { data, isLoading } = useFetchInvoicesStats();

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
      <CardChart
        title={'Amounts current month'}
        subtitle={'Sub total, Taxes and Total grouped by Day'}
        data={data.amounts}
        primaryAxis={primaryAxis}
        secondaryAxes={amountAxes}
      />
      <CardChart
        title={'Invoices current month'}
        subtitle={'Nr of Invoices groped by Day'}
        data={data.invoices}
        primaryAxis={primaryAxis}
        secondaryAxes={invoicesAxes}
      />
    </>
  );
};

export default CurrentMonthChart;
