import type { ForwardedRef, ReactElement } from 'types';

import type { FormFieldBaseType } from '../../FormField/types';

export type FormFieldBaseProps = Omit<
  FormFieldBaseType,
  'default' | 'display' | 'normalize' | 'options' | 'rules' | 'tooltip'
> & {
  width?: number;
  helperText?: string;
  maxLength?: number;
  hasErrors?: boolean;
  children: ReactElement;
  errorMessage?: string;
  ref: ForwardedRef<unknown>;
  viewMode?: boolean;
};
