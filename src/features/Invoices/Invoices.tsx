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

const title = 'Invoices';

const Invoices = () => {
  const { data: invoices, loading } = useFetchInvoices();
  const location = useLocation();

  const columns: ColumnDef<InvoiceType>[] = useMemo(
    () => [
      { accessorKey: 'invoice', name: 'Invoice' },
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
        minWidth: 100,
        cell: ({
          row: {
            original: {
              customer: { fullNameWithInitials },
            },
          },
        }) => <>{fullNameWithInitials}</>,
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({
          row: {
            original: { subtotal },
          },
        }) => <>{getFormattedNumber(subtotal, 'currency')}</>,
      },
      {
        accessorKey: 'taxes',
        header: 'Taxes',
        cell: ({
          row: {
            original: { taxes },
          },
        }) => <>{getFormattedNumber(taxes, 'currency')}</>,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({
          row: {
            original: { total },
          },
        }) => <>{getFormattedNumber(total, 'currency')}</>,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        sort: false,
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
      {loading && <PageSpinner />}
      <ReadOnlyTable<InvoiceType>
        data={invoices}
        columns={columns}
        height="calc(100vh - 120px)"
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
