import type { FormFieldBaseType, InvoicesDetails } from 'types';

export type InvoiceDetailsFieldProps = Omit<
  FormFieldBaseType,
  | 'display'
  | 'default'
  | 'tooltip'
  | 'normalize'
  | 'rules'
  | 'value'
  | 'type'
  | 'label'
  | 'accessor'
  | 'data'
  | 'columns'
> & {
  normalize?: (value?: InvoicesDetails[]) => InvoicesDetails[];
};
