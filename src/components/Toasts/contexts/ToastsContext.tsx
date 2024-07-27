import type { ReactNode } from 'react';
import { createContext, use, useSyncExternalStore } from 'react';
import { type TStoreReturn, type UsesStore, useStore } from 'hooks/useStore';

import Toasts from '../Toasts';
import type { TToast, TToasts, TToastType } from '../types';
import { getToast } from '../utilities/getToast';

type ToastsContextProviderProps = {
  children: ReactNode;
};

const ToastsContext = createContext<TStoreReturn | null>(null);

export const useToastsStore = <SelectorOutput, TDataType = TToasts>(
  selector: (store: TDataType) => SelectorOutput
): UsesStore<SelectorOutput, TDataType> => {
  const store = use(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get() as TDataType)
  );
  return [state, store.set];
};

export const useAddToast = () => {
  const store = use(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return (type: TToastType, description: ReactNode, title: string) => {
    const toast = getToast(description, title, type);
    const toasts = (store.get()?.toasts ?? []) as TToast[];
    if (toast) store.set({ toasts: [...toasts, toast] });
  };
};

export const useDeleteToast = () => {
  const store = use(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return (id: number) => {
    const toasts = (store.get()?.toasts ?? []) as TToast[];
    const newToasts = toasts.filter((toast) => toast.id !== id);

    store.set({ toasts: newToasts });
  };
};

export const ToastsContextProvider = ({
  children,
}: ToastsContextProviderProps) => (
  <ToastsContext value={useStore<TToasts>()}>
    {children}
    <Toasts />
  </ToastsContext>
);
