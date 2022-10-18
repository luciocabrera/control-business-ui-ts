import type { FormFieldType, ReactElement, ModalProps, MouseEvent, ReactNode } from 'types';

export type FormProps<TDataType> = {
  viewMode?: boolean;
  actions?: ReactElement;
  title: string;
  icon?: string;
  initialFields: FormFieldType[];
  initialData?: TDataType;
  children?: ReactNode;
  onAccept?: (data: TDataType) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type ModalType = ModalProps & {
  show: boolean;
};
