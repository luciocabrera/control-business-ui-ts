import type { FieldBaseValueType, FormFieldBaseType } from 'types';

export type FormFieldProps = {
  viewMode?: boolean;
  width?: number;
  field: Omit<FormFieldBaseType, 'value'> & { value?: FieldBaseValueType };
};
