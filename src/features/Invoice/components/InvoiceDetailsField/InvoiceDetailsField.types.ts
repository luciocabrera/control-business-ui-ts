import type { InvoicesDetails } from 'types';

import type { FormFieldBaseType } from 'components/Form/components/FormField/types';

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
