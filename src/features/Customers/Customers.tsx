//assets
import { detailsViewImg } from 'assets';
// components
import { Header, NewIcon, ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
import ViewIcon from 'components/Icons/ViewIcon/ViewIcon';
// hooks
import { useFetchCustomers, useLocation } from 'hooks';
// react
import { memo, useMemo } from 'react';
// types
import type { CustomerType, ColumnDef } from 'types';
import TableActions from './components/TableActions';

const title = 'Customers';

// const Actions = memo(({ original }: { original: CustomerType }) => {
//   const location = useLocation();
//   return (
//     <Link to={`${original.customerId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
//       <ViewIcon />
//     </Link>
//   );
// });

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
        cell: ({ row: { original } }) => (
          <TableActions original={original} />
          // <Link to={`${original.customerId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
          //   <img src={detailsViewImg} alt="" width="18" height="18" />
          // </Link>
        ),
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
