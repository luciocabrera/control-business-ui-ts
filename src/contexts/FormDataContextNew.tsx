import React, { useRef, createContext, useContext, useCallback, useSyncExternalStore } from 'react';

// function useStoreData<Store>(initialState: Store): {
//   get: () => Store;
//   set: (value: Partial<Store>) => void;
//   init: (value: Partial<Store>) => void;
//   subscribe: (callback: () => void) => () => void;
// } {
//   const store = useRef(initialState);

//   const init = useCallback((value: Partial<Store>) => (store.current = value as Store), []);

//   const get = useCallback(() => store.current, []);

//   const subscribers = useRef(new Set<() => void>());

//   const set = useCallback((value: Partial<Store>) => {
//     store.current = { ...store.current, ...value };
//     subscribers.current.forEach((callback) => callback());
//   }, []);

//   const subscribe = useCallback((callback: () => void) => {
//     subscribers.current.add(callback);
//     return () => subscribers.current.delete(callback);
//   }, []);

//   return {
//     get,
//     set,
//     init,
//     subscribe,
//   };
// }

// export function useStore<SelectorOutput, Store>(
//   selector: (store: Store) => SelectorOutput,
// ): [SelectorOutput, (value: Partial<Store>) => void] {
//   const store = useContext(StoreContext);
//   if (!store) {
//     throw new Error('Store not found');
//   }

//   const state = useSyncExternalStore(store.subscribe, () => selector(store.get() as Store));

//   return [state, store.set];
// }

export default function createFastContext<Store>(initialState?: Store) {
  function useStoreData(): {
    get: () => Store | undefined;
    set: (value: Partial<Store>) => void;
    init: (value: Store) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const init = useCallback((value: Store) => (store.current = value), []);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value } as Store;
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      init,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  }

  // export function useStore<SelectorOutput>(
  //   selector: (store: Store) => SelectorOutput,
  // ): [SelectorOutput, (value: Partial<Store>) => void] {
  //   const store = useContext(StoreContext);
  //   if (!store) {
  //     throw new Error('Store not found');
  //   }

  //   const state = useSyncExternalStore(store.subscribe, () => selector(store.get() as Store));

  //   return [state, store.set];
  // }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get() as Store),
      () => selector(initialState || ({} as Store)),
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
