import { useMemo } from 'react';
// types
import type { ColumnDef,InvoicesDetails } from 'types';

// utils
import {
  getDateCell,
  getPriceQuantityCell,
  getPriceUnitCell,
  getQuantityCell,
} from '../utils/utils';

export const useInvoiceDetailsConfig = () => {
  const columnsDetails = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: getDateCell,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: getQuantityCell,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: getPriceUnitCell,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: getPriceQuantityCell,
      },
    ],
    []
  );

  return columnsDetails;
};
