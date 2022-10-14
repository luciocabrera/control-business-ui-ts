import { DetailedHTMLProps } from 'react';
import type { ReactNode, MouseEvent, MouseEventHandler, ButtonHTMLAttributes } from 'types';

export type HeaderProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode | ReactNode[];
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};
