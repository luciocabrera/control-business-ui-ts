// components
import { Select } from 'components';
// contexts
import { useFormStatusStore, useStore } from 'contexts';
// types
import type { FormFieldProps } from './FormField.types';
import type { FieldBaseValueType } from 'types';
// utilities
import { getErrorField, validateField, memo } from 'utilities';
import { TextInputStyled } from 'components/Form/TextInput/TextInput.styled';

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const { options, type, label, accessor, readonly, placeholder, rules } = field;

  const [fieldValue, setStore] = useStore<FieldBaseValueType, any>((store) => store[field.accessor]);

  const [formStatus] = useFormStatusStore();
  const { submittedCounter } = formStatus;

  const errorFields = submittedCounter > 0 ? validateField(field, fieldValue) : [];
  const errorField = getErrorField(field, errorFields);
  const maxLength = rules
    ?.filter((rule) => rule.type === 'maxLength')
    ?.map((filteredRule) => filteredRule.value)[0] as number;

  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = event.target.options[event.target.selectedIndex]?.value;
            setStore({ [field.accessor]: selected });
          }}
          value={fieldValue}
          accessor={accessor}
          options={options}
          label={label}
          readonly={readonly}
          type={type}
          {...props}
          {...errorField}
        />
      );
    case 'text':
    default:
      return (
        <TextInputStyled
          name={accessor}
          value={fieldValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStore({ [field.accessor]: event.target.value });
          }}
          maxLength={maxLength}
          type={type}
          id={accessor}
          placeholder={placeholder}
          autoComplete="off"
        />
      );
  }
});

export default FormField;
