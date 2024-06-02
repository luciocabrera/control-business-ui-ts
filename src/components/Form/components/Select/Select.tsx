import { FormFieldBase } from '../FormFieldBase';

import { SelectStyled } from './styles';
import type { SelectProps } from './types';

const Select = ({ ref, ...props }: SelectProps) => {
  const { accessor, label, onChange, options, value } = props;

  return (
    <FormFieldBase {...props}>
      <SelectStyled
        ref={ref}
        aria-label={accessor}
        aria-labelledby={accessor}
        disabled={props.readonly}
        id={accessor}
        name={accessor}
        select-name={accessor}
        title={accessor}
        value={value}
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
            key={`item-${option.value}`}
            id={`item-${option.value}`}
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
