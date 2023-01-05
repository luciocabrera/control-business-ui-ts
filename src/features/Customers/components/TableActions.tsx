// components
import { Link } from 'components';
// hooks
import { useLocation } from 'hooks';
// icons
import { ViewIcon } from 'icons';
// react
import { memo } from 'react';
// styles
import { TableActionsStyled } from 'styles';

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

export default TableActions;
