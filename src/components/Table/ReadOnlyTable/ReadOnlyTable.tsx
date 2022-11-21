import React, { memo } from 'react';

//3 TanStack Libraries!!!
import {
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtual } from 'react-virtual';
import { ReadOnlyProps } from './ReadOnlyTable.types';
import { TableStyled } from './ReadOnlyTable.styled';

// const fetchSize = 25;
const ReadOnlyTable = <TData extends Record<string, unknown>>({
  // actions,
  columns,
  data,
  height,
}: //,
// title,
// showHeader = true,
// allowFiltering = true,
// meta,
// icon,
// rowKeyGetter,
// getComparator,
ReadOnlyProps<TData>) => {
  // const rerender = React.useReducer(() => ({}), {})[1];

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  // const calculatedColumns = React.useMemo<ColumnDef<TData>[]>(
  //   () => columns.map((col) => ({ accessorKey: col.key, header: col.name, cell: <col className="" /> })) as ColumnDef<TData>[],
  //   [columns],
  // );

  // //react-query has an useInfiniteQuery hook just for this situation!
  // const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<PersonApiResponse>(
  //   ['table-data', sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
  //   async ({ pageParam = 0 }) => {
  //     const start = pageParam * fetchSize;
  //     const fetchedData = fetchData(start, fetchSize, sorting); //pretend api call
  //     return fetchedData;
  //   },
  //   {
  //     getNextPageParam: (_lastGroup, groups) => groups.length,
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   },
  // );

  //we must flatten the array of arrays from the useInfiniteQuery hook
  // const flatData = React.useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
  // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  // const totalFetched = flatData.length;

  // //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  // const fetchMoreOnBottomReached = React.useCallback(
  //   (containerRefElement?: HTMLDivElement | null) => {
  //     if (containerRefElement) {
  //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
  //       //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
  //       if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && totalFetched < totalDBRowCount) {
  //         fetchNextPage();
  //       }
  //     }
  //   },
  //   [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  // );

  // //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  // React.useEffect(() => {
  //   fetchMoreOnBottomReached(tableContainerRef.current);
  // }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: data,
    //@ts-ignore
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const { rows } = table.getRowModel();

  console.log('data', data);
  console.log('rows', rows);

  //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  console.log('rototalSizews', totalSize);
  console.log('virtualRows', virtualRows);
  // if (isLoading) {
  //   return <>Loading...</>;
  // } /* onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}

  return (
    <TableStyled ref={tableContainerRef} height={height}>
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
                          asc: ' 🔼',
                          desc: ' 🔽',
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
        {/* <thead>
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
        </thead> */}
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
