import { MainHeader } from 'components/MainHeader';

import { TableSettingsMenuButton } from '../TableSettingsMenuButton';

import type { TTableHeaderSectionProps } from './TableHeaderSection.types';

const TableHeaderSection = ({
  isPivot,
  onClickExportToExcel,
  onToggleExpandGroupedRows,
  showColumns,
  showFilters,
  showSorting,
  title,
  topRadius,
}: TTableHeaderSectionProps) => (
  <MainHeader
    title={title}
    topRadius={topRadius}
  >
    <TableSettingsMenuButton
      isPivot={isPivot}
      showColumns={showColumns}
      showFilters={showFilters}
      showSorting={showSorting}
      onClickExportToExcel={onClickExportToExcel}
      onToggleExpandGroupedRows={onToggleExpandGroupedRows}
    />
  </MainHeader>
);

export default TableHeaderSection;
