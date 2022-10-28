import type { FieldBaseValueType, FormFieldBaseType, SetFieldFromEvent, SetFieldType } from 'types';

type UseStore = <SelectorOutput>(
  selector: (store: Record<string, unknown>) => SelectorOutput,
) => [SelectorOutput, (value: Partial<Record<string, unknown>>) => void];
export type FormFieldProps = {
  useStore: UseStore;
  viewMode?: boolean;
  // value?: string | number;
  width?: number;
  field: Omit<FormFieldBaseType, 'value'> & { value?: FieldBaseValueType };
  // setField: SetFieldType;
  // setFieldFromEvent: SetFieldFromEvent;
};
