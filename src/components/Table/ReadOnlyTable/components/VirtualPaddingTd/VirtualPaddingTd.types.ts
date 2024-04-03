import type { Virtualizer } from '@tanstack/react-virtual';

export type TVirtualPaddingTdProps = {
  columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
  isLeft?: boolean;
};
