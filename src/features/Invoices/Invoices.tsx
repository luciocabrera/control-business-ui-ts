// components
import { ReadOnlyTable, PageSpinner, Link, Outlet, DateDisplay, NumberDisplay } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchInvoices, useLocation, useCallback, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { Column, InvoiceType } from 'types';

type Comparator = (a: InvoiceType, b: InvoiceType) => number;
const title = 'Invoices';

const Invoices = () => {
  const { data: invoices, loading } = useFetchInvoices();
  const location = useLocation();

  const meta = useMemo(
    () => [
      {
        accessor: 'invoice',
        label: 'Invoice',
      },
      {
        accessor: 'date',
        label: 'Date',
      },
      {
        accessor: 'customer',
        label: 'Customer',
      },
      {
        accessor: 'subtotal',
        label: 'Subtotal',
      },
      {
        accessor: 'taxes',
        label: 'Taxes',
      },
      {
        accessor: 'total',
        label: 'Total',
      },
    ],
    [],
  );

  // const columns: ColumnDef<InvoiceType>[] = useMemo(
  //   () => [
  //     { accessorKey: 'invoice', name: 'Invoice', width: 150, minWidth: 100, maxWidth: 200 },
  //     {
  //       accessorKey: 'date',
  //       header: 'Date',

  //       width: 150,
  //       minWidth: 100,
  //       maxWidth: 200,
  //       cell: ({
  //         row: {
  //           original: { date },
  //         },
  //       }) => <DateDisplay date={date} />,
  //     },
  //     {
  //       accessorKey: 'customer',
  //       header: 'Customer',
  //       minWidth: 100,
  //       cell: ({
  //         row: {
  //           original: {
  //             customer: { fullNameWithInitials },
  //           },
  //         },
  //       }) => <>{fullNameWithInitials}</>,
  //     },
  //     {
  //       accessorKey: 'subtotal',
  //       header: 'Subtotal',
  //       cell: ({
  //         row: {
  //           original: { subtotal },
  //         },
  //       }) => <NumberDisplay value={subtotal} output={'currency'} />,
  //     },
  //     {
  //       accessorKey: 'taxes',
  //       header: 'Taxes',
  //       cell: ({
  //         row: {
  //           original: { taxes },
  //         },
  //       }) => <NumberDisplay value={taxes} output={'currency'} />,
  //     },
  //     {
  //       accessorKey: 'total',
  //       header: 'Total',
  //       cell: ({
  //         row: {
  //           original: { total },
  //         },
  //       }) => <NumberDisplay value={total} output={'currency'} />,
  //     },
  //     {
  //       accessorKey: 'actions',
  //       header: 'Actions',
  //       cell: ({ row: { original } }) => <TableActions original={original} />,
  //     },
  //   ],
  //   [],
  // );

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
        meta={meta}
        data={invoices}
        columns={columns}
        height="calc(100vh - 120px)"
        rowKeyGetter={rowKeyGetter}
        getComparator={getComparator}
        title={title}
        actions={
          <Link to="new" state={{ backgroundLocation: location }}>
            <NewIcon />
          </Link>
        }
      />
      <Outlet />
    </>
  );
};

export default Invoices;
