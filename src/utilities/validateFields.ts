import type { FormFieldBaseType, FormFieldErrorType, FormFieldGroupType, FormFieldType } from 'types';
import { isEmpty, validateFieldRules } from 'utilities';

export const validateFields = <T>(fields: FormFieldType[], data: T) => {
  let formErrors: FormFieldErrorType[] = [];
  fields.forEach((field) => {
    if (['group', 'row'].includes(field.type)) {
      formErrors = [...formErrors, ...validateFields((field as FormFieldGroupType).fields || [], data)];
    } else {
      const fieldToValidate = field as FormFieldBaseType;
      const required =
        typeof fieldToValidate.required === 'function' ? fieldToValidate.required(data) : fieldToValidate.required;
      if (fieldToValidate.accessor) {
        if (required && isEmpty(data[fieldToValidate.accessor as keyof T])) {
          formErrors.push({
            accessor: fieldToValidate.accessor,
            hasErrors: true,
            errorMessage: `The ${fieldToValidate.label} is mandatory!`,
            value: data[fieldToValidate.accessor as keyof T] as unknown as string,
          });
        } else {
          const fieldRuleErrors = validateFieldRules(fieldToValidate, data);
          formErrors.push(...fieldRuleErrors);
        }
      }
    }
  });

  return formErrors;
};
// export const validateRules = <T>(fields: FormFieldType[], data: T) => {
//   let formErrors: FormFieldErrorType[] = [];
//   rules.forEach((rule) => {
//     const fieldToValidate = rule;
//     const required =
//       typeof fieldToValidate.required === 'function' ? fieldToValidate.required(data) : fieldToValidate.required;

//     if (required && isEmpty(data[fieldToValidate.accessor as keyof T])) {
//       formErrors.push({
//         accessor: fieldToValidate.accessor,
//         hasErrors: true,
//         errorMessage: `The ${fieldToValidate.label} is mandatory`,
//         value: data[fieldToValidate.accessor as keyof T] as unknown as string,
//       });
//     } else {
//       //const fieldRuleErrors = validateFieldRules(fieldToValidate, data);
//       // formErrors.push(...fieldRuleErrors);
//     }
//   });

//   return formErrors;
// };

export const validateField = (field: FormFieldType, value: unknown) => {
  let formErrors: FormFieldErrorType[] = [];

  const fieldToValidate = field as FormFieldBaseType;
  const required =
    typeof fieldToValidate.required === 'function' ? fieldToValidate.required(value) : fieldToValidate.required;

  if (required && isEmpty(value)) {
    formErrors.push({
      accessor: fieldToValidate.accessor,
      hasErrors: true,
      errorMessage: `The ${fieldToValidate.label} is mandatory`,
      value: value as string,
    });
  } else {
    const fieldRuleErrors = validateFieldRules(fieldToValidate, { [fieldToValidate.accessor]: value });
    formErrors.push(...fieldRuleErrors);
  }

  return formErrors;
};
