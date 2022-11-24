// components
import { Link } from 'components';
// hooks
import { useLocation } from 'hooks';
// icons
import { CopyIcon, ViewIcon } from 'icons';
// react
import { memo } from 'react';
// styles
import { TableActionsStyled } from 'styles';

type TableActionsProps = {
  invoiceId: number;
};

const TableActions = memo(({ invoiceId }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link to={`${invoiceId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
        <ViewIcon />
      </Link>
      <Link to={`${invoiceId?.toString() ?? ''}/copy`} state={{ backgroundLocation: location }}>
        <CopyIcon />
      </Link>
    </TableActionsStyled>
  );
});

export default TableActions;
