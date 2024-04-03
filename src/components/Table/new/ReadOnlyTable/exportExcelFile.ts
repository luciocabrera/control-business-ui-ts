import type { Column } from '@tanstack/react-table';
import * as XLSX from 'xlsx';

export type TExportFileParams<TData> = {
  columns: Column<TData, unknown>[];
  data?: TData[];
  fileName: string;
};

const createExportFile = async <TData>(
  excelExportData: TData[],
  fileName: string
) => {
  const fileExtension = 'xlsx';
  const ws = XLSX.utils.json_to_sheet(excelExportData);
  const wb = { SheetNames: ['data'], Sheets: { data: ws } };

  XLSX.writeFile(wb, `${fileName}.${fileExtension}`);
};

export const exportFile = <TData extends Record<string, unknown>>({
  columns,
  data,
  fileName,
}: TExportFileParams<TData>) => {
  const rowsToExportFromColumnsConfig =
    data?.map((row) => {
      let currentVisibleRow: Partial<TData> = {};

      columns.forEach((column) => {
        const header = column.parent
          ? column.columnDef.meta?.caption ?? column.id ?? ''
          : column.columnDef.header?.toString() ?? '';
        currentVisibleRow = {
          ...currentVisibleRow,
          [header]: row[column.id],
        };
      });

      return currentVisibleRow;
    }) ?? [];

  createExportFile(rowsToExportFromColumnsConfig, fileName);
};
