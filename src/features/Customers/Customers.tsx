// components
import { ReadOnlyTable, PageSpinner, Link, Outlet } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchCustomers, useLocation, useCallback, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { CustomerType, Column } from 'types';

type Comparator = (a: CustomerType, b: CustomerType) => number;
const title = 'Customers';

const Customers = () => {
  const { data: customers, loading } = useFetchCustomers();
  const location = useLocation();

  const columns: readonly Column<CustomerType>[] = useMemo<Column<CustomerType>[]>(
    () => [
      { key: 'documentTypeName', name: 'ID Type' },
      { key: 'documentId', name: 'ID' },
      { key: 'initials', name: 'Initials' },
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      {
        key: 'defaultPhone',
        name: 'Phone Number',
        formatter: ({
          row: {
            defaultPhone: { number },
          },
        }) => <>{number}</>,
      },
      {
        key: 'actions',
        name: 'Actions',
        sortable: false,
        resizable: false,
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        cellClass: 'table-actions',
        formatter: ({ row }) => <TableActions original={row} />,
      },
    ],
    [],
  );

  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'documentTypeName':
      case 'documentId':
      case 'initials':
      case 'firstName':
      case 'lastName':
        return (a, b) => (a[sortColumn] || '').localeCompare(b[sortColumn] || '');
      case 'defaultPhone':
        return (a, b) => (a.defaultPhone.number || '').localeCompare(b.defaultPhone.number || '');

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
};

export default Customers;
