import { memo } from 'react';

import type { FieldBaseValueType } from '../FormField/types';
import FormFieldBase from '../FormFieldBase/FormFieldBase';

import { TextInputStyled } from './styles';
import type { TextInputProps } from './types';

const TextInput = ({
  ref,
  textAlign,
  ...rest
}: TextInputProps & {
  ref: React.RefObject<unknown>;
}) => {
  const {
    accessor,
    normalize,
    onChange,
    placeholder,
    readonly,
    rules,
    type,
    value,
  } = rest;

  const normalizedValue = (normalize?.(value) ??
    value ??
    '') as FieldBaseValueType;

  const maxLength = rules
    ?.filter((rule) => rule.type === 'maxLength')
    ?.map((filteredRule) => filteredRule.value)[0] as number;

  return (
    <FormFieldBase
      ref={ref}
      maxLength={maxLength}
      {...rest}
    >
      <TextInputStyled
        autoComplete='off'
        id={accessor}
        maxLength={maxLength}
        name={accessor}
        placeholder={placeholder}
        readOnly={readonly}
        textAlign={textAlign}
        type={type}
        value={normalizedValue}
        onChange={onChange}
      />
    </FormFieldBase>
  );
};

TextInput.displayName = 'TextInput';

export default memo(TextInput);
