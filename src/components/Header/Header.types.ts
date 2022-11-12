import type { ReactNode, MouseEvent, ReactElement } from 'types';

export type HeaderProps = {
  icon?: ReactElement | string;
  title?: ReactNode;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
  isTable?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};
