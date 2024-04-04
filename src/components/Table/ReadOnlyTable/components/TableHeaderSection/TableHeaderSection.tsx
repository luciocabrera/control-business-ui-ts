import { MainHeader } from 'components/MainHeader';

import { TableSettingsMenuButton } from '../TableSettingsMenuButton';

import type { TTableHeaderSectionProps } from './TableHeaderSection.types';

const TableHeaderSection = ({
  actions,
  isPivot,
  onClickExportToExcel,
  onToggleExpandGroupedRows,
  showColumns,
  showFilters,
  showSorting,
  showTopRadius,
  title,
}: TTableHeaderSectionProps) => (
  <MainHeader
    actions={actions}
    showTopRadius={showTopRadius}
    title={title}
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
