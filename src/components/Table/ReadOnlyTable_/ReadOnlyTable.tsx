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
import { memo, useEffect, useMemo, useReducer, useRef, useState } from 'react';
// styles
import { TableStyled } from './ReadOnlyTable.styled';
import { TableActionsStyled } from 'styles';
// types
import type { SortColumn } from 'types';
import type { ReadOnlyProps } from './ReadOnlyTable.types';
import { useElementSize } from 'hooks';

// TODO Implement later
// const isAtBottom = ({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean =>
//   currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;

const Table = <TData extends Record<string, unknown>>({
  actions,
  columns,
  columnsConcise,
  data,
  height,
  width,
  title,
  showHeader = true,
  allowFiltering = true,
  meta,
  icon,
  rowHeight = 30,
  onRowsChange,
  rowKeyGetter,
  getComparator,
}: ReadOnlyProps<TData>) => {
  const [rows, setRows] = useState(data);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);
  const [usingConcise, setUsingConcise] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const { clientWidth } = useElementSize(divRef);

  const rerender = useReducer(() => ({}), {})[1];

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    console.log('clientWidth', clientWidth);
    if (!clientWidth) return;
    if (clientWidth <= 700 && !usingConcise) {
      setUsingConcise(true);
    } else {
      if (clientWidth > 700 && usingConcise) setUsingConcise(false);
    }
  }, [clientWidth, usingConcise]);

  console.log('(clientWidth || 0) / columns.length', (clientWidth || 0) / columns.length);
  // debugger;

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
  // const rc = useMemo(
  //   () => columns.map((c) => ({ ...c, width: Math.floor((clientWidth || 0) / columns.length) })),
  //   [clientWidth, columns],
  // );
  // const rc = useMemo(() => columns.map((c) => c.formatter), [columns]);
  // const rc = columns.map((c) => ({ ...c, width: 'max-content' }));
  const gridElement = (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={!usingConcise ? columns : columnsConcise || columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      rowHeight={!usingConcise ? rowHeight : 300}
      onRowsChange={(da, th) => onRowsChange?.(da, th, setRows)}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
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
            <IconButton onClick={rerender} icon={<FilterIcon />} />
          </TableActionsStyled>
        </Header>
      )}
      <TableStyled ref={divRef} id={'table-styled'} height={height} width={width}>
        {gridElement}
      </TableStyled>
      {showFilterSettings && <FilterSettings onFinish={() => setShowFilterSettings(false)} meta={meta} />}
    </>
  );
};

const ReadOnlyTable = <TData extends Record<string, unknown>>(props: ReadOnlyProps<TData>) => (
  <TableContextProvider>{<Table<TData> {...props} />}</TableContextProvider>
);

export default memo(ReadOnlyTable) as typeof ReadOnlyTable;
