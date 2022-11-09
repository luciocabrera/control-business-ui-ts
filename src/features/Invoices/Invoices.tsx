// components
import { Header, ReadOnlyTable, PageSpinner, Link, Outlet, DateDisplay } from 'components';
// hooks
import { useFetchInvoices, useLocation } from 'hooks';
// icons
import { NewIcon } from 'icons';
// react
import { memo, useMemo } from 'react';
// types
import type { InvoiceType, ColumnDef } from 'types';
// utilities
import { getFormattedNumber, onSort } from 'utilities';
import TableActions from './components/TableActions';

const title = 'Invoices';

const Invoices = memo(() => {
  const { data: invoices, loading } = useFetchInvoices();
  const location = useLocation();

  const columns = useMemo<ColumnDef<InvoiceType>[]>(
    () => [
      { accessorKey: 'invoice', header: 'Invoice' },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row: { original } }) => <DateDisplay date={original.date} />,
      },
      {
        accessorFn: (original) => original.customer?.fullNameWithInitials,
        header: 'Customer',
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        accessorFn: (original) => getFormattedNumber(original.subtotal, 'currency'),
        sortingFn: (rowA, rowB) => onSort(rowA.original.subtotal, rowB.original.subtotal),
      },
      {
        accessorKey: 'taxes',
        header: 'Taxes',
        accessorFn: (original) => getFormattedNumber(original.taxes, 'currency'),
        sortingFn: (rowA, rowB) => onSort(rowA.original.taxes, rowB.original.taxes),
      },
      {
        accessorKey: 'total',
        header: 'Total',
        accessorFn: (original) => getFormattedNumber(original.total, 'currency'),
        sortingFn: (rowA, rowB) => onSort(rowA.original.total, rowB.original.total),
      },

      {
        accessorKey: 'actions',
        enableSorting: false,
        size: 5,
        maxSize: 5,
        cell: ({ row: { original } }) => <TableActions original={original} />,
      },
    ],
    [],
  );

  return (
    <>
      {loading && <PageSpinner />}
      <Header title={title} isTable>
        <Link to="new" state={{ backgroundLocation: location }}>
          <NewIcon />
        </Link>
      </Header>
      <ReadOnlyTable<InvoiceType> data={invoices} columns={columns} height="calc(100vh - 120px)" />
      <Outlet />
    </>
  );
});
export default Invoices;
