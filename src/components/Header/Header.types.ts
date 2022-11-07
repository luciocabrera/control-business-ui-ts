import type { ReactNode, MouseEvent, ReactElement } from 'types';

export type HeaderProps = {
  icon?: ReactElement | string;
  title?: string;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
  isTable?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};
