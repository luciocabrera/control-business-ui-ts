import type { ReactElement, ReactNode, Column, Maybe } from 'types';

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
  fetchMoreOnBottomReached?: (target: HTMLDivElement) => void;
  rowKeyGetter?: Maybe<(row: TData) => number>;
  getComparator: (sortColumn: string) => (a: TData, b: TData) => number;
};
