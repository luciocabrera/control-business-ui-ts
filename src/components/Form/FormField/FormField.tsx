import { memo } from 'react';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import { FormFieldProps } from './FormField.types';

const FormField = memo(({ field, setField, setFieldFromEvent, ...props }: FormFieldProps) => {
  switch (field.type) {
    case 'select':
      return (
        <Select
          key={`field-select-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selected = event.target.options[event.target.selectedIndex]?.value;
            setField(field.accessor, selected);
            // field.onSelect?.(selected);
          }}
          {...field}
          {...props}
        />
      );
    case 'text':
    default:
      return <TextInput key={`field-input-${field.accessor}`} onChange={setFieldFromEvent} {...field} {...props} />;
  }
});

export default FormField;
