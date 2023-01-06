import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { type ReactNode, useContext, createContext, useReducer } from 'react';

export type ColumnMetaItem = {
  name: string;
  id: string;
  type?: 'number' | 'date' | 'datetime' | 'string' | 'enum';
  options?: string[];
};

export type ColumnMetaState = ColumnMetaItem[];

// An enum with all the types of actions to use in our reducer
export enum TableContextActionKind {
  setColumnFilters = 'setColumnFilters',
  setColumnMeta = 'setColumnMeta',
  setSorting = 'setSorting',
  toggleShowColumnFilters = 'toggleShowColumnFilters',
}

// A type for our actions
type TableContextAction =
  | {
      type: TableContextActionKind.setColumnMeta;
      payload: Pick<TableContextState, 'columnMeta'>;
    }
  | {
      type: TableContextActionKind.setColumnFilters;
      payload: Pick<TableContextState, 'columnFilters'>;
    }
  | {
      type: TableContextActionKind.setSorting;
      payload: Pick<TableContextState, 'sorting'>;
    }
  | {
      type: TableContextActionKind.toggleShowColumnFilters;
    };

// A type for our state
type TableContextState = {
  columnFilters: ColumnFiltersState;
  columnMeta: ColumnMetaState;
  sorting: SortingState;
  filterQuery: string;
  sortingQuery: string;
  fullQuery: string;
  showColumnFilters: boolean;
};

type TableContextType = {
  state: TableContextState;
  dispatch: React.Dispatch<TableContextAction>;
};

const defaultState: TableContextState = {
  columnFilters: [],
  columnMeta: [],
  sorting: [],
  filterQuery: '',
  sortingQuery: '',
  fullQuery: '',
  showColumnFilters: false,
};

// Our reducer function that uses a switch statement to handle our actions
const tableContextReducer = (state: TableContextState, action: TableContextAction): TableContextState => {
  const { type } = action;
  switch (type) {
    case TableContextActionKind.setColumnMeta:
      return {
        ...state,
        columnMeta: action.payload.columnMeta,
      };

    case TableContextActionKind.setColumnFilters:
      const filterQuery = action.payload.columnFilters
        .map((cf) => {
          const currentFilterMeta = state.columnMeta.find((cm) => cm.id === cf.id);

          switch (currentFilterMeta?.type || '') {
            case 'date':
            case 'datetime':
              const dateVal = cf.value as Date[];
              return `&filter=${cf.id} gt ${dateVal[0].toISOString()}&filter=${cf.id} lt ${dateVal[1].toISOString()}`;
            case 'number':
              const numberVal = cf.value as number[];
              return `&filter=${cf.id} gt ${numberVal[0]}&filter=${cf.id} lt ${numberVal[1]} `;
            case 'enum':
              return `&filter=${cf.id} equals ${cf.value}`;
            default:
              return `&filter=${cf.id} contains ${cf.value} `;
          }
        })
        .join('');

      return {
        ...state,
        showColumnFilters: false,
        columnFilters: action.payload.columnFilters,
        filterQuery,
        fullQuery: `${filterQuery}${state.sortingQuery}`,
      };

    case TableContextActionKind.setSorting:
      const sortingQuery = action.payload.sorting.map((s) => `&orderBy=${s.id} ${s.desc ? 'desc' : 'asc'}`).join('');
      return {
        ...state,
        sorting: action.payload.sorting,
        sortingQuery,
        fullQuery: `${state.filterQuery}${sortingQuery}`,
      };

    case TableContextActionKind.toggleShowColumnFilters:
      return {
        ...state,
        showColumnFilters: !state.showColumnFilters,
      };
    default:
      return state;
  }
};

const TableContext = createContext<TableContextType>({
  state: defaultState,
  dispatch: () => null,
});

const useStoreContext = (columnMeta?: ColumnMetaState) => {
  const [state, dispatch] = useReducer(tableContextReducer, {
    ...defaultState,
    columnMeta: columnMeta ?? defaultState.columnMeta,
  });

  return { state, dispatch };
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  return { ...context };
};

type TableContextProviderProps = {
  children: ReactNode;
  columnMeta?: ColumnMetaState;
};

export const TableContextProvider = ({ children, columnMeta }: TableContextProviderProps) => (
  <TableContext.Provider value={useStoreContext(columnMeta)}>{children}</TableContext.Provider>
);
