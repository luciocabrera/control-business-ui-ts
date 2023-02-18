// components
import TableActions from '../components/TableActions';
// types
import type { CustomerType, CellContext } from 'types';

export const getActionsCell = ({
  row: { original }
}: CellContext<CustomerType, unknown>) => (
  <TableActions customerId={original.peopleId} />
);
