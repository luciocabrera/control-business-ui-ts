import CopyIcon from 'components/Icons/CopyIcon/CopyIcon';
import { memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useLocation } from 'hooks';
import { CustomerType } from 'types';
import { TableActionsStyled } from './TableActions.styled';
import ViewIcon from 'components/Icons/ViewIcon/ViewIcon';
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
