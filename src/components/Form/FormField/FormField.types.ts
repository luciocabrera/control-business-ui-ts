import type { FieldBaseValueType, FormFieldBaseType, SetFieldFromEvent, SetFieldType } from 'types';

export type FormFieldProps = {
  viewMode?: boolean;
  value?: string | number;
  width?: number;
  field: Omit<FormFieldBaseType, 'value'> & { value?: FieldBaseValueType };
  setField: SetFieldType;
  setFieldFromEvent: SetFieldFromEvent;
};
