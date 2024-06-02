// components
import { FormFieldBase } from '../FormFieldBase';

// styles
import { SelectStyled } from './styles';
// types
import type { SelectProps } from './types';

const Select = ({
  ref,
  ...props
}: SelectProps & {
  ref: React.RefObject<unknown>;
}) => {
  const { accessor, options, value, label, onChange } = props;

  return (
    <FormFieldBase
      {...props}
      ref={ref}
    >
      <SelectStyled
        name={accessor}
        select-name={accessor}
        title={accessor}
        aria-label={accessor}
        aria-labelledby={accessor}
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
