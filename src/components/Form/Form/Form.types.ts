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
  icon?: string;
  children?: ReactNode;
};

export type ModalType = ModalProps & {
  show: boolean;
};
// useStore: <SelectorOutput>(
//   selector: (store: Record<string, unknown>) => SelectorOutput,
// ) => [SelectorOutput, (value: Record<string, unknown>) => void];
