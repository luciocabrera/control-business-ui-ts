import type { ChangeEvent, ColumnDef, FormFieldBaseType, ReactNode, SetFieldType } from 'types';
type TableFieldValueType = (Record<string, unknown> | string | number)[];

export type TableFieldProps<TData, DetailData> = Omit<
  FormFieldBaseType,
  'display' | 'default' | 'tooltip' | 'normalize' | 'rules' | 'value' | 'type'
> & {
  label?: string;
  accessor: string;
  normalize?: (value?: TableFieldValueType) => TableFieldValueType;
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  setField?: SetFieldType;
  renderDetail?: (onAccept: (detail: DetailData) => void, onFinish: () => void, detail?: TData) => ReactNode;
};
