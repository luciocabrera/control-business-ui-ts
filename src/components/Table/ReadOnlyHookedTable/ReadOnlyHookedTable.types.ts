import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ValidDataHookResponse } from 'hooks';
import type { ReactElement, ReactNode } from 'types';

export type MetaType = {
  accessor: string;
  label: string;
  type?: string;
};

export type ReadOnlyProps<TData> = {
  actions?: ReactElement;
  showHeader?: boolean;
  allowFiltering?: boolean;
  allowSorting?: boolean;
  height?: string;
  title?: ReactNode;
  dataHook: ValidDataHookResponse<TData>;
  columns: ColumnDef<TData, unknown>[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
};
