import type { Cell, Row } from '@tanstack/react-table';

export type TButtonGroupedProps<TData> = {
  cell: Cell<TData, unknown>;
  row: Row<TData>;
};
