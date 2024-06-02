import type { RefObject } from 'react';
import type { HeaderGroup } from '@tanstack/react-table';

export type TTableHeadProps<TData> = {
  headerGroups: HeaderGroup<TData>[];
  parentRef: RefObject<HTMLDivElement | null>;
  showTopRadius?: boolean;
};
