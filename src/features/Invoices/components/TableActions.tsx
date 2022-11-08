// components
import { Link } from 'components';
// hooks
import { useLocation } from 'hooks';
// icons
import { CopyIcon, ViewIcon } from 'icons';
// types
import type { InvoiceType } from 'types';
// react
import { memo } from 'react';
// styles
import { TableActionsStyled } from './TableActions.styled';

type TableActionsProps = {
  original: InvoiceType;
};

const TableActions = memo(({ original }: TableActionsProps) => {
  const location = useLocation();
  return (
    <TableActionsStyled>
      <Link to={`${original.invoiceId?.toString() ?? ''}`} state={{ backgroundLocation: location }}>
        <ViewIcon />
      </Link>
      <Link to={`${original.invoiceId?.toString() ?? ''}/copy`} state={{ backgroundLocation: location }}>
        <CopyIcon />
      </Link>
    </TableActionsStyled>
  );
});

export default TableActions;
