import { ComponentPropsWithRef } from 'react';

import type { FormFieldBaseType } from '../../FormField/types';

export type SelectProps = Omit<
    FormFieldBaseType,
    'default' | 'display' | 'normalize' | 'rules' | 'tooltip' | 'value'
  > & Omit<ComponentPropsWithRef<'select'>, 'required'> & {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean | ((p: unknown) => boolean) | undefined;
    value?: number | string;
  };
