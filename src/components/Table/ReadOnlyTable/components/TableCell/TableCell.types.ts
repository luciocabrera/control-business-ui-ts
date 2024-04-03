import type { Cell, Row } from '@tanstack/react-table';

export type TTableCellProps<TData> = {
  cell: Cell<TData, unknown>;
  row: Row<TData>;
};
