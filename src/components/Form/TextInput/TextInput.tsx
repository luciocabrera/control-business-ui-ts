// React
import { memo, forwardRef } from 'react';
import { FieldBaseValueType } from 'types';
import FormFieldBase from '../FormFieldBase/FormFieldBase';
// Prop-types
import { TextInputStyled } from './TextInput.styled';
import type { TextInputProps } from './TextInput.types';
// Components

const TextInput = memo(
  forwardRef((props: TextInputProps, ref: React.ForwardedRef<unknown>) => {
    const { accessor, value, onChange, normalize, rules } = props;

    const normalizedValue = (normalize?.(value) ?? value ?? '') as FieldBaseValueType;

    const maxLength = rules
      ?.filter((rule) => rule.type === 'maxLength')
      ?.map((filteredRule) => filteredRule.value)[0] as number;

    return (
      <FormFieldBase maxLength={maxLength} ref={ref} {...props}>
        <TextInputStyled
          name={accessor}
          value={normalizedValue}
          onChange={onChange}
          maxLength={maxLength}
          type={props.type}
          id={accessor}
          readOnly={props.readonly}
          placeholder={props.placeholder}
          autoComplete="off"
        />
      </FormFieldBase>
    );
  }),
);

export default TextInput;
