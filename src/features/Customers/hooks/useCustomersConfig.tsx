import { useMemo } from 'react';
import type { ColumnDef, ColumnMetaState, CustomerType } from 'types';

import { getActionsCell } from '../utilities';

export const useCustomersConfig = () => {
  const columns: ColumnDef<CustomerType>[] = useMemo(
    () => [
      {
        accessorKey: 'documentTypeName',
        enableGrouping: false,
        header: 'ID Type',
      },
      {
        accessorKey: 'documentId',
        enableGrouping: false,
        header: 'ID',

        meta: { shouldUseDefaultCell: true },
      },
      {
        accessorKey: 'initials',
        enableGrouping: false,
        header: 'Initials',
        meta: { shouldUseDefaultCell: true },
      },
      {
        accessorKey: 'firstName',
        enableGrouping: false,
        header: 'First Name',
        meta: { shouldUseDefaultCell: true },
      },
      {
        accessorKey: 'lastName',
        enableGrouping: false,
        header: 'Last Name',
        meta: { shouldUseDefaultCell: true },
      },
      {
        accessorFn: (row) => row.defaultPhone?.phone ?? '',
        accessorKey: 'defaultPhone',
        enableGrouping: false,
        header: 'Phone Number',
      },
      {
        cell: getActionsCell,
        enableResizing: false,
        id: 'actions',

        maxSize: 72,
        meta: { shouldUseDefaultCell: true },
      },
    ],
    []
  );

  const columnMeta: ColumnMetaState = useMemo(
    () => [
      { id: 'documentId', name: 'ID' },
      { id: 'initials', name: 'Initials' },
      { id: 'firstName', name: 'First Name' },
      { id: 'lastName', name: 'Last Name' },
    ],
    []
  );

  return { columnMeta, columns };
};
