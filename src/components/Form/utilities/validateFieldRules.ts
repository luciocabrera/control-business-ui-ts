import type { FormFieldBaseType, FormFieldErrorType } from '../components/FormField/types';

export const validateFieldRules = <T>(field: FormFieldBaseType, data: T) => {
  const fieldRuleErrors: FormFieldErrorType[] = [];
  const fieldValue = data[field.accessor as keyof T] as unknown as string;
  let errorMessage = '';
  let hasErrors = false;

  field.rules?.forEach((rule) => {
    errorMessage = '';
    hasErrors = false;

    if (rule.type === 'required')
      if (!fieldValue) {
        hasErrors = true;
        errorMessage = rule.message || `The ${field.label}' is mandatory!`;
      }
    if (rule.type === 'length')
      if (fieldValue.length !== rule.value) {
        hasErrors = true;
        errorMessage = rule.message || `The ${field.label}'s length must be exactly ${rule.value} characters!`;
      }
    if (rule.type === 'minLength')
      if (fieldValue.length < rule.value) {
        hasErrors = true;
        errorMessage = rule.message || `The ${field.label}'s length must be greater than ${rule.value} characters!`;
      }
    if (rule.type === 'maxLength')
      if (fieldValue.length > rule.value) {
        hasErrors = true;
        errorMessage = rule.message || `The ${field.label}'s length must be lower than ${rule.value} characters!`;
      }
    if (rule.type === 'regex')
      if (rule.value && fieldValue.match(rule.value as string) === null) {
        hasErrors = true;
        errorMessage =
          rule.message ||
          `The specified ${field.label} is wrong, it should comply with the following regex expression ${rule.value}!`;
      }

    if (hasErrors)
      fieldRuleErrors.push({
        accessor: field.accessor,
        hasErrors: hasErrors,
        errorMessage: errorMessage,
        value: fieldValue,
      });
  });

  return fieldRuleErrors;
};
