import type {
  CellContext,
  ColumnDef,
  ColumnMetaState,
  InvoiceType,
} from 'types';
import { isDateBetween } from 'utilities';

import { NumericDisplay } from 'components';
import { MonthDisplay } from 'components/MonthDisplay';
import { QuarterDisplay } from 'components/QuarterDisplay';

import { getActionsCell } from '../utilities';

export const useInvoicesConfig = () => {
  const columns: ColumnDef<InvoiceType, unknown>[] = [
    {
      accessorKey: 'year',
      cell: ({
        row: {
          original: { year },
        },
      }: CellContext<InvoiceType, unknown>) => (
        <NumericDisplay value={year as number} />
      ),
      header: 'Year',
      maxSize: 150,
      meta: { shouldUseDefaultCell: true, type: 'number' },
    },
    {
      accessorKey: 'quarter',
      cell: ({
        row: {
          original: { quarter },
        },
      }: CellContext<InvoiceType, unknown>) => (
        <QuarterDisplay value={quarter as number} />
      ),
      header: 'Quarter',
      maxSize: 150,
      meta: { shouldUseDefaultCell: true },
    },
    {
      accessorKey: 'month',
      cell: ({
        row: {
          original: { month },
        },
      }: CellContext<InvoiceType, unknown>) => (
        <MonthDisplay value={month as number} />
      ),
      header: 'Month',
      maxSize: 150,
      meta: { shouldUseDefaultCell: true },
    },
    {
      accessorKey: 'date',
      filterFn: (row, _columnId, value) => {
        const dateToCheck = row?.original?.date ?? '';

        return isDateBetween({ dateToCheck, from: value[0], to: value[1] });
      },
      header: 'Date',
      meta: { type: 'date' },
    },
    { accessorKey: 'invoice', header: 'Invoice' },

    {
      accessorKey: 'customer',
      header: 'Customer',
    },
    {
      accessorKey: 'subtotal',
      aggregationFn: 'sum',
      header: 'Subtotal',
      meta: { type: 'currency' },
    },
    {
      accessorKey: 'taxes',
      aggregationFn: 'sum',
      header: 'Taxes',
      meta: { type: 'currency' },
    },
    {
      accessorKey: 'total',
      aggregationFn: 'sum',
      header: 'Total',
      meta: { type: 'currency' },
    },
    {
      cell: getActionsCell,
      enableGrouping: false,
      enableResizing: false,
      header: '',
      id: 'actions',
      meta: { shouldUseDefaultCell: true },
    },
  ];

  const columnMeta: ColumnMetaState = () => [
    { id: 'invoice', name: 'Invoice' },
    { id: 'documentId', name: 'ID', type: 'date' },
    { id: 'customer', name: 'Customer' },
    { id: 'subtotal', name: 'Sub Total', type: 'number' },
    { id: 'taxes', name: 'Total', type: 'number' },
    { id: 'total', name: 'Total', type: 'number' },
  ];

  return { columnMeta, columns };
};
