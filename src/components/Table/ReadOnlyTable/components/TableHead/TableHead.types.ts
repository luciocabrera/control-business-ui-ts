import type { ComponentPropsWithRef, RefObject } from 'react';
import type { HeaderGroup } from '@tanstack/react-table';

export type TTableHeadProps<TData> = ComponentPropsWithRef<'thead'> & {
  headerGroups: HeaderGroup<TData>[];
  showTopRadius?: boolean;
  parentRef: RefObject<HTMLDivElement | null>;
};
