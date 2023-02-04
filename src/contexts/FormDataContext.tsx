// components
import { Overlay } from 'components';
// react
import { createContext, useContext, useCallback, useSyncExternalStore, useState, useMemo, useEffect } from 'react';
// styles
import { FormWrapper } from 'styles';
// types
import type { FormFieldType, ReactElement } from 'types';
// utilities
import { getInitialData } from 'utilities';

import { useStore, StoreReturnType } from './useStore';

export type FormMetaType<TDataType extends Record<string, unknown>> = {
  submittedCounter: number;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

type FormDataContextProviderType<TDataType extends Record<string, unknown>> = {
  children: ReactElement;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

const initialData = { get: () => undefined, set: () => undefined, subscribe: (callback: () => void) => callback };

const initialMetaData = {
  formMetaData: { submittedCounter: 0, initialData: undefined, initialFields: [] },
  handleSetFormMetaData: () => {},
};

type MetaDataReturnType = {
  formMetaData: FormMetaType<Record<string, unknown>>;
  handleSetFormMetaData: (metaData: Partial<FormMetaType<Record<string, unknown>>>) => void;
};

export const FormContext = createContext<{
  data: StoreReturnType;
  metaData: MetaDataReturnType;
}>({
  data: initialData,
  metaData: initialMetaData,
});

type UsesStore<SelectorOutput, TDataType> = [SelectorOutput, (value: Partial<TDataType>) => void];

export const useFieldsContext = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput,
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(FormContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.data.subscribe, () => selector(store.data.get() as TDataType));

  return [state, store.data.set];
};

export const useFormMetaContext = <SelectorOutput, TDataType extends Record<string, unknown>>(
  selector: (store: TDataType) => SelectorOutput,
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(FormContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useMemo(
    () => selector(store.metaData.formMetaData as unknown as TDataType),
    [selector, store.metaData.formMetaData],
  );

  const set = useCallback(
    (metaData: Partial<TDataType>) => {
      store.metaData.handleSetFormMetaData(metaData);
    },
    [store.metaData],
  );

  return [state, set];
};

export const FormDataContextProvider = <TDataType extends Record<string, unknown>>({
  children,
  initialData,
  initialFields,
}: FormDataContextProviderType<TDataType>) => {
  const [formMetaData, setFormMetaData] = useState<FormMetaType<TDataType>>({
    submittedCounter: 0,
    initialData: {} as TDataType,
    initialFields: [],
  });
  const initialFormData = useMemo(
    () => getInitialData<TDataType>(initialFields, initialData),
    [initialData, initialFields],
  );
  const data = useStore<TDataType>(initialFormData) as StoreReturnType;

  const handleSetFormMetaData = useCallback((metaData: Partial<FormMetaType<Record<string, unknown>>>) => {
    setFormMetaData((prev) => ({ ...prev, ...(metaData as TDataType) }));
  }, []);

  useEffect(() => {
    setFormMetaData((prev) => ({ ...prev, initialData, initialFields }));
  }, [initialData, initialFields]);

  const value = useMemo(
    () => ({ data, metaData: { formMetaData, handleSetFormMetaData } }),
    [data, formMetaData, handleSetFormMetaData],
  );

  return (
    <FormContext.Provider value={value}>
      <FormWrapper>
        <Overlay />
        {children}
      </FormWrapper>
    </FormContext.Provider>
  );
};
