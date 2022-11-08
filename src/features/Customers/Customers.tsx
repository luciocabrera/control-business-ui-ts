// components
import { Header, ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchCustomers, useLocation } from 'hooks';
// icons
import { NewIcon } from 'icons';
// react
import { memo, useMemo } from 'react';
// types
import type { CustomerType, ColumnDef } from 'types';

const title = 'Customers';

const Customers = memo(() => {
  const { data: customers, loading } = useFetchCustomers();
  const location = useLocation();

  const columns = useMemo<ColumnDef<CustomerType>[]>(
    () => [
      { accessorKey: 'documentTypeName', header: 'ID Type' },
      { accessorKey: 'documentId', header: 'ID' },
      { accessorKey: 'initials', header: 'Initials' },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      {
        accessorFn: (original) => original.defaultPhone?.number,
        header: 'Phone Number',
      },
      {
        accessorKey: 'actions',
        cell: ({ row: { original } }) => <TableActions original={original} />,
      },
    ],
    [],
  );

  return (
    <>
      {loading && <PageSpinner />}
      <Header title={title} isTable={true}>
        <Link to="new" state={{ backgroundLocation: location }}>
          <NewIcon />
        </Link>
      </Header>
      <ReadOnlyTable<CustomerType> data={customers} columns={columns} height="calc(100vh - 120px)" />
      <Outlet />
    </>
  );
});

export default Customers;
