import { memo } from 'react';
import { useLocation } from 'hooks';
import { ViewIcon } from 'icons';
import { TableActionsStyled } from 'styles';

import { Link } from 'components';

type TableActionsProps = {
  customerId: number;
};

const TableActions = memo(({ customerId }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link
        to={`${customerId?.toString() ?? ''}`}
        aria-label={`View customer ${customerId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
      >
        <ViewIcon />
      </Link>
    </TableActionsStyled>
  );
});

TableActions.displayName = 'TableActions';

export default TableActions;
