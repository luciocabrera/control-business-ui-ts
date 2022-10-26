import { useFormData, useContextSelector } from 'hooks';
// import { createContext } from 'utilities';

import { ReactNode, createContext, useContext } from 'react';
import {
  FormFieldType,
  FormFieldErrorType,
  SetFieldType,
  SetPartialFieldsType,
  VerifyFormType,
  SetFieldFromEvent,
} from 'types';

type TDataType = Record<string, unknown>;

type FormDataContextType = {
  data: TDataType;
  fields?: FormFieldType[];
  errors: FormFieldErrorType[];
  initForm: (data: TDataType, fields: FormFieldType[]) => void;
  resetForm: () => void;
  setField: SetFieldType;
  setPartialFields: SetPartialFieldsType<TDataType>;
  verifyForm: VerifyFormType;
  setFieldFromEvent: SetFieldFromEvent;
};
type FormDataContextProviderProps = {
  children: ReactNode;
};
const initial = {
  fields: [], // initialFields || [],
  initialData: {}, // calculatedInitialData,
  data: {}, // calculatedInitialData,
  hasErrors: false,
  hasChanged: false,
  errors: [],
  initForm: () => {},
  resetForm: () => {},
  setField: () => {},
  setPartialFields: () => {},
  verifyForm: () => ({
    errorFields: [],
    hasChanged: false,
  }),
  setFieldFromEvent: () => {},
};

export const FormDataContext = createContext<FormDataContextType>(initial);

export const FormDataContextProvider = ({ children }: FormDataContextProviderProps) => (
  <FormDataContext.Provider value={useFormData()}>{children}</FormDataContext.Provider>
);

export const useFormDataContext = () => useContext(FormDataContext);

// export const useFormDataContext = () =>
//   useContextSelector(FormDataContext, (s) => ({
//     fields: s?.fields,
//     data: s?.data,
//     errors: s?.errors,
//     initForm: (initialFields: FormFieldType[], initialData?: Record<string, unknown>) =>
//       s?.initForm(initialFields, initialData),
//     resetForm: s?.resetForm,
//     // setField: s?.setField,
//     // setPartialFields: s?.setPartialFields,
//     verifyForm: s?.verifyForm,
//     // setFieldFromEvent: s?.setFieldFromEvent,
//   }));
