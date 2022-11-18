// components
import { Header, IconButton, DataGrid } from 'components';
import FilterSettings from '../FilterSettings/FilterSettings';
// contexts
import { TableContextProvider } from 'contexts';
// css
import 'react-data-grid/lib/styles.css';
// icons
import { FilterIcon } from 'icons';
// react
import { memo, useEffect, useMemo, useState } from 'react';
// styles
import { TableStyled } from './ReadOnlyTable.styled';
import { TableActionsStyled } from 'styles';
// types
import type { SortColumn } from 'types';
import type { ReadOnlyProps } from './ReadOnlyTable.types';

// TODO Implement later
// const isAtBottom = ({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean =>
//   currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;

const Table = <TData extends Record<string, unknown>>({
  actions,
  columns,
  data,
  height,
  title,
  showHeader = true,
  allowFiltering = true,
  meta,
  icon,
  rowKeyGetter,
  getComparator,
}: ReadOnlyProps<TData>) => {
  const [rows, setRows] = useState(data);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const sortedRows = useMemo((): readonly TData[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [getComparator, rows, sortColumns]);

  const gridElement = (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      rowHeight={30}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      rowClass={() => 'grid-row'}
      className="fill-grid"
    />
  );

  return (
    <>
      {showHeader && (
        <Header title={title} icon={icon}>
          <TableActionsStyled>
            {actions}
            {allowFiltering && <IconButton onClick={() => setShowFilterSettings(true)} icon={<FilterIcon />} />}
          </TableActionsStyled>
        </Header>
      )}
      <TableStyled height={height}>{gridElement}</TableStyled>
      {showFilterSettings && <FilterSettings onFinish={() => setShowFilterSettings(false)} meta={meta} />}
    </>
  );
};

const ReadOnlyTable = <TData extends Record<string, unknown>>(props: ReadOnlyProps<TData>) => (
  <TableContextProvider>{<Table<TData> {...props} />}</TableContextProvider>
);

export default memo(ReadOnlyTable) as typeof ReadOnlyTable;
