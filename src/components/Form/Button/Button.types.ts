import type { ButtonHTMLAttributes, ReactNode } from 'types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  children: ReactNode;
  inverse?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
