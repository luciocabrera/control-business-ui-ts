import {
  createContext,
  use,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { FormWrapper } from 'styles';
import type { ReactElement } from 'types';

import { Overlay } from 'components';

import { type TStoreReturn, useStore } from '../../../hooks/useStore';
import { FormFieldType } from '../components/FormField/types';
import { getInitialData } from '../utilities';

export type FormMetaType<TDataType extends Record<string, unknown>> = {
  submittedCounter: number;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

type FormContextProviderType<TDataType extends Record<string, unknown>> = {
  children: ReactElement;
  initialData?: TDataType;
  initialFields: FormFieldType[];
};

const initialData = {
  get: () => undefined,
  set: () => undefined,
  subscribe: (callback: () => void) => callback,
};

const initialMetaData = {
  formMetaData: {
    initialData: undefined,
    initialFields: [],
    submittedCounter: 0,
  },
  handleSetFormMetaData: () => {
    /* placeholder function */
  },
};

type MetaDataReturnType = {
  formMetaData: FormMetaType<Record<string, unknown>>;
  handleSetFormMetaData: (
    metaData: Partial<FormMetaType<Record<string, unknown>>>
  ) => void;
};

export const FormContext = createContext<{
  data: TStoreReturn;
  metaData: MetaDataReturnType;
}>({
  data: initialData,
  metaData: initialMetaData,
});

type UsesStore<SelectorOutput, TDataType> = [
  SelectorOutput,
  (value: Partial<TDataType>) => void,
];

export const useFieldsContext = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput
): UsesStore<SelectorOutput, TDataType> => {
  const store = use(FormContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.data.subscribe, () =>
    selector(store.data.get() as TDataType)
  );

  return [state, store.data.set];
};

export const useFormMetaContext = <
  SelectorOutput,
  TDataType extends Record<string, unknown>,
>(
  selector: (store: TDataType) => SelectorOutput
): UsesStore<SelectorOutput, TDataType> => {
  const store = use(FormContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = selector(store.metaData.formMetaData as unknown as TDataType);

  const set = (metaData: Partial<TDataType>) => {
    store.metaData.handleSetFormMetaData(metaData);
  };
  return [state, set];
};

export const FormContextProvider = <TDataType extends Record<string, unknown>>({
  children,
  initialData,
  initialFields,
}: FormContextProviderType<TDataType>) => {
  const [formMetaData, setFormMetaData] = useState<FormMetaType<TDataType>>({
    initialData: {} as TDataType,
    initialFields: [],
    submittedCounter: 0,
  });
  const initialFormData = getInitialData<TDataType>(initialFields, initialData);

  const data = useStore<TDataType>(initialFormData) as TStoreReturn;

  const handleSetFormMetaData = (
    metaData: Partial<FormMetaType<Record<string, unknown>>>
  ) => {
    setFormMetaData((prev) => ({ ...prev, ...(metaData as TDataType) }));
  };

  useEffect(() => {
    setFormMetaData((prev) => ({ ...prev, initialData, initialFields }));
  }, [initialData, initialFields]);

  const value = { data, metaData: { formMetaData, handleSetFormMetaData } };

  return (
    <FormContext value={value}>
      <FormWrapper>
        <Overlay />
        {children}
      </FormWrapper>
    </FormContext>
  );
};
