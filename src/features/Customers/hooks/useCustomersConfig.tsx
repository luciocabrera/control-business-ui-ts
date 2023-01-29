// react
import { useMemo } from 'react';
// types
import type { CustomerType, ColumnDef, ColumnMetaState } from 'types';
// utilities
import { getActionsCell } from '../utils/utils';

const useCustomersConfig = () => {
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
        maxSize: 10,
        size: 10,
        cell: getActionsCell,
      },
    ],
    [],
  );

  const columnMeta: ColumnMetaState = useMemo(
    () => [
      { id: 'documentId', name: 'ID' },
      { id: 'initials', name: 'Initials' },
      { id: 'firstName', name: 'First Name' },
      { id: 'lastName', name: 'Last Name' },
    ],
    [],
  );

  return { columns, columnMeta };
};

export default useCustomersConfig;
