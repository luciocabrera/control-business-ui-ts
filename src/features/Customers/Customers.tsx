import { TableContextProvider } from 'contexts';
import { useFetchCustomers, useLocation } from 'hooks';
import { NewIcon } from 'icons';
import type { CustomerType } from 'types';

import { Link, Outlet } from 'components';
import ReadOnlyHookedTable from 'components/Table/ReadOnlyHookedTable/ReadOnlyHookedTable';

import { useCustomersConfig } from './hooks';

const title = 'Customers';

const CustomersBase = () => {
  const location = useLocation();
  const dataHook = useFetchCustomers();
  const { columns } = useCustomersConfig();

  console.log('CustomersBase');

  return (
    <>
      <ReadOnlyHookedTable<CustomerType>
        actions={
          <Link
            aria-label={`New customer`}
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

const Customers = () => {
  const { columnMeta } = useCustomersConfig();

  return (
    <TableContextProvider
      allowFilters={true}
      columnMeta={columnMeta}
      title={title}
    >
      <CustomersBase />
    </TableContextProvider>
  );
};

export default Customers;
