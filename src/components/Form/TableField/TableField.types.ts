import type { ChangeEvent, ColumnDef } from 'types';
type TableFieldValueType = (Record<string, unknown> | string | number)[];

export type TableFieldProps<TData> = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  normalize?: (value?: TableFieldValueType) => TableFieldValueType;
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
};
