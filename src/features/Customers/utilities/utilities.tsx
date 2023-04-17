import type { CellContext, CustomerType } from 'types';

import TableActions from '../components/TableActions';

export const getActionsCell = ({
  row: { original },
}: CellContext<CustomerType, unknown>) => (
  <TableActions customerId={original.peopleId} />
);
