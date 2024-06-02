import { FormFieldBase } from '../FormFieldBase';

import { SelectStyled } from './styles';
import type { SelectProps } from './types';

const Select = ({ ref, ...props }: SelectProps) => {
  const { accessor, label, onChange, options, value } = props;

  return (
    <FormFieldBase {...props}>
      <SelectStyled
        name={accessor}
        select-name={accessor}
        title={accessor}
        aria-label={accessor}
        aria-labelledby={accessor}
        ref={ref}
        id={accessor}
        value={value}
        disabled={props.readonly}
        onChange={(event) => {
          event.preventDefault();
          onChange?.(event);
        }}
      >
        <option
          key='default-option'
          value=''
        >
          Choose {label}
        </option>
        {options?.map((option) => (
          <option
            id={`item-${option.value}`}
            key={`item-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </SelectStyled>
    </FormFieldBase>
  );
};

Select.displayName = 'Select';

export default Select;
