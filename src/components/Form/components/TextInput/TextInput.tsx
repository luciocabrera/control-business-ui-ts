// components
import FormFieldBase from '../FormFieldBase/FormFieldBase';
// react
import { memo, forwardRef } from 'react';
// styles
import { TextInputStyled } from './styles';
// types
import type { FieldBaseValueType } from 'types';
import type { TextInputProps } from './types';

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
