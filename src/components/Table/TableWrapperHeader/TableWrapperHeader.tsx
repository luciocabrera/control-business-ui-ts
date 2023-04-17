// components
// react
import { memo, useCallback } from 'react';
// contexts
import { TableContextActionKind, useTableContext } from 'contexts';
import { FilterIcon } from 'icons';
// styles
import { TableActionsStyled } from 'styles';
// types
import type { ReactElement } from 'types';

import Header from 'components/Header/Header';
import IconButton from 'components/IconButton/IconButton';

type TableWrapperHeaderProps = {
  actions?: ReactElement;
};

const TableWrapperHeader = memo(({ actions }: TableWrapperHeaderProps) => {
  const {
    state: { allowFilters, title },
    dispatch,
  } = useTableContext();

  const onSetShowFilters = useCallback(() => {
    dispatch({ type: TableContextActionKind.ToggleShowColumnFilters });
  }, [dispatch]);

  return (
    <Header title={title}>
      <TableActionsStyled>
        {actions}
        {allowFilters && (
          <IconButton
            id='show-filters'
            onClick={onSetShowFilters}
            icon={<FilterIcon />}
          />
        )}
      </TableActionsStyled>
    </Header>
  );
});

TableWrapperHeader.displayName = 'TableWrapperHeader';

export default TableWrapperHeader;
