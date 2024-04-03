import type { Cell } from '@tanstack/react-table';

export const getTdSize = <TData>(cell: Cell<TData, unknown>) => {
  const headerGroups = cell.getContext().table.getHeaderGroups();
  let size;

  headerGroups.forEach((headerGroup) => {
    size = headerGroup.headers
      .filter((header) => header.id === cell.column.id)[0]
      ?.getSize();

    if (size > 0) return;
  });

  return size;
};
