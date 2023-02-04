// components
import { Link, Outlet } from 'components';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';
// contexts
import { TableContextProvider } from 'contexts';
// hooks
import { useFetchCustomers, useLocation } from 'hooks';
import useCustomersConfig from './hooks/useCustomersConfig';
// icons
import { NewIcon } from 'icons';
// types
import type { CustomerType } from 'types';

const title = 'Customers';

const CustomersBase = () => {
  const location = useLocation();
  const dataHook = useFetchCustomers();
  const { columns } = useCustomersConfig();

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
  const { columnMeta } = useCustomersConfig();

  return (
    <TableContextProvider columnMeta={columnMeta}>
      <CustomersBase />
    </TableContextProvider>
  );
};

export default Customers;
