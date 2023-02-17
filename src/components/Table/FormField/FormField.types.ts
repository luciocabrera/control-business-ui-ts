import type { FieldBaseValueType, FormFieldBaseType } from 'components/Form/components/FormField/types';

export type FormFieldProps = {
  viewMode?: boolean;
  width?: number;
  field: Omit<FormFieldBaseType, 'value'> & { value?: FieldBaseValueType };
};
