import type {
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from 'types';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  src?: string;
  title?: string;
  icon?: ReactElement;
  inverse?: boolean;
  disabled?: boolean;
  warning?: boolean;
  onClick?:
    | MouseEvent<HTMLButtonElement>
    | MouseEventHandler<HTMLButtonElement>
    | MouseEventHandler<HTMLImageElement>
    | (() => void);
};
