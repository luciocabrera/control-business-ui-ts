
import { useCallback, useMemo } from 'react';

export type TStore<TData> = {
  get: () => TData | undefined;
  set: (value: Partial<TData>) => void;
  subscribe: (callback: () => void) => () => void;
};

export const useStore = <TData extends Record<string, unknown>>(initialState?: TData): TStore<TData> => {
  let store = useMemo(() => initialState, []);

  const get = useCallback(() => store, []);

  const listeners = new Set<() => void>();

  const set = useCallback((value: Partial<TData>) => {
    store = { ...store, ...value } as TData;
    listeners.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
};

export type TStoreReturn = ReturnType<typeof useStore>;

export type UsesStore<SelectorOutput, TData> = [SelectorOutput, (value: Partial<TData>) => void];
