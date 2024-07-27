import type { ColumnDef, ReactNode } from 'types';

import type { FormFieldBaseType } from '../../FormField/types';
type TableFieldValueType = (Record<string, unknown> | number | string)[];

export type TableFieldProps<TData, DetailData> = Omit<
  FormFieldBaseType,
  'default' | 'display' | 'normalize' | 'rules' | 'tooltip' | 'type' | 'value'
> & {
  label?: string;
  accessor: string;
  normalize?: (value?: TableFieldValueType) => TableFieldValueType;
  data: TData[];
  showHeader?: boolean;
  columns: ColumnDef<TData, unknown>[];
  renderDetail?: (
    onAccept: (detail: DetailData) => void,
    onFinish: () => void,
    detail?: TData
  ) => ReactNode;
};
