import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ValidDataHookResponse } from 'hooks';
import type { RefObject } from 'react';
import type { ReactElement } from 'types';

export type MetaType = {
  accessor: string;
  label: string;
  type?: string;
};

type TableCore<TData> = {
  actions?: ReactElement;
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  height?: string;
};

export type ReadOnlyTableType<TData> = TableCore<TData> & {
  manualFiltering?: boolean;
  manualSorting?: boolean;
  isLoading: boolean;
  showHeader: boolean;
  fetchMoreOnBottomReached?: (childRef: RefObject<HTMLDivElement>) => () => void;
};

export type TableBaseType<TData> = TableCore<TData> & {
  showHeader?: boolean;
};

export type TableWithDataHook<TData> = Omit<TableBaseType<TData>, 'data'> & {
  dataHook: ValidDataHookResponse<TData>;
};

export type TableWithRawData<TData> = TableBaseType<TData>;
