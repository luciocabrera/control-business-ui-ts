//assets
import { detailsViewImg } from 'assets';
// components
import { Header, NewIcon, ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
// hooks
import { useFetchCustomers, useLocation } from 'hooks';
// react
import { useMemo } from 'react';
// types
import type { CustomerType, ColumnDef } from 'types';

const title = 'Customers';

const Customers = () => {
  const { data: customers, loading } = useFetchCustomers();
  const location = useLocation();

  const columns = useMemo<ColumnDef<CustomerType>[]>(
    () => [
      { accessorKey: 'documentTypeName', header: 'ID Type' },
      { accessorKey: 'documentId', header: 'ID' },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      {
        accessorKey: 'actions',
        cell: ({ row: { original } }) => (
          <Link to={`${original.customerId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
            <img src={detailsViewImg} alt="" width="18" height="18" />
          </Link>
        ),
      },
    ],
    [location],
  );

  return (
    <>
      {loading && <PageSpinner />}
      <Header title={title}>
        <Link to="new" state={{ backgroundLocation: location }}>
          <NewIcon />
        </Link>
      </Header>
      <ReadOnlyTable<CustomerType> data={customers} columns={columns} />
      <Outlet />
    </>
  );
};
export default Customers;
