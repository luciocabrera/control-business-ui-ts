import type { FormFieldBaseType } from 'types';

export type SelectProps = Omit<FormFieldBaseType, 'display' | 'default' | 'tooltip' | 'normalize' | 'rules'> & {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
