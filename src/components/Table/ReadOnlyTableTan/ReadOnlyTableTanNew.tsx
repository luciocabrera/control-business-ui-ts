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

import { elementScroll, useVirtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { ReadOnlyProps } from './ReadOnlyTable.types';
import { TableStyled } from './ReadOnlyTable.styled';

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

// const fetchSize = 25;
const ReadOnlyTableTanNew = <TData extends Record<string, unknown>>({
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

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const parentRef = React.useRef<HTMLDivElement>();
  const scrollingRef = React.useRef<number>();

  const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = React.useCallback((offset, canSmooth, instance) => {
    const duration = 1000;
    const start = parentRef?.current?.scrollTop || 0;
    const startTime = (scrollingRef.current = Date.now());

    const run = () => {
      if (scrollingRef.current !== startTime) return;
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
      const interpolated = start + (offset - start) * progress;

      if (elapsed < duration) {
        elementScroll(interpolated, canSmooth, instance);
        requestAnimationFrame(run);
      } else {
        elementScroll(interpolated, canSmooth, instance);
      }
    };

    requestAnimationFrame(run);
  }, []);
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

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
    scrollToFn,
  });

  return (
    <TableStyled
      //@ts-ignore
      ref={parentRef}
      height={height}
    >
      <table
      // style={{
      //   height: `${rowVirtualizer.getTotalSize()}px`,
      //   width: '100%',
      //   position: 'relative',
      // }}
      >
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
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            // <div
            //   key={virtualRow.index}
            //   className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
            //   style={{
            //     position: 'absolute',
            //     top: 0,
            //     left: 0,
            //     width: '100%',
            //     height: `${virtualRow.size}px`,
            //     transform: `translateY(${virtualRow.start}px)`,
            //   }}
            // >
            //   Row {virtualRow.index}
            // </div>

            const row = rows[virtualRow.index];
            return (
              <tr
                key={virtualRow.index}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize(), height: `${virtualRow.size}px` }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyled>
  );

  // style={{
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: `${virtualRow.size}px`,
  //   transform: `translateY(${virtualRow.start}px)`,
  // }}

  // return (
  //   <TableStyled ref={parentRef} height={height}>
  //     <table>
  //       <thead>
  //         {table.getHeaderGroups().map((headerGroup) => (
  //           <tr key={headerGroup.id}>
  //             {headerGroup.headers.map((header) => {
  //               return (
  //                 <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
  //                   {header.isPlaceholder ? null : (
  //                     <div
  //                       {...{
  //                         className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
  //                         onClick: header.column.getToggleSortingHandler(),
  //                       }}
  //                     >
  //                       {flexRender(header.column.columnDef.header, header.getContext())}
  //                       {{
  //                         asc: ' 🔼',
  //                         desc: ' 🔽',
  //                       }[header.column.getIsSorted() as string] ?? null}
  //                     </div>
  //                   )}
  //                   <div
  //                     {...{
  //                       onMouseDown: header.getResizeHandler(),
  //                       onTouchStart: header.getResizeHandler(),
  //                       className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
  //                     }}
  //                   />
  //                 </th>
  //               );
  //             })}
  //           </tr>
  //         ))}
  //       </thead>
  //       {/* <thead>
  //         {table.getHeaderGroups().map((headerGroup) => (
  //           <tr key={headerGroup.id}>
  //             {headerGroup.headers.map((header) => {
  //               return (
  //                 <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
  //                   {header.isPlaceholder ? null : (
  //                     <div
  //                       {...{
  //                         className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
  //                         onClick: header.column.getToggleSortingHandler(),
  //                       }}
  //                     >
  //                       {flexRender(header.column.columnDef.header, header.getContext())}
  //                       {{
  //                         asc: <span>&#8593;</span>, //' 🔼',
  //                         desc: <span>&#8595;</span>, //' 🔽',
  //                       }[header.column.getIsSorted() as string] ?? null}
  //                     </div>
  //                   )}
  //                   <div
  //                     {...{
  //                       onMouseDown: header.getResizeHandler(),
  //                       onTouchStart: header.getResizeHandler(),
  //                       className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
  //                     }}
  //                   />
  //                 </th>
  //               );
  //             })}
  //           </tr>
  //         ))}
  //       </thead> */}
  //       <tbody>
  //         {paddingTop > 0 && (
  //           <tr>
  //             <td style={{ height: `${paddingTop}px` }} />
  //           </tr>
  //         )}
  //         {virtualRows.map((virtualRow) => {
  //           const row = rows[virtualRow.index];
  //           return (
  //             <tr key={row.id} ref={virtualRow.measureRef}>
  //               {row.getVisibleCells().map((cell) => {
  //                 return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
  //               })}
  //             </tr>
  //           );
  //         })}
  //         {paddingBottom > 0 && (
  //           <tr>
  //             <td style={{ height: `${paddingBottom}px` }} />
  //           </tr>
  //         )}
  //       </tbody>
  //       {/* <tfoot>
  //         {table.getFooterGroups().map((footerGroup) => (
  //           <tr key={footerGroup.id}>
  //             {footerGroup.headers.map((header) => (
  //               <th key={header.id}>
  //                 {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
  //               </th>
  //             ))}
  //           </tr>
  //         ))}
  //       </tfoot> */}
  //     </table>
  //   </TableStyled>
  // );
};
export default memo(ReadOnlyTableTanNew) as typeof ReadOnlyTableTanNew;
