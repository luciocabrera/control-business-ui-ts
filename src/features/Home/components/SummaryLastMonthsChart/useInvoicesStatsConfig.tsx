import { CellContext, ColumnDef } from '@tanstack/react-table';
import { NumberDisplay } from 'components';
import { useMemo } from 'react';
import { InvoicesStats } from 'types';

export const getInvoicesCell = ({
  row: {
    original: { invoicesCount }
  }
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay value={invoicesCount} output={'number'} />
);

export const getSubtotalCell = ({
  row: {
    original: { subtotalSum }
  }
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay value={subtotalSum} output={'currency'} />
);

export const getTaxesSumCell = ({
  row: {
    original: { taxesSum }
  }
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay value={taxesSum} output={'currency'} />
);

export const getTotalSumCell = ({
  row: {
    original: { totalSum }
  }
}: CellContext<InvoicesStats, unknown>) => (
  <NumberDisplay value={totalSum} output={'currency'} />
);

export const useInvoicesStatsConfig = () =>
  useMemo<ColumnDef<InvoicesStats>[]>(
    () => [
      {
        accessorKey: 'period',
        header: 'Period'
      },
      {
        accessorKey: 'invoicesCount',
        header: 'Invoices',
        cell: getInvoicesCell
      },
      {
        accessorKey: 'subtotalSum',
        header: 'Subtotal',
        cell: getSubtotalCell
      },
      {
        accessorKey: 'taxesSum',
        header: 'Taxes',
        cell: getTaxesSumCell
      },
      {
        accessorKey: 'totalSum',
        header: 'Total',
        cell: getTotalSumCell
      }
    ],
    []
  );
