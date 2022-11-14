import type { FormFieldBaseType, ReactNode } from 'types';

import type { Column } from 'react-data-grid';
type TableFieldValueType = (Record<string, unknown> | string | number)[];
declare type Maybe<T> = T | undefined | null;
export type TableFieldProps<TData, DetailData> = Omit<
  FormFieldBaseType,
  'display' | 'default' | 'tooltip' | 'normalize' | 'rules' | 'value' | 'type'
> & {
  label?: string;
  accessor: string;
  normalize?: (value?: TableFieldValueType) => TableFieldValueType;
  data: TData[];
  showHeader?: boolean;
  columns: Column<TData, unknown>[];
  rowKeyGetter?: Maybe<(row: TData) => number>;
  renderDetail?: (onAccept: (detail: DetailData) => void, onFinish: () => void, detail?: TData) => ReactNode;
  getComparator: (sortColumn: string) => (a: TData, b: TData) => number;
};
