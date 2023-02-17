import type { ReactElement, ModalProps, MouseEvent, ReactNode } from 'types';

export type FormBaseProps<TData> = {
  width?: string;
  height?: string;
  onAccept?: (data: TData) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type FormProps<TData> = FormBaseProps<TData> & {
  viewMode?: boolean;
  actions?: ReactElement;
  title: string;
  icon?: ReactElement | string;
  children?: ReactNode;
};

export type ModalType = ModalProps & {
  show: boolean;
};
