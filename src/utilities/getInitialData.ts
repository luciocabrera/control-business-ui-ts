import type { FieldValueType, FormFieldBaseType, FormFieldGroupType, FormFieldType } from 'types';

export const getInitialData = <T extends Record<string, unknown>>(fields: FormFieldType[], initialData?: T) => {
  let newData: Record<string, unknown> = {} as T;
  fields?.forEach((field) => {
    if (['group', 'row'].includes(field.type)) {
      newData = {
        ...newData,
        ...getInitialData((field as FormFieldGroupType).fields || [], initialData),
      };
    } else {
      const newField = field as FormFieldBaseType;
      const { accessor } = newField;

      newData[accessor] = initialData?.[accessor] ?? newField?.value ?? '';

      // const accessor = (field as FormFieldBaseType).accessor;
      // newData[accessor] = '';
      // newData[accessor] = initialData?.[accessor as keyof T] ?? (field as FormFieldBaseType)?.value ?? '';
    }
  });
  return newData as T;
};

const evaluateValue = (value: FieldValueType | (() => void)) => (typeof value === 'function' ? value() : value);
