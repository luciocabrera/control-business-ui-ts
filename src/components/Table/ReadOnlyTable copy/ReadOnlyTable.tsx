// hooks
import { useReactTable } from 'hooks';
// react
import { memo, useRef, useState } from 'react';
// styles
import { TableStyled } from '../Table.styled';
// types
import type { ColumnDef, SortingState } from 'types';
// utilities
import { getSortedRowModel, flexRender, getCoreRowModel } from 'utilities';

import { useVirtual } from 'react-virtual';

type ReadOnlyProps<TData> = {
  useRadius?: boolean;
  height?: string;
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  fetchMoreOnBottomReached?: (target: HTMLDivElement) => void;
};

const ReadOnlyTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  height,
  useRadius,
  fetchMoreOnBottomReached,
}: ReadOnlyProps<TData>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const { rows } = table.getRowModel();

  //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <TableStyled
      data-testid="data-table"
      ref={tableContainerRef}
      height={height}
      useRadius={useRadius}
      onScroll={(e) => {
        console.log('is scrolling ', { paddingTop, paddingBottom, virtualRows, totalSize });
        fetchMoreOnBottomReached?.(e.target as HTMLDivElement);
      }}
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <span>&#8593;</span>, //' 🔼',
                          desc: <span>&#8595;</span>, //' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                      }}
                    />
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </TableStyled>
  );
};

export default memo(ReadOnlyTable) as typeof ReadOnlyTable;
