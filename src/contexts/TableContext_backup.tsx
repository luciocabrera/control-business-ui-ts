import { createContext, ReactNode, useCallback, useContext, useRef, useSyncExternalStore } from 'react';

type StoreTableType<TDataType> = {
  filters: TDataType[];
  sorting: TDataType[];
};

const useStoreTable = <TDataType extends Record<string, unknown>>({
  filters,
  sorting,
}: StoreTableType<TDataType>): {
  get: () => StoreTableType<TDataType> | undefined;
  set: (value: Partial<TDataType>, key: string) => void;
  subscribe: (callback: () => void) => () => void;
} => {
  const storeTable = useRef({ filters, sorting });

  const get = useCallback(() => storeTable.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<TDataType>) => {
    storeTable.current = { ...storeTable.current, ...value };

    console.log('storeTable', storeTable);
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
};

type UseStoreTableReturnType = ReturnType<typeof useStoreTable>;

const TableContext = createContext<UseStoreTableReturnType | null>(null);

export const useTableContext = <SelectorOutput, TDataType>(
  selector: (store: TDataType) => SelectorOutput,
): [SelectorOutput, (value: Partial<TDataType>, key: string) => void] => {
  const store = useContext(TableContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () => selector(store.get() as TDataType));

  return [state, store.set];
};

type TableContextProviderType = {
  children: ReactNode;
};

export const TableContextProvider = <TDataType extends Record<string, unknown>>({
  children,
}: TableContextProviderType) => {
  return (
    <TableContext.Provider value={useStoreTable<TDataType>({ filters: [], sorting: [] }) as UseStoreTableReturnType}>
      {children}
    </TableContext.Provider>
  );
};
