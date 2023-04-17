import { useCallback, useRef } from 'react';

export type TStore<TData> = {
  get: () => TData | undefined;
  set: (value: Partial<TData>) => void;
  subscribe: (callback: () => void) => () => void;
};

export const useStore = <TData extends Record<string, unknown>>(
  initialState?: TData
): TStore<TData> => {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const listeners = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<TData>) => {
    store.current = { ...store.current, ...value } as TData;
    listeners.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    listeners.current.add(callback);
    return () => listeners.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
};

export type TStoreReturn = ReturnType<typeof useStore>;

export type UsesStore<SelectorOutput, TData> = [
  SelectorOutput,
  (value: Partial<TData>) => void
];
