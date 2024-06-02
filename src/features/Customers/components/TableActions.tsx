import { useLocation } from 'hooks';
import { ViewIcon } from 'icons';
import { TableActionsStyled } from 'styles';

import { Link } from 'components';

type TableActionsProps = {
  customerId: number;
};

const TableActions = ({ customerId }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link
        aria-label={`View customer ${customerId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
        to={`${customerId?.toString() ?? ''}`}
      >
        <ViewIcon />
      </Link>
    </TableActionsStyled>
  );
};

TableActions.displayName = 'TableActions';

export default TableActions;
