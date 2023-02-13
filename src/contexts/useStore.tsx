// react
import { useRef, useCallback } from 'react';

export type StoreType<TDataType> = {
  get: () => TDataType | undefined;
  set: (value: Partial<TDataType>) => void;
  subscribe: (callback: () => void) => () => void;
};

export const useStore = <TDataType extends Record<string, unknown>>(initialState?: TDataType): StoreType<TDataType> => {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<TDataType>) => {
    store.current = { ...store.current, ...value } as TDataType;
    console.log('useStore', { subscribers, store });
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    // get: useCallback(() => get(), [get]),
    // set: useCallback((value: Partial<TDataType>) => set(value), [set]),
    // subscribe: useCallback((callback: () => void) => subscribe(callback), [subscribe]),
    get,
    set,
    subscribe,
  };
};

export type StoreReturnType = ReturnType<typeof useStore>;

export type UsesStore<SelectorOutput, TDataType> = [SelectorOutput, (value: Partial<TDataType>) => void];
