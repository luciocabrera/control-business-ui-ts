import { ReadOnlyTable } from 'components';
import { ChangeEvent, memo } from 'react';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import TableField from '../TableField/TableField';
import { FormFieldProps } from './FormField.types';
import { useFormDataContext } from 'contexts/FormDataContext';
import { FieldBaseValueType } from 'types';
import { getErrorField } from 'utilities';

const FormField = memo(({ field, ...props }: FormFieldProps) => {
  const { data, errors, verifyForm, setField, setFieldFromEvent } = useFormDataContext();
  const errorField = getErrorField(field, errors);
  //const form = useContext(FormDataContext);
  // const form = useFormData<TDataType>(initialFields, initialData);

  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = event.target.options[event.target.selectedIndex]?.value;
            setField(field.accessor, selected);
            field.onSelect?.(selected);
          }}
          value={data[field.accessor] as FieldBaseValueType}
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
            //field.change?.(event) ||
            setFieldFromEvent(event);
          }}
          // onChange={setFieldFromEvent}
          {...field}
          {...props}
          {...errorField}
          value={data[field.accessor] as FieldBaseValueType}
        />
      );
  }
});

export default memo(FormField) as typeof FormField;
