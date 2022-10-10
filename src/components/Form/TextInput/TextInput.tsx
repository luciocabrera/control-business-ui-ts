// React
import { memo, forwardRef } from 'react';
import FormFieldBase from '../FormFieldBase/FormFieldBase';
// Prop-types
import { TextInputStyled } from './TextInput.styled';
import type { TextInputProps } from './TextInput.types';
// Components

const TextInput = memo(
  forwardRef((props: TextInputProps, ref: React.ForwardedRef<unknown>) => {
    const { accessor, value, onChange, rules } = props;

    const maxLength = rules
      ?.filter((rule) => rule.type === 'maxLength')
      ?.map((filteredRule) => filteredRule.value)[0] as number;

    return (
      <FormFieldBase maxLength={maxLength} ref={ref} {...props}>
        <TextInputStyled
          name={accessor}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          type={props.type}
          id={accessor}
          readOnly={props.disabled}
          placeholder={props.placeholder}
          autoComplete="off"
        />
      </FormFieldBase>
    );
  }),
);

export default TextInput;
