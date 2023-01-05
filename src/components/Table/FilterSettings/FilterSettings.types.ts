import type { ColumnDef } from 'types';
import type { FieldFilter } from '../ReadOnlyTableTan/ReadOnlyTable.types';

export type FieldsFiltersSettings = {
  filters: FieldFilter[];
  sorting: FieldFilter[];
};

export type FilterSettingsProps<TData> = {
  onFinish: () => void;
  columns: ColumnDef<TData, unknown>[];
};
