import type { FieldFilter, MetaType } from '../ReadOnlyTable_/ReadOnlyTable.types';

export type FieldsFiltersSettings = {
  filters: FieldFilter[];
  sorting: FieldFilter[];
};

export type FilterSettingsProps = {
  onFinish: () => void;
  meta?: MetaType[];
};
