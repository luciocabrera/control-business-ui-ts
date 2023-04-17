// components
import { useCallback } from 'react';
// utilities
import { memo } from 'utilities';

import {
  type FormMetaType,
  useFieldsContext,
  useFormMetaContext,
} from 'components/Form/contexts';
import { getErrorField, validateField } from 'components/Form/utilities';

import { Select } from '../Select';
import { TextInput } from '../TextInput';

// contexts
// types
import type { FieldBaseValueType, FormFieldProps } from './types';

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const {
    options,
    type,
    label,
    accessor,
    readonly,
    placeholder,
    normalize,
    rules,
    textAlign,
    required,
  } = field;

  const [fieldValue, setStore] = useFieldsContext<
    FieldBaseValueType,
    Record<string, unknown>
  >((store) => store[field.accessor] as FieldBaseValueType);

  const [submittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<Record<string, unknown>>, 'submittedCounter'>
  >((store) => store.submittedCounter);

  const errorFields =
    submittedCounter > 0 ? validateField(field, fieldValue) : [];
  const errorField = getErrorField(field, errorFields);

  const handleSelectOnChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.options[event.target.selectedIndex]?.value;
      setStore({ [field.accessor]: selected });
    },
    [field.accessor, setStore]
  );

  const handleTextInputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStore({ [field.accessor]: event.target.value });
    },
    [field.accessor, setStore]
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
