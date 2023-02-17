// components
import Toasts from '../Toasts';
// hooks
import { type TStoreReturn, type UsesStore, useStore } from 'hooks/useStore';
// react
import { createContext, useContext, useSyncExternalStore, useCallback } from 'react';
// types
import type { ReactNode } from 'react';
import type { TToast, TToasts, TToastType } from '../types';
// utilities
import { getToast } from '../utilities/getToast';

type ToastsContextProviderProps = {
  children: ReactNode;
};

const ToastsContext = createContext<TStoreReturn | null>(null);

export const useToastsStore = <SelectorOutput, TDataType = TToasts>(
  selector: (store: TDataType) => SelectorOutput,
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, useCallback(() => selector(store.get() as TDataType), [store, selector]));
  return [state, store.set];
};

export const useAddToast = () => {
  const store = useContext(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return useCallback(
    (
      type: TToastType, description: ReactNode, title: string
    ) => {
      const toast = getToast(description, title, type);
      const toasts = (store.get()?.toasts ?? []) as TToast[];
      if (toast) store.set({ toasts: [...toasts, toast] });
    },
    [store],
  );
};

export const useDeleteToast = () => {
  const store = useContext(ToastsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return useCallback((id: number) => {
    const toasts = (store.get()?.toasts ?? []) as TToast[];
    const newToasts = toasts.filter(toast => toast.id !== id)

    store.set({ toasts: newToasts });

  }, [store])
};


export const ToastsContextProvider = ({ children }: ToastsContextProviderProps) => (
  <ToastsContext.Provider value={useStore<TToasts>()}>
    {children}
    <Toasts />
  </ToastsContext.Provider>
);
