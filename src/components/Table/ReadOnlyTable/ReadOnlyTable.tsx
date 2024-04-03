import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type {
  ColumnOrderState,
  GroupingState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TABLE } from 'constants/constants';
import { useDebounce } from 'hooks';
import { joinArray } from 'utilities';

import { Overlay, Spinner } from 'components';
import fuzzyFilter from 'components/Table/utilities/fuzzyFilter';

import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { TableHeaderSection } from './components/TableHeaderSection';
import { exportFile } from './exportExcelFile';
import type { TReadOnlyTable } from './ReadOnlyTable.types';

import styles from './ReadOnlyTable.module.css';

const ReadOnlyTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  defaultColumnOrder,
  fetchNextPage,
  getRowCanExpand,
  hidden,
  isInfinite,
  isLoading,
  isPivot = false,
  isReachingEnd,
  manualFiltering = false,
  manualSorting = false,
  setSize,
  showColumns,
  showFilters,
  showSorting,
  tableHeight,
  tableWrapperHeight,
  title,
  topRadius,
  visible,
  visibleRows,
}: TReadOnlyTable<TData>) => {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [columnOrder, setColumnOrder] =
    useState<ColumnOrderState>(defaultColumnOrder);

  const visibleColumns = visible?.reduce(
    (obj, item) => {
      obj[item.id] = true;
      return obj;
    },
    {} as Record<string, boolean>
  );
  const hiddenColumns = hidden?.reduce(
    (obj, item) => {
      obj[item.id] = false;
      return obj;
    },
    {} as Record<string, boolean>
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ...visibleColumns,
    ...hiddenColumns,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    aggregationFns: {
      sum: (columnId, leafRows) =>
        leafRows
          .map((row) => parseFloat(row.getValue(columnId)))
          .reduce((sum, value) => sum + value, 0),
    },
    columnResizeMode: 'onChange',
    columns,
    data,
    enableColumnResizing: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getRowCanExpand,
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: manualFiltering,
    manualSorting: manualSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    state: { columnOrder, columnVisibility, grouping, sorting },
  });

  const { rows } = table.getRowModel();

  const tableVisibleColumns = table.getVisibleLeafColumns();

  const couldPrefetch =
    !isLoading && !isReachingEnd && data.length < TABLE.prefetchLimit;

  const couldFetchOnScroll =
    !isLoading && !isReachingEnd && data.length >= TABLE.prefetchLimit;

  // const loadingText = `LOADING MORE DATA`;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 28,
    getScrollElement: () => parentRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    count: tableVisibleColumns.length,
    estimateSize: (index) => tableVisibleColumns[index].getSize(),
    getScrollElement: () => parentRef.current,
    horizontal: true,
    overscan: 1,
  });

  const onScroll = useDebounce(() => {
    if (parentRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = parentRef.current;
      const isScrollCloseToEnd =
        scrollHeight - scrollTop - clientHeight < TABLE.scrollThreshold;
      //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
      if (isInfinite && isScrollCloseToEnd && couldFetchOnScroll) {
        void setSize?.((prev: number) => prev + 1);
      }
    }
  }, 500);

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (couldPrefetch) fetchNextPage?.();
  }, [couldPrefetch, fetchNextPage, rowVirtualizer]);

  // useEffect(() => {
  //   if (
  //     visibleRows?.[0]?.id &&
  //     isPivot === true &&
  //     visibleRows?.length > 1 &&
  //     grouping.length === 0
  //   ) {
  //     const groupeVisibleRow = tableVisibleColumns.find(
  //       (tbr) => tbr.id === visibleRows?.[0]?.id
  //     );
  //     if (groupeVisibleRow?.getCanGroup()) setGrouping([visibleRows[0].id]);
  //   }
  //   // If column selected as a row, group by that column
  // }, [grouping.length, isPivot, tableVisibleColumns, visibleRows]);

  const onToggleExpandGroupedRows = useCallback(() => {
    rows.forEach((row) => {
      if (row.getCanExpand()) {
        row.toggleExpanded(collapsed);
      }
    });
    setCollapsed(!collapsed);
  }, [collapsed, rows]);

  const onClickExportToExcel = useCallback(
    () =>
      exportFile({
        columns: tableVisibleColumns,
        data,
        fileName: title ?? 'table',
      }),

    [data, tableVisibleColumns, title]
  );

  return (
    <>
      {isLoading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <section
        className={joinArray([
          styles.tableWrapper,
          tableWrapperHeight ?? styles.defaultTableWrapperHeight,
        ])}
      >
        <TableHeaderSection
          isPivot={isPivot}
          showColumns={showColumns}
          showFilters={showFilters}
          showSorting={showSorting}
          title={title}
          topRadius={topRadius}
          onClickExportToExcel={onClickExportToExcel}
          onToggleExpandGroupedRows={onToggleExpandGroupedRows}
        />
        <div
          ref={parentRef}
          className={joinArray([
            styles.virtualWrapper,
            tableHeight ?? styles.defaultTableHeight,
          ])}
          onScroll={onScroll}
        >
          <table>
            <TableHead
              headerGroups={table.getHeaderGroups()}
              parentRef={parentRef}
            />
            <TableBody
              columnVirtualizer={columnVirtualizer}
              rowVirtualizer={rowVirtualizer}
              rows={rows}
            />
          </table>
        </div>
      </section>
    </>
  );
};

export default memo(ReadOnlyTable) as typeof ReadOnlyTable;
