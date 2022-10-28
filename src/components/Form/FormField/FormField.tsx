import { ReadOnlyTable } from 'components';
import { ChangeEvent, memo } from 'react';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import TableField from '../TableField/TableField';
import { FormFieldProps } from './FormField.types';
import { useFormDataContext } from 'contexts/FormDataContext';
import { CustomerFormType, FieldBaseValueType } from 'types';
import { getErrorField } from 'utilities';
// import createFastContext from 'contexts/FormDataContextNew';

const FormField = memo(({ field, useStore, ...props }: FormFieldProps) => {
  // const { data, errors, verifyForm, setField, setFieldFromEvent } = useFormDataContext();

  // const { useStore } = createFastContext();

  //@ts-ignore
  const [fieldValue, setStore] = useStore((store) => store[field.accessor]);
  // const errorField = getErrorField(field, errors);
  //const form = useContext(FormDataContext);
  // const form = useFormData<TDataType>(initialFields, initialData);

  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = event.target.options[event.target.selectedIndex]?.value;
            // setField(field.accessor, selected);
            setStore({ [field.accessor]: selected });
            field.onSelect?.(selected);
          }}
          // value={data[field.accessor] as FieldBaseValueType}
          value={fieldValue as FieldBaseValueType}
          {...field}
          {...props}
          // {...errorField}
        />
      );
    case 'text':
    default:
      return (
        <TextInput
          key={`field-input-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //field.change?.(event) ||
            // setFieldFromEvent(event);
            setStore({ [field.accessor]: event.target.value });
          }}
          // onChange={setFieldFromEvent}
          {...field}
          {...props}
          // {...errorField}
          // value={data[field.accessor] as FieldBaseValueType}
          value={fieldValue as FieldBaseValueType}
        />
      );
  }
});

export default memo(FormField) as typeof FormField;
