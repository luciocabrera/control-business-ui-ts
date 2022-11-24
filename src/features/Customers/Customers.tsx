// components
import { ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchCustomers, useLocation, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { CustomerType, ColumnDef } from 'types';

const title = 'Customers';

const Customers = () => {
  const { data: customers, loading } = useFetchCustomers();
  const location = useLocation();

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
        cell: ({
          row: {
            original: {
              defaultPhone: { number },
            },
          },
        }) => <>{number}</>,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        sort: false,
        cell: ({
          row: {
            original: { customerId },
          },
        }) => <TableActions customerId={customerId} />,
      },
    ],
    [],
  );

  return (
    <>
      {loading && <PageSpinner />}
      <ReadOnlyTable<CustomerType>
        data={customers}
        columns={columns}
        height="calc(100vh - 120px)"
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
};

export default Customers;
