// components
import { Link } from 'components';
// hooks
import { useLocation } from 'hooks';
// icons
import { ViewIcon } from 'icons';
// types
import type { CustomerType } from 'types';
// react
import { memo } from 'react';
// styles
import { TableActionsStyled } from 'styles';

type TableActionsProps = {
  original: CustomerType;
};

const TableActions = memo(({ original }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link to={`${original.customerId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
        <ViewIcon />
      </Link>
    </TableActionsStyled>
  );
});

export default TableActions;
