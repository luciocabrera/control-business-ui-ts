import type { ColumnDef, InvoicesDetails } from 'types';

import { getDateCell } from '../utils/utils';

export const useInvoiceDetailsConfig = () => {
  const columnsDetails: ColumnDef<InvoicesDetails>[] = [
    {
      accessorKey: 'productNameWithCode',
      enableGrouping: false,
      header: 'Product',
    },
    {
      accessorKey: 'date',
      cell: getDateCell,
      enableGrouping: false,
      header: 'Date',
    },
    {
      accessorKey: 'description',
      enableGrouping: false,
      header: 'Description',
    },
    {
      accessorKey: 'quantity',
      enableGrouping: false,
      header: 'Quantity',
      meta: { type: 'number' },
    },
    {
      accessorKey: 'priceUnit',
      enableGrouping: false,
      header: 'Price Unit',
      meta: { type: 'currency' },
    },
    {
      accessorKey: 'priceQuantity',
      enableGrouping: false,
      header: 'Price Quantity',
      meta: { type: 'currency' },
    },
  ];

  return columnsDetails;
};
