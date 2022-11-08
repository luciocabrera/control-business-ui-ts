// components
import { Select, TextInput } from 'components';
// contexts
import { useFormStatusStore, useStore } from 'contexts';
// types
import type { FormFieldProps } from './FormField.types';
import type { FieldBaseValueType } from 'types';
// utilities
import { getErrorField, validateField, memo } from 'utilities';

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const [fieldValue, setStore] = useStore<FieldBaseValueType, any>((store) => store[field.accessor]);
  const [formStatus] = useFormStatusStore();
  const { submittedCounter } = formStatus;

  const errorFields = submittedCounter > 0 ? validateField(field, fieldValue) : [];
  const errorField = getErrorField(field, errorFields);

  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = event.target.options[event.target.selectedIndex]?.value;
            setStore({ [field.accessor]: selected });
            field.onSelect?.(selected);
          }}
          value={fieldValue}
          {...field}
          {...props}
          {...errorField}
        />
      );
    case 'text':
    default:
      return (
        <TextInput
          key={`field-input-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStore({ [field.accessor]: event.target.value });
          }}
          {...field}
          {...props}
          {...errorField}
          value={fieldValue}
        />
      );
  }
});

export default FormField;
