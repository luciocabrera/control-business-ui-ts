import { ReadOnlyTable } from 'components';
import { ChangeEvent, memo } from 'react';
import Select from '../Select/Select';
import TextInput from '../TextInput/TextInput';
import TableField from '../TableField/TableField';
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
            field.onSelect?.(selected);
          }}
          {...field}
          {...props}
        />
      );
    case 'text':
    default:
      return (
        <TextInput
          key={`field-input-${field.accessor}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.change?.(event) || setFieldFromEvent(event);
          }}
          // onChange={setFieldFromEvent}
          {...field}
          {...props}
        />
      );
  }
});

export default memo(FormField) as typeof FormField;
