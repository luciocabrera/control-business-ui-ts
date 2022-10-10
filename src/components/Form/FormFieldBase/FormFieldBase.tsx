import { memo } from 'react';

import { HelperTextContainer, FieldSetStyled, ErrorContainer } from './FormFieldBase.styled';
import type { FormFieldBaseProps } from './FormFieldBase.types';

const FormFieldBase = memo(({ label, placeholder, required, ...props }: FormFieldBaseProps) => {
  label = label && required ? `${label}  *` : label;
  placeholder = placeholder && required ? `${placeholder}  *` : placeholder;

  const msg = props.helperText || '';
  return (
    <FieldSetStyled width={props.width}>
      <fieldset key={`field-${props.accessor}`}>
        <legend>
          <label htmlFor={props.accessor}>{label}</label>
        </legend>
        {props.children}
      </fieldset>
      <HelperTextContainer>
        <ErrorContainer>{props.hasErrors ? props.errorMessage : msg}</ErrorContainer>
        {!props.disabled && props.maxLength && props.value && ['text', 'password'].includes(props.type) && (
          <span>{`${props.value?.toString().length} / ${props.maxLength}`}</span>
        )}
      </HelperTextContainer>
    </FieldSetStyled>
  );
});

export default FormFieldBase;
