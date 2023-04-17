import type {
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from 'types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  children: ReactNode;
  inverse?: boolean;
  warning?: boolean;
  onClick: MouseEvent<HTMLButtonElement> | MouseEventHandler<HTMLButtonElement>;
};
