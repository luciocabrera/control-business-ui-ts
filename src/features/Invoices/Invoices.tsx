// components
import { Header, ReadOnlyTable, PageSpinner, Link, Outlet, DateDisplay, NumberDisplay } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchInvoices, useLocation, useCallback, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { InvoiceType, Column } from 'types';

const title = 'Invoices';
type Comparator = (a: InvoiceType, b: InvoiceType) => number;

const Invoices = () => {
  const { data: invoices, loading } = useFetchInvoices();
  const location = useLocation();

  const columns: readonly Column<InvoiceType>[] = useMemo(
    () => [
      { key: 'invoice', name: 'Invoice', width: 150, minWidth: 100, maxWidth: 200 },
      {
        key: 'date',
        name: 'Date',

        width: 150,
        minWidth: 100,
        maxWidth: 200,
        formatter: ({ row: { date } }) => <DateDisplay date={date} />,
      },
      {
        key: 'customer',
        name: 'Customer',
        minWidth: 100,
        formatter: ({
          row: {
            customer: { fullNameWithInitials },
          },
        }) => <>{fullNameWithInitials}</>,
      },
      {
        key: 'subtotal',
        name: 'Subtotal',
        formatter: ({ row: { subtotal } }) => <NumberDisplay value={subtotal} output={'currency'} />,
      },
      {
        key: 'taxes',
        name: 'Taxes',
        formatter: ({ row: { taxes } }) => <NumberDisplay value={taxes} output={'currency'} />,
      },
      {
        key: 'total',
        name: 'Total',
        formatter: ({ row: { total } }) => <NumberDisplay value={total} output={'currency'} />,
      },
      {
        key: 'actions',
        name: 'Actions',
        sortable: false,
        resizable: false,
        width: 90,
        minWidth: 90,
        maxWidth: 90,
        cellClass: 'table-actions',
        formatter: ({ row }) => <TableActions original={row} location={location} />,
      },
    ],
    [],
  );

  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'invoice':
      case 'date':
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      case 'customer':
        return (a, b) => a.customer.fullNameWithInitials.localeCompare(b.customer.fullNameWithInitials);
      case 'invoiceId':
      case 'subtotal':
      case 'taxes':
      case 'total':
        return (a, b) => a[sortColumn] - b[sortColumn];
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }, []);
  const rowKeyGetter = useCallback((row: InvoiceType): number => {
    return row?.invoiceId;
  }, []);

  return (
    <>
      {loading && <PageSpinner />}

      <ReadOnlyTable<InvoiceType>
        data={invoices}
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

export default Invoices;
