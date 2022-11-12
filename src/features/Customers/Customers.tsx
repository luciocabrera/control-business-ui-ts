// components
import { Header, ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchCustomers, useLocation } from 'hooks';
// icons
import { NewIcon } from 'icons';
import DataGrid, { Column, SortColumn } from 'react-data-grid';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { CustomerType, ColumnDef } from 'types';

const title = 'Customers';

const Customers = memo(() => {
  const { data: customers, loading } = useFetchCustomers();
  const location = useLocation();

  const columns = useMemo<Column<CustomerType>[]>(
    () => [
      { key: 'documentTypeName', name: 'ID Type' },
      { key: 'documentId', name: 'ID' },
      { key: 'initials', name: 'Initials' },
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      // {
      //   accessorFn: (original) => original.defaultPhone?.number,
      //   name: 'Phone Number',
      // },
      // {
      //   key: 'actions',
      //   cell: ({ row: { original } }) => <TableActions original={original} />,
      // },
    ],
    [],
  );
  type Comparator = (a: CustomerType, b: CustomerType) => number;
  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'documentTypeName':
        // case 'date':
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };

      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }, []);
  const rowKeyGetter = useCallback((row: CustomerType): number => {
    return row?.customerId;
  }, []);

  return (
    <>
      {loading && <PageSpinner />}
      <ReadOnlyTable<CustomerType>
        data={customers}
        columns={columns}
        height="calc(100vh - 120px)"
        rowKeyGetter={rowKeyGetter}
        getComparator={getComparator}
        title={title}
        actions={
          <Link to="new" state={{ backgroundLocation: location }} className="link-icon">
            <NewIcon />
          </Link>
        }
      />
      <Outlet />
    </>
  );
});

export default Customers;
