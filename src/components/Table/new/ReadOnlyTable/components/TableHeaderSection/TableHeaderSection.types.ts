export type TTableHeaderSectionProps = {
  isPivot?: boolean;
  onClickExportToExcel?: () => void;
  onToggleExpandGroupedRows?: () => void;
  showColumns?: boolean;
  showFilters?: boolean;
  showSorting?: boolean;
  title?: string;
  topRadius?: boolean;
};
