import { TableContextProvider } from 'contexts';
import { useFetchInvoices, useLocation } from 'hooks';
import { NewIcon } from 'icons';
import type { InvoiceType } from 'types';

import { Link, Outlet } from 'components';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';

import { useInvoicesConfig } from './hooks';

const title = 'Invoices';

const InvoicesBase = () => {
  const location = useLocation();
  const dataHook = useFetchInvoices();
  const { columns } = useInvoicesConfig();

  return (
    <>
      <ReadOnlyHookedTable<InvoiceType>
        actions={
          <Link
            aria-label={`New invoice`}
            state={{ backgroundLocation: location }}
            to='new'
          >
            <NewIcon />
          </Link>
        }
        columns={columns}
        dataHook={dataHook}
        height='calc(100vh - 120px)'
        title={title}
      />
      <Outlet />
    </>
  );
};

const Invoices = () => {
  const { columnMeta } = useInvoicesConfig();

  return (
    <TableContextProvider
      allowFilters={true}
      columnMeta={columnMeta}
      title={title}
    >
      <InvoicesBase />
    </TableContextProvider>
  );
};

export default Invoices;
