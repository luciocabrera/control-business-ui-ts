import type { InvoicesDetails } from 'types';

import type { FormFieldBaseType } from 'components/Form/components/FormField/types';

export type InvoiceDetailsFieldProps = Omit<
  FormFieldBaseType,
  | 'accessor'
  | 'columns'
  | 'data'
  | 'default'
  | 'display'
  | 'label'
  | 'normalize'
  | 'rules'
  | 'tooltip'
  | 'type'
  | 'value'
> & {
  normalize?: (value?: InvoicesDetails[]) => InvoicesDetails[];
};
