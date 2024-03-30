// react
import { useMemo } from 'react';
// types
import type { ColumnDef, ColumnMetaState, CustomerType } from 'types';

// utilities
import { getActionsCell } from '../utilities';

export const useCustomersConfig = () => {
  const columns: ColumnDef<CustomerType>[] = useMemo(
    () => [
      { accessorKey: 'documentTypeName', header: 'ID Type' },
      { accessorKey: 'documentId', header: 'ID' },
      { accessorKey: 'initials', header: 'Initials' },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      {
        accessorKey: 'defaultPhone',
        header: 'Phone Number',
        accessorFn: (row) => row.defaultPhone?.phone ?? '',
      },
      {
        id: 'actions',
        enableResizing: false,
        maxSize: 34,
        cell: getActionsCell,
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

  return { columns, columnMeta };
};
