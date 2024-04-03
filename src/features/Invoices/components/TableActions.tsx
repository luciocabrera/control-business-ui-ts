import { memo } from 'react';
import { useLocation } from 'hooks';
import { CopyIcon, ViewIcon } from 'icons';
import { TableActionsStyled } from 'styles';

import { Link } from 'components';

type TableActionsProps = {
  invoiceId: number;
};

const TableActions = memo(({ invoiceId }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link
        aria-label={`View invoice ${invoiceId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
        to={`${invoiceId?.toString() ?? ''}`}
      >
        <ViewIcon />
      </Link>
      <Link
        aria-label={`Copy invoice ${invoiceId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
        to={`${invoiceId?.toString() ?? ''}/copy`}
      >
        <CopyIcon />
      </Link>
    </TableActionsStyled>
  );
});

TableActions.displayName = 'TableActions';

export default TableActions;
