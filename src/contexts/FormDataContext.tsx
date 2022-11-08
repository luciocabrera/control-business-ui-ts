import { Overlay } from 'components';
import React, { useRef, createContext, useContext, useCallback, useSyncExternalStore, useState } from 'react';
import { FormWrapper } from 'styles';
import type { FormFieldType } from 'types';
import { getInitialData } from 'utilities';

type FormStatusType = {
  submittedCounter: number;
};

const useStoreData = <TDataType extends Record<string, unknown>>(
  initialState?: TDataType,
): {
  get: () => TDataType | undefined;
  set: (value: TDataType) => void;
  subscribe: (callback: () => void) => () => void;
  getFormStatus: () => FormStatusType;
  incrementSubmittedCounter: () => void;
} => {
  const storeFormData = useRef(initialState);
  const [storeFormStatus, setStoreFormStatus] = useState({ submittedCounter: 0 });

  const get = useCallback(() => storeFormData.current, []);

  const getFormStatus = useCallback(() => storeFormStatus, [storeFormStatus]);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<TDataType>) => {
    storeFormData.current = { ...storeFormData.current, ...value } as TDataType;
    console.log('current', storeFormData.current);
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const incrementSubmittedCounter = useCallback(() => {
    setStoreFormStatus({ submittedCounter: storeFormStatus.submittedCounter + 1 });

    subscribers.current.forEach((callback) => callback());
  }, [storeFormStatus]);

  return {
    get,
    set,
    subscribe,
    getFormStatus,
    incrementSubmittedCounter,
  };
};

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

export const useStore = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput,
): [SelectorOutput, (value: Partial<TDataType>) => void, () => FormStatusType, () => void] => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () => selector(store.get() as TDataType));

  return [state, store.set, store.getFormStatus, store.incrementSubmittedCounter];
};

export const useFormStatusStore = (): [FormStatusType, () => void] => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () => store.getFormStatus());

  return [state, store.incrementSubmittedCounter];
};

type FormDataContextProviderType<TDataType extends Record<string, unknown>> = {
  children: React.ReactNode;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

export const FormDataContextProvider = <TDataType extends Record<string, unknown>>({
  children,
  initialData,
  initialFields,
}: FormDataContextProviderType<TDataType>) => {
  const initialState = getInitialData<TDataType>(initialFields, initialData);

  return (
    //@ts-ignore
    <StoreContext.Provider value={useStoreData<TDataType>(initialState)}>
      <FormWrapper>
        <Overlay />
        {children}
      </FormWrapper>
    </StoreContext.Provider>
  );
};
