import type { ReactElement } from 'types';

import type { FormFieldBaseType } from '../../FormField/types';

export type FormFieldBaseProps = Omit<
  FormFieldBaseType,
  'default' | 'display' | 'normalize' | 'options' | 'rules' | 'tooltip'
> & {
  width?: number | string;
  helperText?: string;
  maxLength?: number;
  hasErrors?: boolean;
  children: ReactElement;
  errorMessage?: string;
  viewMode?: boolean;
};
