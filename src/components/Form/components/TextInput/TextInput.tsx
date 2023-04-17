// components
// react
import { forwardRef, memo } from 'react';

import type { FieldBaseValueType } from '../FormField/types';
import FormFieldBase from '../FormFieldBase/FormFieldBase';

// styles
import { TextInputStyled } from './styles';
// types
import type { TextInputProps } from './types';

const TextInput = forwardRef(
  (
    { textAlign, ...rest }: TextInputProps,
    ref: React.ForwardedRef<unknown>
  ) => {
    const {
      accessor,
      type,
      readonly,
      placeholder,
      value,
      onChange,
      normalize,
      rules,
    } = rest;

    const normalizedValue = (normalize?.(value) ??
      value ??
      '') as FieldBaseValueType;

    const maxLength = rules
      ?.filter((rule) => rule.type === 'maxLength')
      ?.map((filteredRule) => filteredRule.value)[0] as number;

    return (
      <FormFieldBase
        maxLength={maxLength}
        ref={ref}
        {...rest}
      >
        <TextInputStyled
          name={accessor}
          value={normalizedValue}
          onChange={onChange}
          maxLength={maxLength}
          type={type}
          id={accessor}
          readOnly={readonly}
          placeholder={placeholder}
          autoComplete='off'
          textAlign={textAlign}
        />
      </FormFieldBase>
    );
  }
);

TextInput.displayName = 'TextInput';

export default memo(TextInput);
