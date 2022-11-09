import type { ButtonHTMLAttributes, MouseEvent, MouseEventHandler } from 'types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  src: string;
  inverse?: boolean;
  warning?: boolean;
  onClick?:
    | MouseEvent<HTMLButtonElement>
    | MouseEventHandler<HTMLButtonElement>
    | MouseEventHandler<HTMLImageElement>
    | (() => void);
};
