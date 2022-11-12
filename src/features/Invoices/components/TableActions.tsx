// components
import { Link } from 'components';
// hooks

// icons
import { CopyIcon, ViewIcon } from 'icons';
// types
import type { InvoiceType } from 'types';
// react
import { memo } from 'react';
// styles
import { TableActionsStyled } from './TableActions.styled';
import { Location } from 'react-router-dom';

type TableActionsProps = {
  original: InvoiceType;
  location: Location;
};

const TableActions = memo(({ original, location }: TableActionsProps) => {
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
