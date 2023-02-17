import type { ChangeEvent } from 'types';
import type { FieldBaseValueType, FormFieldBaseType } from '../../FormField/types';

export type TextInputProps = Omit<FormFieldBaseType, 'options' | 'display' | 'tooltip' | 'value'> & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  textAlign?: string;
  value?: FieldBaseValueType;
};
