// components
import FallBack from 'components/FallBack/FallBack';
// import FilterSettings from '../FilterSettings/FilterSettings';
// contexts
import { useTableContext } from 'contexts/TableContext';
// react
import { Fragment, memo, useRef, useState } from 'react';
// react table
import {
  getExpandedRowModel,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
  SortingState,
} from '@tanstack/react-table';
// hooks
import { useVirtual } from 'react-virtual';
// scss
import styles from './readOnlyTable.module.css';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
// types
import type { ReadOnlyProps } from './ReadOnlyTable.types';
import Header from 'components/Header/Header';
import { TableActionsStyled } from 'styles';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const ReadOnlyTable = <TData extends Record<string, unknown>>({
  actions,
  columns,
  height,
  renderSubComponent,
  getRowCanExpand,
  title,
  showHeader = true,
  allowFiltering,
  data,
  isLoading,
}: ReadOnlyProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    state: { columnFilters },
  } = useTableContext();

  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      sorting,
    },
    manualFiltering: true,
    // manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: parentRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <>
      {showHeader && (
        <Header title={title}>
          <TableActionsStyled>
            {actions}
            {/* {allowFiltering && (
              <IconButton id="show-filters" onClick={() => setShowFilterSettings(true)} icon={<FilterIcon />} />
            )} */}
          </TableActionsStyled>
        </Header>
      )}
      {/* <FilterSettings onFinish={() => setShowFilterSettings(false)} columns={columns} /> */}
      {isLoading && <FallBack />}
      <div id="table-wrapper" ref={parentRef} style={{ height: height }} className={styles['table-wrapper']}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} style={{ width: header.getSize(), maxWidth: header.getSize() }}>
                      {header.isPlaceholder ? null : (
                        <div onClick={header.column.getToggleSortingHandler()} className={styles['header-wrapper']}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <span>&#8593;</span>,
                            desc: <span>&#8595;</span>,
                          }[header.column.getIsSorted() as string] ?? null}

                          {/* {header.column.getIsFiltered() ? <FilterIcon className={cls['header-icon']} /> : null} */}
                        </div>
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={[
                            styles['resizer'],
                            styles[header.column.getIsResizing() ? 'isResizing' : ''],
                          ].join(' ')}
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <Fragment key={row.id}>
                  <tr key={`tr-${row.id}`} ref={virtualRow.measureRef}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={styles['simple-td']}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr key={`expandable-tr-${row.id}`}>
                      <td colSpan={row.getVisibleCells().length}>{renderSubComponent?.({ row })}</td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReadOnlyTable;
