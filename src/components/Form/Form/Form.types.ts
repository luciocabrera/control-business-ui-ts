import type { FormFieldType, ReactElement, ModalProps } from 'types';

export type FormProps<TDataType> = {
  actions?: ReactElement;
  title: string;
  icon?: string;
  initialFields: FormFieldType[];
  initialData?: TDataType;
  onAccept: (data: TDataType) => void;
  onFinish: () => void;
};

export type ModalType = ModalProps & {
  show: boolean;
};
