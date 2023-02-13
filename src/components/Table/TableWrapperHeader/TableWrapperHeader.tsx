// components
import Header from 'components/Header/Header';
import IconButton from 'components/IconButton/IconButton';
import { FilterIcon } from 'icons';
// contexts
import { TableContextActionKind, useTableContext } from 'contexts';
// react
import { memo, useCallback } from 'react';
// styles
import { TableActionsStyled } from 'styles';
// types
import type { ReactElement } from 'types';

type TableWrapperHeaderProps = {
  actions?: ReactElement;
};

const TableWrapperHeader = memo(({ actions }: TableWrapperHeaderProps) => {
  const {
    state: { allowFilters, title },
    dispatch,
  } = useTableContext();

  const onSetShowFilters = useCallback(() => {
    dispatch({ type: TableContextActionKind.toggleShowColumnFilters });
  }, [dispatch]);

  return (
    <Header title={title}>
      <TableActionsStyled>
        {actions}
        {allowFilters && <IconButton id="show-filters" onClick={onSetShowFilters} icon={<FilterIcon />} />}
      </TableActionsStyled>
    </Header>
  );
});

export default TableWrapperHeader;
