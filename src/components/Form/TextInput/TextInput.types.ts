import type { FormFieldBaseType, ChangeEvent, FieldBaseValueType } from 'types';

export type TextInputProps = Omit<FormFieldBaseType, 'options' | 'display' | 'tooltip' | 'value' | 'normalize'> & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  normalize?: (value?: FieldBaseValueType) => string;
  value?: FieldBaseValueType;
};
