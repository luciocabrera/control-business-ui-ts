// components
import { Header, IconButton, DataGrid } from 'components';
// css
import 'react-data-grid/lib/styles.css';
// react
import { memo, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
// styles
import { TableStyled } from '../Table.styled';
// types
import type { Column, SortColumn } from 'types';

type Maybe<T> = T | undefined | null;

type ReadOnlyProps<TData> = {
  actions?: ReactElement;
  showHeader?: boolean;
  useRadius?: boolean;
  height?: string;
  data: TData[];
  title?: ReactNode;
  columns: readonly Column<TData, unknown>[];
  fetchMoreOnBottomReached?: (target: HTMLDivElement) => void;
  rowKeyGetter?: Maybe<(row: TData) => number>;
  getComparator: (sortColumn: string) => (a: TData, b: TData) => number;
};

function isAtBottom({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean {
  return currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;
}

const ReadOnlyTable = <TData extends Record<string, unknown>>({
  actions,
  columns,
  data,
  height,
  useRadius,
  title,
  showHeader = true,
  rowKeyGetter,
  getComparator,
}: ReadOnlyProps<TData>) => {
  // const tableContainerRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(data);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRows(data);
  }, [data]);

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (isLoading || !isAtBottom(event)) return;

    console.log('should load more data');
    setIsLoading(true);

    // const newRows = await loadMoreRows(50, rows.length);

    // setRows([...rows, ...newRows]);
    setIsLoading(false);
  }

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
      rowClass={(row) => 'grid-row'}
      // topSummaryRows={summaryRows}
      // bottomSummaryRows={summaryRows}
      className="fill-grid"
    />
  );

  return (
    <>
      {showHeader && (
        <Header title={title} isTable>
          {actions}
          {/* <ExportButton onExport={() => exportToCsv(gridElement, `${title}.csv`)}>
          <CsvIcon />
        </ExportButton>
        <ExportButton onExport={() => exportToXlsx(gridElement, `${title}.xlsx`)}>
          <ExcelIcon />
        </ExportButton>
        <ExportButton onExport={() => exportToPdf(gridElement, `${title}.pdf`)}>
          <PdfIcon />
        </ExportButton> */}
        </Header>
      )}
      <TableStyled height={height}>
        {gridElement}
        {isLoading && <div className={'loadMoreRowsClassname'}>Loading more rows...</div>}
      </TableStyled>
    </>
  );
};
// function ExportButton({ onExport, children }: { onExport: () => Promise<unknown>; children: ReactElement }) {
//   const [exporting, setExporting] = useState(false);
//   return (
//     <IconButton
//       type="button"
//       disabled={exporting}
//       onClick={async () => {
//         console.log('exporting');
//         setExporting(true);
//         await onExport();
//         setExporting(false);
//       }}
//       icon={children}
//     />
//   );
// }

export default memo(ReadOnlyTable) as typeof ReadOnlyTable;
