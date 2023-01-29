// react
import { useMemo } from 'react';
// types
import type { ColumnDef, InvoiceType, ColumnMetaState } from 'types';
import { isDateBetween } from 'utilities';
// utilities
import { getActionsCell, getDateCell, getSubTotalCell, getTaxesCell, getTotalCell } from '../utils/utils';

const useInvoicesConfig = () => {
  const columns: ColumnDef<InvoiceType>[] = useMemo(
    () => [
      { accessorKey: 'invoice', header: 'Invoice' },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: getDateCell,
        filterFn: (row, columnId, value, addMeta) => {
          const dateToCheck = row?.original?.date ?? '';

          return isDateBetween({ dateToCheck, from: value[0], to: value[1] });
        },
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: getSubTotalCell,
      },
      {
        accessorKey: 'taxes',
        header: 'Taxes',
        cell: getTaxesCell,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: getTotalCell,
      },
      {
        id: 'actions',
        header: '',
        enableResizing: false,
        maxSize: 10,
        size: 10,
        cell: getActionsCell,
      },
    ],
    [],
  );

  const columnMeta: ColumnMetaState = useMemo(
    () => [
      { id: 'invoice', name: 'Invoice' },
      { id: 'documentId', name: 'ID', type: 'date' },
      { id: 'customer', name: 'Customer' },
      { id: 'subtotal', name: 'Sub Total', type: 'number' },
      { id: 'taxes', name: 'Total', type: 'number' },
      { id: 'total', name: 'Total', type: 'number' },
    ],
    [],
  );

  return { columns, columnMeta };
};

export default useInvoicesConfig;
