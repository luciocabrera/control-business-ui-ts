import { memo, forwardRef } from 'react';
// components
import FormFieldBase from '../FormFieldBase/FormFieldBase';
// styles
import { SelectStyled } from './Select.styled';
// types
import type { SelectProps } from './Select.types';

const Select = memo(
  forwardRef((props: SelectProps, ref: React.ForwardedRef<unknown>) => {
    const { accessor, options, value, label, onChange } = props;
    return (
      <FormFieldBase {...props} ref={ref}>
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
          <option value="" disabled hidden>
            Choose {label}
          </option>
          {options?.map((option) => (
            <option id={`item-${option.value}`} key={`item-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectStyled>
      </FormFieldBase>
    );
  }),
);

export default Select;
