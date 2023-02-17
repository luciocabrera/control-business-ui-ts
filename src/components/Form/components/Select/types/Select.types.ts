import type { FormFieldBaseType } from '../../FormField/types';

export type SelectProps = Omit<
  FormFieldBaseType,
  'display' | 'default' | 'tooltip' | 'normalize' | 'rules' | 'value'
> & {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
};
