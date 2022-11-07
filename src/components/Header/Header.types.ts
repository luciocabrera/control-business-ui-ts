import type { ReactNode, MouseEvent } from 'types';

export type HeaderProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
  isTable?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};
