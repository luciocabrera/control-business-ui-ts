import type { FormFieldType, ReactElement, ModalProps, MouseEvent, ReactNode } from 'types';

export type FormBaseProps<TDataType> = {
  initialFields: FormFieldType[];
  initialData?: TDataType;
  onAccept?: (data: TDataType) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type FormProps<TDataType> = FormBaseProps<TDataType> & {
  viewMode?: boolean;
  actions?: ReactElement;
  title: string;
  icon?: ReactElement | string;
  children?: ReactNode;
};

export type ModalType = ModalProps & {
  show: boolean;
};
