import type { ReactNode, ColumnDef } from 'types';
import type { FormFieldBaseType } from '../../FormField/types';
type TableFieldValueType = (Record<string, unknown> | string | number)[];

export type TableFieldProps<TData, DetailData> = Omit<
  FormFieldBaseType,
  'display' | 'default' | 'tooltip' | 'normalize' | 'rules' | 'value' | 'type'
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
