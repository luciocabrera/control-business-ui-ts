import { CellContext, ColumnDef } from '@tanstack/react-table';
import { DateDisplay, NumberDisplay } from 'components';
import { useMemo } from 'react';
import { InvoicesStats } from 'types';

export const getDateCell = ({
  row: {
    original: { date },
  },
}: CellContext<InvoicesStats, unknown>) => <DateDisplay date={date} />;

export const getInvoicesCell = ({
  row: {
    original: { invoicesCount },
  },
}: CellContext<InvoicesStats, unknown>) => <NumberDisplay value={invoicesCount} output={'number'} />;

export const getSubtotalCell = ({
  row: {
    original: { subtotalSum },
  },
}: CellContext<InvoicesStats, unknown>) => <NumberDisplay value={subtotalSum} output={'currency'} />;

export const getTaxesSumCell = ({
  row: {
    original: { taxesSum },
  },
}: CellContext<InvoicesStats, unknown>) => <NumberDisplay value={taxesSum} output={'currency'} />;

export const getTotalSumCell = ({
  row: {
    original: { totalSum },
  },
}: CellContext<InvoicesStats, unknown>) => <NumberDisplay value={totalSum} output={'currency'} />;

export const useInvoicesStatsConfig = () =>
  useMemo<ColumnDef<InvoicesStats>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        cell: getDateCell,
      },
      {
        accessorKey: 'invoicesCount',
        header: 'Invoices',
        cell: getInvoicesCell,
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
    [],
  );
