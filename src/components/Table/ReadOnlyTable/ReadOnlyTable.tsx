import { Fragment, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import type { GroupingState, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableContextActionKind, useTableContext } from 'contexts/TableContext';
import { useDebounce } from 'hooks';

import FallBack from 'components/FallBack/FallBack';

import FormFilter from '../FormFilter/FormFilter';
import type { ReadOnlyTableType } from '../table.types';
import TableHead from '../TableHead/TableHead';
import TableWrapperHeader from '../TableWrapperHeader/TableWrapperHeader';
import fuzzyFilter from '../utilities/fuzzyFilter';

import styles from '../table.module.css';

const ReadOnlyTable = <TData extends Record<string, unknown>>({
  actions,
  columns,
  data,
  getRowCanExpand,
  height,
  isInfinite,
  isLoading,
  isReachingEnd,
  manualFiltering = false,
  manualSorting = false,
  renderSubComponent,
  setSize,
  showHeader,
}: ReadOnlyTableType<TData>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const {
    dispatch,
    state: { columnFilters, showColumnFilters },
  } = useTableContext();

  useEffect(() => {
    dispatch({ payload: { sorting }, type: TableContextActionKind.SetSorting });
  }, [dispatch, sorting]);

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    data,
    enableColumnResizing: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),

    getRowCanExpand,
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: manualFiltering,
    manualSorting: manualSorting,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      grouping,
      sorting,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    overscan: 10,
    parentRef: parentRef,
    size: rows.length,
  });
  const { totalSize, virtualItems: virtualRows } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  const onScroll = useDebounce(() => {
    if (parentRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = parentRef.current;
      //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
      if (isInfinite) {
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isLoading &&
          !isReachingEnd
        ) {
          void setSize?.((prev: number) => prev + 1);
        }
      }
    }
  }, 500);

  return (
    <>
      {isLoading && <FallBack />}
      {showColumnFilters && <FormFilter />}
      {showHeader && <TableWrapperHeader actions={actions} />}
      <div
        ref={parentRef}
        className={styles['table-wrapper']}
        id='table-wrapper'
        style={{ height: height }}
        onScroll={onScroll}
      >
        <table>
          <TableHead headerGroups={table.getHeaderGroups()} />
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
                  <tr
                    key={`tr-${row.id}`}
                    ref={virtualRow.measureRef}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const size = cell
                        .getContext()
                        .table.getHeaderGroups()[0]
                        .headers.filter(
                          (header) => header.id === cell.column.id
                        )[0]
                        .getSize();
                      return (
                        // <td
                        //   key={cell.id}
                        //   className={styles['simple-td']}
                        //   style={{ maxWidth: size, width: size }}
                        // >
                        //   {flexRender(
                        //     cell.column.columnDef.cell,
                        //     cell.getContext()
                        //   )}
                        // </td>
                        <td
                          key={cell.id}
                          className={styles['simple-td']}
                          style={{
                            background: cell.getIsGrouped()
                              ? '#0aff0082'
                              : cell.getIsAggregated()
                                ? '#ffa50078'
                                : cell.getIsPlaceholder()
                                  ? '#ff000042'
                                  : 'white',
                            maxWidth: size,
                            width: size,
                          }}
                        >
                          {cell.getIsGrouped() ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <button
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                  style: {
                                    cursor: row.getCanExpand()
                                      ? 'pointer'
                                      : 'normal',
                                  },
                                }}
                              >
                                {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{' '}
                                ({row.subRows.length})
                              </button>
                            </>
                          ) : cell.getIsAggregated() ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            flexRender(
                              cell.column.columnDef.aggregatedCell ??
                                cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr key={`expandable-tr-${row.id}`}>
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent?.({ row })}
                      </td>
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
