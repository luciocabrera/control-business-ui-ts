import type { FormFieldBaseType, SetFieldFromEvent, SetFieldType } from 'types';

export type FormFieldProps = {
  value?: string | number;
  width?: number;
  field: FormFieldBaseType;
  setField: SetFieldType;
  setFieldFromEvent: SetFieldFromEvent;
};
