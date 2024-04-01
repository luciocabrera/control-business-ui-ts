import { useMemo } from 'react';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { InvoicesStats } from 'types';

import { NumberDisplay } from 'components';

export const getQuantitySumCell = ({
  row: {
    original: { quantitySum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    output={'number'}
    value={quantitySum}
  />
);

export const getInvoicesCell = ({
  row: {
    original: { invoicesCount },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    output={'number'}
    value={invoicesCount}
  />
);

export const getSubtotalCell = ({
  row: {
    original: { subtotalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    output={'currency'}
    value={subtotalSum}
  />
);

export const getTaxesSumCell = ({
  row: {
    original: { taxesSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    output={'currency'}
    value={taxesSum}
  />
);

export const getTotalSumCell = ({
  row: {
    original: { totalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    output={'currency'}
    value={totalSum}
  />
);

export const useInvoicesStatsConfig = () =>
  useMemo<ColumnDef<InvoicesStats>[]>(
    () => [
      {
        accessorKey: 'period',
        header: 'Period',
      },
      {
        accessorKey: 'invoicesCount',
        cell: getInvoicesCell,
        header: 'Invoices',
      },
      {
        accessorKey: 'invoicesMin',
        header: 'First Invoice',
      },
      {
        accessorKey: 'invoicesMax',
        header: 'Last Invoice',
      },
      {
        accessorKey: 'quantitySum',
        cell: getQuantitySumCell,
        header: 'Nr of Hours',
      },

      {
        accessorKey: 'subtotalSum',
        cell: getSubtotalCell,
        header: 'Subtotal',
      },
      {
        accessorKey: 'taxesSum',
        cell: getTaxesSumCell,
        header: 'Taxes',
      },
      {
        accessorKey: 'totalSum',
        cell: getTotalSumCell,
        header: 'Total',
      },
    ],
    []
  );
