import type { RefObject } from 'react';
import type { HeaderGroup } from '@tanstack/react-table';

export type THeaderGroupProps<TData> = {
  headerGroup: HeaderGroup<TData>;
  parentRef: RefObject<HTMLDivElement | null>;
};
