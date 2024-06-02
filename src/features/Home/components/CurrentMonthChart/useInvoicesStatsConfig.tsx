import { CellContext, ColumnDef } from '@tanstack/react-table';
import { InvoicesStats } from 'types';

import { NumericDisplay } from 'components';

export const getQuantitySumCell = ({
  row: {
    original: { quantitySum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumericDisplay
    output={'number'}
    value={quantitySum}
  />
);

export const getInvoicesCell = ({
  row: {
    original: { invoicesCount },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumericDisplay
    output={'number'}
    value={invoicesCount}
  />
);

export const getSubtotalCell = ({
  row: {
    original: { subtotalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumericDisplay
    output={'currency'}
    value={subtotalSum}
  />
);

export const getTaxesSumCell = ({
  row: {
    original: { taxesSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumericDisplay
    output={'currency'}
    value={taxesSum}
  />
);

export const getTotalSumCell = ({
  row: {
    original: { totalSum },
  },
}: CellContext<InvoicesStats, unknown>) => (
  <NumericDisplay
    output={'currency'}
    value={totalSum}
  />
);

export const useInvoicesStatsConfig = [
  {
    accessorKey: 'period',
    enableGrouping: false,
    header: 'Period',
  },
  {
    accessorKey: 'invoicesCount',
    enableGrouping: false,
    header: 'Invoices',
    meta: { type: 'number' },
  },
  {
    accessorKey: 'invoicesMin',
    enableGrouping: false,
    header: 'First Invoice',
  },
  {
    accessorKey: 'invoicesMax',
    enableGrouping: false,
    header: 'Last Invoice',
  },
  {
    accessorKey: 'quantitySum',
    enableGrouping: false,
    header: 'Nr of Hours',
    meta: { type: 'number' },
  },

  {
    accessorKey: 'subtotalSum',
    aggregationFn: 'sum',
    enableGrouping: false,
    header: 'Subtotal',
    meta: { type: 'currency' },
  },
  {
    accessorKey: 'taxesSum',
    aggregationFn: 'sum',
    enableGrouping: false,
    header: 'Taxes',
    meta: { type: 'currency' },
  },
  {
    accessorKey: 'totalSum',
    aggregationFn: 'sum',
    enableGrouping: false,
    header: 'Total',
    meta: { type: 'currency' },
  },
];
