// components
import { Select, TextInput } from 'components';
// contexts
import { useFormMetaContext, useFieldsContext } from 'contexts';
// types
import type { FormFieldProps } from './FormField.types';
import type { FieldBaseValueType } from 'types';
// utilities
import { getErrorField, validateField, memo } from 'utilities';
import { useCallback } from 'react';

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const { options, type, label, accessor, readonly, placeholder, normalize, rules, textAlign, required } = field;

  const [fieldValue, setStore] = useFieldsContext<FieldBaseValueType, any>((store) => store[field.accessor]);

  const [submittedCounter] = useFormMetaContext<number>('submittedCounter');

  const errorFields = submittedCounter > 0 ? validateField(field, fieldValue) : [];
  const errorField = getErrorField(field, errorFields);

  const handleSelectOnChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.options[event.target.selectedIndex]?.value;
      setStore({ [field.accessor]: selected });
    },
    [field.accessor, setStore],
  );

  const handleTextInputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStore({ [field.accessor]: event.target.value });
    },
    [field.accessor, setStore],
  );

  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={handleSelectOnChange}
          value={fieldValue}
          accessor={accessor}
          options={options}
          label={label}
          readonly={readonly}
          required={required}
          type={type}
          {...props}
          {...errorField}
        />
      );
    case 'text':
    default:
      return (
        <TextInput
          key={`field-input-${field.accessor}`}
          onChange={handleTextInputOnChange}
          accessor={accessor}
          readonly={readonly}
          label={label}
          required={required}
          type={type}
          normalize={normalize}
          rules={rules}
          placeholder={placeholder}
          textAlign={textAlign}
          {...props}
          {...errorField}
          value={fieldValue}
        />
      );
  }
});

export default FormField;
