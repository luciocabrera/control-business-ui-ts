import { ReactElement } from 'react';

export type TTableHeaderSectionProps = {
  actions?: ReactElement;
  isPivot?: boolean;
  onClickExportToExcel?: () => void;
  onToggleExpandGroupedRows?: () => void;
  showColumns?: boolean;
  showFilters?: boolean;
  showSorting?: boolean;
  title?: string;
  showTopRadius?: boolean;
};
