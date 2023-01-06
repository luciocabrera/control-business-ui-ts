// components
import { PageSpinner, Link, Outlet, DateDisplay, ReadOnlyTable } from 'components';
import TableActions from './components/TableActions';
// hooks
import { useFetchInvoices, useLocation, useMemo } from 'hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { ColumnDef, InvoiceType } from 'types';
// utilities
import { getFormattedNumber } from 'utilities';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';

const title = 'Invoices';

const Invoices = () => {
  const dataHook = useFetchInvoices();
  const location = useLocation();

  const columns: ColumnDef<InvoiceType>[] = useMemo(
    () => [
      { accessorKey: 'invoice', header: 'Invoice' },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({
          row: {
            original: { date },
          },
        }) => <DateDisplay date={date} />,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({
          row: {
            original: { subtotal },
          },
        }) => getFormattedNumber(subtotal, 'currency'),
      },
      {
        accessorKey: 'taxes',
        header: 'Taxes',
        cell: ({
          row: {
            original: { taxes },
          },
        }) => getFormattedNumber(taxes, 'currency'),
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({
          row: {
            original: { total },
          },
        }) => getFormattedNumber(total, 'currency'),
      },
      {
        accessorKey: 'actions',
        header: '',
        enableColumnFilter: false,
        enableColumnSorting: false,
        enableColumnResizing: false,
        canResize: false,
        maxWidth: 150,
        width: 10,
        cell: ({
          row: {
            original: { invoiceId },
          },
        }) => <TableActions invoiceId={invoiceId} />,
      },
    ],
    [],
  );

  return (
    <>
      <ReadOnlyHookedTable<InvoiceType>
        dataHook={dataHook}
        columns={columns}
        height="calc(100vh - 120px)"
        title={title}
        actions={
          <Link to="new" aria-label={`New invoice`} state={{ backgroundLocation: location }}>
            <NewIcon />
          </Link>
        }
      />
      <Outlet />
    </>
  );
};

export default Invoices;
