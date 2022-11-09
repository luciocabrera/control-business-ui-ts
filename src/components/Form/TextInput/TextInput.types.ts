import type { FormFieldBaseType, ChangeEvent, FieldBaseValueType } from 'types';

export type TextInputProps = Omit<FormFieldBaseType, 'options' | 'display' | 'tooltip' | 'value'> & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  textAlign?: string;
  value?: FieldBaseValueType;
};
