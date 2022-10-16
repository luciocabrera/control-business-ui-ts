import type { FormFieldBaseType, ChangeEvent } from 'types';

export type TextInputProps = Omit<FormFieldBaseType, 'options' | 'display' | 'tooltip'> & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
