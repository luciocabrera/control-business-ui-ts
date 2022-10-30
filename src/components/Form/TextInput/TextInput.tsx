// React
import { memo, forwardRef } from 'react';
import { FieldBaseValueType } from 'types';
import FormFieldBase from '../FormFieldBase/FormFieldBase';
// Prop-types
import { TextInputStyled } from './TextInput.styled';
import type { TextInputProps } from './TextInput.types';
// Components

const TextInput = memo(
  forwardRef(({ textAlign, ...rest }: TextInputProps, ref: React.ForwardedRef<unknown>) => {
    const { accessor, type, readonly, placeholder, value, onChange, normalize, rules } = rest;

    const normalizedValue = (normalize?.(value) ?? value ?? '') as FieldBaseValueType;

    const maxLength = rules
      ?.filter((rule) => rule.type === 'maxLength')
      ?.map((filteredRule) => filteredRule.value)[0] as number;

    return (
      <FormFieldBase maxLength={maxLength} ref={ref} {...rest}>
        <TextInputStyled
          name={accessor}
          value={normalizedValue}
          onChange={onChange}
          maxLength={maxLength}
          type={type}
          id={accessor}
          readOnly={readonly}
          placeholder={placeholder}
          autoComplete="off"
          textAlign={textAlign}
        />
      </FormFieldBase>
    );
  }),
);

export default TextInput;
