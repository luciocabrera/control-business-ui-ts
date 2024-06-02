import { ComponentPropsWithRef } from 'react';
import type { FormFieldBaseType } from '../../FormField/types';

export type SelectProps = Omit<ComponentPropsWithRef<'select'>, 'required'> &
  Omit<
    FormFieldBaseType,
    'display' | 'default' | 'tooltip' | 'normalize' | 'rules' | 'value'
  > & {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean | ((p: unknown) => boolean) | undefined;
    value?: string | number;
  };
