import type { ChangeEvent } from 'types';

import type {
  FieldBaseValueType,
  FormFieldBaseType,
} from '../../FormField/types';
import { ComponentPropsWithRef } from 'react';

export type TextInputProps = ComponentPropsWithRef<'input'> &
  Omit<FormFieldBaseType, 'display' | 'options' | 'tooltip' | 'value'> & {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    textAlign?: string;
    value?: FieldBaseValueType;
  };
