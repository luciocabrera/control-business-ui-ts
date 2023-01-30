// react
import { useRef, createContext, useContext, useCallback, useSyncExternalStore } from 'react';

type UseStoreData<TDataType> = {
  get: () => TDataType | undefined;
  set: (value: Partial<TDataType>) => void;
  subscribe: (callback: () => void) => () => void;
};

export const useStoreData = <TDataType extends Record<string, unknown>>(
  initialState?: TDataType,
): UseStoreData<TDataType> => {
  const storeFormData = useRef(initialState);

  const get = useCallback(() => storeFormData.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<TDataType>) => {
    storeFormData.current = { ...storeFormData.current, ...value } as TDataType;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get: useCallback(() => get(), [get]),
    set: useCallback((value: Partial<TDataType>) => set(value), [set]),
    subscribe: useCallback((callback: () => void) => subscribe(callback), [subscribe]),
  };
};

export type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

// export const StoreContext = createContext<UseStoreDataReturnType | null>(null);

// type UsesStore<SelectorOutput, TDataType> = [SelectorOutput, (value: Partial<TDataType>) => void];

// export const useStore = <SelectorOutput, TDataType>(
//   selector: (store: TDataType) => SelectorOutput,
// ): UsesStore<SelectorOutput, TDataType> => {
//   const store = useContext(StoreContext);
//   if (!store) {
//     throw new Error('Store not found');
//   }

//   const state = useSyncExternalStore(store.subscribe, () => selector(store.get() as TDataType));

//   return [state, store.set];
// };
