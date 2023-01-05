import type { ReactElement, MouseEvent, ColumnDef } from 'types';
import type { FieldFilter } from '../ReadOnlyTableTan/ReadOnlyTable.types';

export type FormBaseProps = {
  initialFields?: FieldFilter[];
  onAccept?: (data: FieldFilter) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type FormProps<TData> = FormBaseProps & {
  title: string;
  icon?: ReactElement | string;
  columns: ColumnDef<TData, unknown>[];
};
