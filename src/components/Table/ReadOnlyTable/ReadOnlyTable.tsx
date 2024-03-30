import { Fragment, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { TableContextActionKind, useTableContext } from 'contexts/TableContext';

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
  height,
  isLoading,
  renderSubComponent,
  getRowCanExpand,
  manualFiltering = false,
  manualSorting = false,
  showHeader,
  fetchMoreOnBottomReached,
  data,
}: ReadOnlyTableType<TData>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    state: { columnFilters, showColumnFilters },
    dispatch,
  } = useTableContext();

  useEffect(() => {
    dispatch({ type: TableContextActionKind.SetSorting, payload: { sorting } });
  }, [dispatch, sorting]);

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
    manualFiltering: manualFiltering,
    manualSorting: manualSorting,
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
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <>
      {isLoading && <FallBack />}
      {showColumnFilters && <FormFilter />}
      {showHeader && <TableWrapperHeader actions={actions} />}
      <div
        id='table-wrapper'
        ref={parentRef}
        style={{ height: height }}
        className={styles['table-wrapper']}
        onScroll={() => fetchMoreOnBottomReached?.(parentRef)}
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
                        <td
                          key={cell.id}
                          className={styles['simple-td']}
                          style={{ width: size, maxWidth: size }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
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
