import type { Row } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

export type TTableBodyProps<TData> = {
  columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  rows: Row<TData>[];
};
