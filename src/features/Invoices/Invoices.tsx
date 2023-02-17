// components
import { Link, Outlet } from 'components';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';
// contexts
import { TableContextProvider } from 'contexts';
// hooks
import { useFetchInvoices, useLocation } from 'hooks';
import { useInvoicesConfig } from './hooks';
// icons
import { NewIcon } from 'icons';
// types
import type { InvoiceType } from 'types';

const title = 'Invoices';

const InvoicesBase = () => {
  const location = useLocation();
  const dataHook = useFetchInvoices();
  const { columns } = useInvoicesConfig();

  return (
    <>
      <ReadOnlyHookedTable<InvoiceType>
        dataHook={dataHook}
        columns={columns}
        height="calc(100vh - 120px)"
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

const Invoices = () => {
  const { columnMeta } = useInvoicesConfig();

  return (
    <TableContextProvider columnMeta={columnMeta} title={title} allowFilters={true}>
      <InvoicesBase />
    </TableContextProvider>
  );
};

export default Invoices;
