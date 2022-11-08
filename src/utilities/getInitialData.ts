// types
import type { FormFieldBaseType, FormFieldGroupType, FormFieldType } from 'types';

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
      if (accessor) newData[accessor] = initialData?.[accessor] ?? newField?.value ?? '';
    }
  });
  return newData as T;
};
