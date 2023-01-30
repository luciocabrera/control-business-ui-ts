// components
import { Overlay } from 'components';
// react
import { useRef, createContext, useContext, useCallback, useSyncExternalStore, useState, useMemo } from 'react';
// styles
import { FormWrapper } from 'styles';
// types
import type { FormFieldType, ReactNode } from 'types';
// utilities
import { getInitialData } from 'utilities';
import { useStoreData, UseStoreDataReturnType } from './useStore';

export type FormMetaType = {
  submittedCounter: number;
  initialData?: Record<string, unknown>;
  initialFields: FormFieldType[];
};

// type UseStoreData<TDataType> = {
//   get: () => TDataType | undefined;
//   set: (value: Partial<TDataType>) => void;
//   subscribe: (callback: () => void) => () => void;
//   getFormStatus: () => FormStatusType;
//   incrementSubmittedCounter: () => void;
// };

// const useStoreData = <TDataType extends Record<string, unknown>>(initialState?: TDataType): UseStoreData<TDataType> => {
//   const storeFormData = useRef(initialState);
//   const [storeFormStatus, setStoreFormStatus] = useState({ submittedCounter: 0 });

//   const get = useCallback(() => storeFormData.current, []);

//   const getFormStatus = useCallback(() => storeFormStatus, [storeFormStatus]);

//   const subscribers = useRef(new Set<() => void>());

//   const set = useCallback((value: Partial<TDataType>) => {
//     storeFormData.current = { ...storeFormData.current, ...value } as TDataType;
//     subscribers.current.forEach((callback) => callback());
//   }, []);

//   const subscribe = useCallback((callback: () => void) => {
//     subscribers.current.add(callback);
//     return () => subscribers.current.delete(callback);
//   }, []);

//   const incrementSubmittedCounter = useCallback(() => {
//     setStoreFormStatus({ submittedCounter: storeFormStatus.submittedCounter + 1 });

//     subscribers.current.forEach((callback) => callback());
//   }, [storeFormStatus]);

//   return {
//     get,
//     set,
//     subscribe,
//     getFormStatus,
//     incrementSubmittedCounter,
//   };
// };

// type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

// type UseFormStatusStore = [FormStatusType, () => void];

// export const useFormStatusStore = (): UseFormStatusStore => {
//   const store = useContext(FieldsContext);
//   if (!store) {
//     throw new Error('Store not found');
//   }

//   const state = useSyncExternalStore(store.subscribe, () => store.getFormStatus());

//   return [state, store.incrementSubmittedCounter];
// };

type FormDataContextProviderType<TDataType extends Record<string, unknown>> = {
  children: ReactNode;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

// type UseStoreData<TDataType> = {
//   get: () => TDataType | undefined;
//   set: (value: Partial<TDataType>) => void;
//   subscribe: (callback: () => void) => () => void;
//   getFormStatus: () => FormStatusType;
//   incrementSubmittedCounter: () => void;
// };

export const FieldsContext = createContext<{
  useFormStoreData: UseStoreDataReturnType;
  formMetaData: UseStoreDataReturnType; //FormMetaType;
}>({
  useFormStoreData: { get: () => undefined, set: () => undefined, subscribe: (callback: () => void) => callback },
  // formMetaData: { initialFields: [], initialData: {}, submittedCounter: 0 },
  formMetaData: { get: () => undefined, set: () => undefined, subscribe: (callback: () => void) => callback },
});

type UsesStore<SelectorOutput, TDataType> = [SelectorOutput, (value: Partial<TDataType>) => void];

export const useFieldsContext = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput,
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(FieldsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.useFormStoreData.subscribe, () =>
    selector(store.useFormStoreData.get() as TDataType),
  );

  return [state, store.useFormStoreData.set];
};

export const useFormMetaContextNew = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput,
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(FieldsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.formMetaData.subscribe, () =>
    selector(store.formMetaData.get() as TDataType),
  );

  return [state, store.formMetaData.set];
};

export const useFormMetaContext = <TDataType extends Record<string, unknown> | FormFieldType[] | number>(
  selector: keyof FormMetaType,
): [TDataType, (newValue: TDataType) => void] => {
  const store = useContext(FieldsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  let state = store.formMetaData[selector] as TDataType;
  const set = (newValue: TDataType) => {
    state = newValue;
  };

  return [state, set];
};

export const FormDataContextProvider = <TDataType extends Record<string, unknown>>({
  children,
  initialData,
  initialFields,
}: FormDataContextProviderType<TDataType>) => {
  const initialFormState = useState({ initialFields, initialData, submittedCounter: 0 });
  const initialFormData = useMemo(
    () => getInitialData<TDataType>(initialFields, initialData),
    [initialData, initialFields],
  );

  // const incrementSubmittedCounter = useCallback(() => {
  //   setStoreFormStatus({ submittedCounter: storeFormStatus.submittedCounter + 1 });

  //   subscribers.current.forEach((callback) => callback());
  // }, [storeFormStatus]);

  const useFormStoreData = useStoreData<TDataType>(initialFormData) as UseStoreDataReturnType;
  // const formMetaData = useStoreData<FormMetaType>(initialFormState.current) as UseStoreDataReturnType;
  const value = useMemo(
    () => ({ useFormStoreData, formMetaData: initialFormState.current }),
    [initialFormState, useFormStoreData],
  );

  return (
    <FieldsContext.Provider value={value}>
      <FormWrapper>
        <Overlay />
        {children}
      </FormWrapper>
    </FieldsContext.Provider>
  );
};
