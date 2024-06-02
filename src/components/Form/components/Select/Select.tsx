import { FormFieldBase } from '../FormFieldBase';

import { SelectStyled } from './styles';
import type { SelectProps } from './types';

const Select = ({
  accessor,
  label,
  options,
  readonly,
  ref,
  required,
  type,
  value,
  ...props
}: SelectProps) => {
  return (
    <FormFieldBase
      accessor={accessor}
      label={label}
      required={required}
      type={type}
    >
      <SelectStyled
        ref={ref}
        aria-label={accessor}
        aria-labelledby={accessor}
        disabled={readonly}
        id={accessor}
        name={accessor}
        select-name={accessor}
        title={accessor}
        value={value}
        {...props}
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
