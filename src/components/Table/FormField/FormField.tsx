import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';

import type { FieldBaseValueType } from 'components/Form/components/FormField/types';
import { Select } from 'components/Form/components/Select';
import { TextInputStyled } from 'components/Form/components/TextInput/styles';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { FormFieldProps } from './FormField.types';

type RecordType = Record<string, FieldBaseValueType>;

const FormField = ({ field, ...props }: FormFieldProps) => {
  const { accessor, label, options, placeholder, readonly, rules, type } =
    field;

  const [fieldValue, setStore] = useFieldsContext<
    FieldBaseValueType,
    RecordType
  >((store) => store[field.accessor]);

  const [submittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<RecordType>, 'submittedCounter'>
  >((store) => store.submittedCounter);

  console.log('submittedCounter', submittedCounter);

  const errorFields =
    submittedCounter > 0 ? validateField(field, fieldValue) : [];

  const errorField = getErrorField(field, errorFields);

  const maxLength = rules
    ?.filter((rule) => rule.type === 'maxLength')
    ?.map((filteredRule) => filteredRule.value)[0] as number;

  const handleOnSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.options[event.target.selectedIndex]?.value;
    setStore({ [field.accessor]: selected });
  };

  const handleOnTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStore({ [field.accessor]: event.target.value });
  };

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
          autoComplete='off'
        />
      );
  }
};

export default FormField;
