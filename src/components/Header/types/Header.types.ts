import type { MouseEvent, ReactElement,ReactNode } from 'types';

export type HeaderProps = {
  icon?: ReactElement | string;
  title?: ReactNode;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};
