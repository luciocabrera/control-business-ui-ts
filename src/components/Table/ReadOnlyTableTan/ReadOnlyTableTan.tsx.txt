import { memo, useRef, useState } from 'react';
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { ReadOnlyProps } from './ReadOnlyTable.types';
import { TableStyled } from './ReadOnlyTable.styled';
import Header from 'components/Header/Header';
import IconButton from 'components/IconButton/IconButton';
import { FilterIcon } from 'icons';
import { TableActionsStyled } from 'styles';
import { TableContextProvider } from 'contexts';
import FilterSettings from '../FilterSettings/FilterSettings';

const Table = <TData extends Record<string, unknown>>({
  actions,
  columns,
  data,
  height,
  showHeader = true,
  title,
  allowFiltering = true,
}: ReadOnlyProps<TData>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
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
    <>
      {showHeader && (
        <Header title={title}>
          <TableActionsStyled>
            {actions}
            {allowFiltering && (
              <IconButton id="show-filters" onClick={() => setShowFilterSettings(true)} icon={<FilterIcon />} />
            )}
          </TableActionsStyled>
        </Header>
      )}
      <TableStyled id="table-styled" ref={tableContainerRef} height={height}>
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
                            asc: <span>&#8593;</span>,
                            desc: <span>&#8595;</span>,
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
                <tr key={row.id} ref={virtualRow.measureRef}>
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
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </TableStyled>
      {showFilterSettings && <FilterSettings onFinish={() => setShowFilterSettings(false)} columns={columns} />}
    </>
  );
};

const ReadOnlyTableTan = <TData extends Record<string, unknown>>(props: ReadOnlyProps<TData>) => (
  <TableContextProvider>{<Table<TData> {...props} />}</TableContextProvider>
);

export default memo(ReadOnlyTableTan) as typeof ReadOnlyTableTan;
