import type { ColumnDef, Row } from '@tanstack/react-table';
import type { UseApiDataListResponse, UseApiInfiniteDataResponse } from 'hooks';
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
  isInfinite?: boolean;
  isLoading: boolean;
  isReachingEnd?: boolean;
  showHeader: boolean;
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<TData[][] | undefined>;
};

export type TableBaseType<TData> = TableCore<TData> & {
  showHeader?: boolean;
};

export type TableWithDataHook<TData> = Omit<TableBaseType<TData>, 'data'> & {
  dataHook:
    | UseApiDataListResponse<TData[]>
    | UseApiInfiniteDataResponse<TData[]>;
};

export type TableWithRawData<TData> = TableBaseType<TData>;
