import type { FormFieldType, ReactElement, ModalProps, MouseEventHandler, MouseEvent } from 'types';

export type FormProps<TDataType> = {
  actions?: ReactElement;
  title: string;
  icon?: string;
  initialFields: FormFieldType[];
  initialData?: TDataType;
  onAccept?: (data: TDataType) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type ModalType = ModalProps & {
  show: boolean;
};
