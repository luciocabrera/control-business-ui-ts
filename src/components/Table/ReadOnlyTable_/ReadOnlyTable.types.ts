import { RowsChangeData } from 'react-data-grid';
import type { ReactElement, ReactNode, Column, Maybe, RowHeightArgs } from 'types';

export type MetaType = {
  accessor: string;
  label: string;
  type?: string;
};

export type FieldFilter = { accessor: string; label: string; condition: string; value: string | number };

export type ReadOnlyProps<TData> = {
  actions?: ReactElement;
  showHeader?: boolean;
  allowFiltering?: boolean;
  allowSorting?: boolean;
  useRadius?: boolean;
  height?: string;
  data: TData[];
  title?: ReactNode;
  columns: readonly Column<TData, unknown>[];
  meta?: MetaType[];
  icon?: ReactElement | string;
  rowHeight?: Maybe<number | ((args: RowHeightArgs<TData>) => number)>;
  onRowsChange?: Maybe<(rows: TData[], data: RowsChangeData<TData, unknown>, setRows: (rows: TData[]) => void) => void>;
  fetchMoreOnBottomReached?: (target: HTMLDivElement) => void;
  rowKeyGetter?: Maybe<(row: TData) => number>;
  getComparator: (sortColumn: string) => (a: TData, b: TData) => number;
};
