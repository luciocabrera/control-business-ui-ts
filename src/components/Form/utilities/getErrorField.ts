import {
  FormFieldBaseType,
  FormFieldErrorType,
} from '../components/FormField/types';

export const getErrorField = (
  field: FormFieldBaseType,
  errors: FormFieldErrorType[]
) => {
  const defaultError = { errorMessage: '', hasErrors: false };
  if (!errors?.length) return defaultError;
  return (
    errors
      ?.filter((error) => error.accessor === field.accessor)
      .map((errorFiltered) => {
        return {
          errorMessage: errorFiltered.errorMessage,
          hasErrors: errorFiltered.hasErrors,
        };
      })[0] || defaultError
  );
};
