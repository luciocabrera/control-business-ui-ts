import type { ComponentPropsWithRef, RefObject } from 'react';
import type { HeaderGroup } from '@tanstack/react-table';

export type THeaderGroupProps<TData> = ComponentPropsWithRef<'tr'> & {
  headerGroup: HeaderGroup<TData>;
  parentRef: RefObject<HTMLDivElement | null>;
};
