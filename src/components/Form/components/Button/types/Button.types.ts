import type {
  ButtonHTMLAttributes,
  ReactNode,
  MouseEvent,
  MouseEventHandler
} from 'types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  children: ReactNode;
  inverse?: boolean;
  warning?: boolean;
  onClick: MouseEvent<HTMLButtonElement> | MouseEventHandler<HTMLButtonElement>;
};
