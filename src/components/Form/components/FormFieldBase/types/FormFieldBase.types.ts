import type { ForwardedRef,ReactElement } from 'types';

import type { FormFieldBaseType } from '../../FormField/types';

export type FormFieldBaseProps = Omit<
  FormFieldBaseType,
  'options' | 'display' | 'default' | 'tooltip' | 'normalize' | 'rules'
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
