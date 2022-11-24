import type { ReactElement, ReactNode, ColumnDef } from 'types';

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
  columns: ColumnDef<TData, unknown>[];
  icon?: ReactElement | string;
  fetchMoreOnBottomReached?: (target: HTMLDivElement) => void;
};
