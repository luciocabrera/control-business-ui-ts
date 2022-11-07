//assets
import { detailsViewImg, copyImg } from 'assets';
// components
import {
  Header,
  NewIcon,
  ReadOnlyTable,
  PageSpinner,
  Link,
  Outlet,
  DateDisplay,
  NumberDisplay,
  IconButton,
} from 'components';
// hooks
import { useFetchInvoices, useLocation } from 'hooks';
// react
import { useMemo } from 'react';
// types
import type { InvoiceType, ColumnDef } from 'types';

const title = 'Invoices';

const Invoices = () => {
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
        cell: ({ row: { original } }) => <NumberDisplay value={original.subtotal} output={'currency'} />,
      },
      {
        accessorKey: 'taxes',
        header: 'Taxes',
        cell: ({ row: { original } }) => <NumberDisplay value={original.taxes} output={'currency'} />,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row: { original } }) => <NumberDisplay value={original.total} output={'currency'} />,
      },

      {
        accessorKey: 'actions',
        cell: ({ row: { original } }) => (
          <>
            <Link to={`${original.invoiceId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
              <IconButton src={detailsViewImg} />
            </Link>
            <Link to={`${original.invoiceId?.toString() ?? ''}/copy`} state={{ backgroundLocation: location }}>
              <IconButton src={copyImg} />
            </Link>
          </>
        ),
      },
    ],
    [location],
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
};
export default Invoices;
