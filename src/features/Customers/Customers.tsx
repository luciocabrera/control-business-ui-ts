// components
import { Link, Outlet } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchCustomers, useLocation, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { CustomerType, ColumnDef } from 'types';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';
import { ColumnMetaState, TableContextProvider, useTableContext } from 'contexts';

const title = 'Customers';

const CustomersBase = () => {
  const { state } = useTableContext();
  console.log('state', state);

  const dataHook = useFetchCustomers();

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
            original: { defaultPhone },
          },
        }) => defaultPhone?.phone ?? '',
      },
      {
        accessorKey: 'actions',
        header: '',
        enableColumnSorting: false,
        sort: false,
        cell: ({
          row: {
            original: { peopleId },
          },
        }) => <TableActions customerId={peopleId} />,
      },
    ],
    [],
  );

  return (
    <>
      <ReadOnlyHookedTable<CustomerType>
        dataHook={dataHook}
        columns={columns}
        height="calc(100vh - 120px)"
        title={title}
        actions={
          <Link to="new" aria-label={`New customer`} state={{ backgroundLocation: location }}>
            <NewIcon />
          </Link>
        }
      />
      <Outlet />
    </>
  );
};

const Customers = () => {
  const columnMeta: ColumnMetaState = useMemo(
    () => [
      { id: 'documentId', name: 'ID' },
      { id: 'initials', name: 'Initials' },
      { id: 'firstName', name: 'First Name' },
      { id: 'lastName', name: 'Last Name' },
    ],
    [],
  );

  return (
    <TableContextProvider columnMeta={columnMeta}>
      <CustomersBase />
    </TableContextProvider>
  );
};

export default Customers;
