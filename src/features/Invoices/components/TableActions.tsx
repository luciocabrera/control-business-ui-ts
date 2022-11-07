import CopyIcon from 'components/Icons/CopyIcon/CopyIcon';
import { memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useLocation } from 'hooks';
import { InvoiceType } from 'types';
import { TableActionsStyled } from './TableActions.styled';
import ViewIcon from 'components/Icons/ViewIcon/ViewIcon';
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
