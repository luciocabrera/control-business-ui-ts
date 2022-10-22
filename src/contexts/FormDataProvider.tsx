import { useFormData } from 'hooks';
import { createContext, ReactNode } from 'react';

type FormDataContextType = {};
type FormDataContextProviderProps = {
  children: ReactNode;
};

const FormDataContext = createContext<FormDataContextType | null>(null);

export const FormDataContextProvider = ({ children }: FormDataContextProviderProps) => (
  <FormDataContext.Provider value={useFormData()}>{children}</FormDataContext.Provider>
);
