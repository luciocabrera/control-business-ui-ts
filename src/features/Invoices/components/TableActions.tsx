// components
// react
import { memo } from 'react';
// hooks
import { useLocation } from 'hooks';
// icons
import { CopyIcon, ViewIcon } from 'icons';
// styles
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
        to={`${invoiceId?.toString() ?? ''}`}
        aria-label={`View invoice ${invoiceId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
      >
        <ViewIcon />
      </Link>
      <Link
        to={`${invoiceId?.toString() ?? ''}/copy`}
        aria-label={`Copy invoice ${invoiceId?.toString() ?? ''}`}
        state={{ backgroundLocation: location }}
      >
        <CopyIcon />
      </Link>
    </TableActionsStyled>
  );
});

TableActions.displayName = 'TableActions';

export default TableActions;
