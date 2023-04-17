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
    value={quantitySum}
    output={'number'}
  />
);

export const getInvoicesCell = ({
  row: {
    original: { invoicesCount },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    value={invoicesCount}
    output={'number'}
  />
);

export const getSubtotalCell = ({
  row: {
    original: { subtotalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    value={subtotalSum}
    output={'currency'}
  />
);

export const getTaxesSumCell = ({
  row: {
    original: { taxesSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    value={taxesSum}
    output={'currency'}
  />
);

export const getTotalSumCell = ({
  row: {
    original: { totalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay
    value={totalSum}
    output={'currency'}
  />
);

export const useInvoicesStatsConfig = () =>
  useMemo<ColumnDef<InvoicesStats>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
      },
      {
        accessorKey: 'invoicesCount',
        header: 'Invoices',
        cell: getInvoicesCell,
      },
      {
        accessorKey: 'quantitySum',
        header: 'Nr of Hours',
        cell: getQuantitySumCell,
      },

      {
        accessorKey: 'subtotalSum',
        header: 'Subtotal',
        cell: getSubtotalCell,
      },
      {
        accessorKey: 'taxesSum',
        header: 'Taxes',
        cell: getTaxesSumCell,
      },
      {
        accessorKey: 'totalSum',
        header: 'Total',
        cell: getTotalSumCell,
      },
    ],
    []
  );
