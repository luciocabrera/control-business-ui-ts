import type { ColumnDef, Row } from '@tanstack/react-table';

export type TColumnConfigBase = { id: string; label: string };

export type TReadOnlyTable<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  defaultColumnOrder: string[];
  fetchNextPage?: () => void;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  hidden: TColumnConfigBase[];
  manualFiltering?: boolean;
  manualSorting?: boolean;
  isInfinite?: boolean;
  isReachingEnd?: boolean;
  isLoading: boolean;
  isPivot?: boolean;
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<TData[][] | undefined>;
  showColumns?: boolean;
  showFilters?: boolean;
  showSorting?: boolean;
  tableHeight?: string;
  tableWrapperHeight?: string;
  title?: string;
  topRadius?: boolean;
  visible: TColumnConfigBase[];
  visibleRows?: TColumnConfigBase[];
};

export type TColumnsObject<TData> = Record<
  string,
  Partial<ColumnDef<TData, unknown>>
>;
