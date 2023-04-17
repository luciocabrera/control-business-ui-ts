import {
  FormFieldBaseType,
  FormFieldErrorType,
} from '../components/FormField/types';

export const getErrorField = (
  field: FormFieldBaseType,
  errors: FormFieldErrorType[]
) => {
  const defaultError = { hasErrors: false, errorMessage: '' };
  if (!errors?.length) return defaultError;
  return (
    errors
      ?.filter((error) => error.accessor === field.accessor)
      .map((errorFiltered) => {
        return {
          hasErrors: errorFiltered.hasErrors,
          errorMessage: errorFiltered.errorMessage,
        };
      })[0] || defaultError
  );
};
