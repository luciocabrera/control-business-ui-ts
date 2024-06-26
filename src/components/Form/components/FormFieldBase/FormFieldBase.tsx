import { ErrorContainer, FieldSetStyled, HelperTextContainer } from './styles';
import type { FormFieldBaseProps } from './types';

const FormFieldBase = ({
  label,
  required,
  viewMode,
  ...props
}: FormFieldBaseProps) => {
  label = label && required ? `${label}  *` : label;

  const msg = props.helperText || '';
  return (
    <FieldSetStyled
      viewMode={viewMode}
      width={props.width as number}
    >
      <fieldset key={`field-${props.accessor}`}>
        <legend>
          <label htmlFor={props.accessor}>{label}</label>
        </legend>
        {props.children}
      </fieldset>

      <HelperTextContainer>
        <ErrorContainer>
          {props.hasErrors ? props.errorMessage : msg}
        </ErrorContainer>
        {!props.disabled &&
          props.maxLength &&
          props.value &&
          ['text', 'password'].includes(props.type) && (
            <span>{`${props.value?.toString().length} / ${
              props.maxLength
            }`}</span>
          )}
      </HelperTextContainer>
    </FieldSetStyled>
  );
};
FormFieldBase.displayName = 'FormFieldBase';

export default FormFieldBase;
