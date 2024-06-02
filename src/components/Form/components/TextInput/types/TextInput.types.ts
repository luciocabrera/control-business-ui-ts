import type { ChangeEvent } from 'types';

import type {
  FieldBaseValueType,
  FormFieldBaseType,
} from '../../FormField/types';
import { ComponentPropsWithRef } from 'react';

export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'required'> &
  Omit<FormFieldBaseType, 'display' | 'options' | 'tooltip' | 'value'> & {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    textAlign?: string;
    value?: FieldBaseValueType;
  };
