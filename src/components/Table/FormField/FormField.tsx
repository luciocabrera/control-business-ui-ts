// components
import { Select } from 'components/Form/components/Select';
// contexts
import { useFormMetaContext, useFieldsContext, FormMetaType } from 'contexts';
// hooks
import { useCallback, useMemo } from 'hooks';
// types
import type { FormFieldProps } from './FormField.types';
import type { FieldBaseValueType } from 'components/Form/components/FormField/types';
// utilities
import { memo } from 'utilities';
import { getErrorField, validateField } from 'components/Form/utilities';
// styles
import { TextInputStyled } from 'components/Form/components/TextInput/styles';

type RecordType = Record<string, FieldBaseValueType>;

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const { options, type, label, accessor, readonly, placeholder, rules } = field;

  const [fieldValue, setStore] = useFieldsContext<FieldBaseValueType, RecordType>((store) => store[field.accessor]);

  const [submittedCounter] = useFormMetaContext<number, Pick<FormMetaType<RecordType>, 'submittedCounter'>>(
    (store) => store.submittedCounter,
  );

  console.log('submittedCounter', submittedCounter);

  const errorFields = useMemo(
    () => (submittedCounter > 0 ? validateField(field, fieldValue) : []),
    [field, fieldValue, submittedCounter],
  );
  const errorField = useMemo(() => getErrorField(field, errorFields), [errorFields, field]);
  const maxLength = rules
    ?.filter((rule) => rule.type === 'maxLength')
    ?.map((filteredRule) => filteredRule.value)[0] as number;

  const handleOnSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = event.target.options[event.target.selectedIndex]?.value;
      setStore({ [field.accessor]: selected });
    },
    [field.accessor, setStore],
  );

  const handleOnTextInputChange = useCallback(
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
          onChange={handleOnSelectChange}
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
          onChange={handleOnTextInputChange}
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
