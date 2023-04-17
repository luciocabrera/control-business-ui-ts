import {
  createContext,
  type ReactElement,
  useContext,
  useReducer,
} from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

export type ColumnMetaItem = {
  name: string;
  id: string;
  type?: 'number' | 'date' | 'datetime' | 'string' | 'enum';
  options?: string[];
};

export type ColumnMetaState = ColumnMetaItem[];

// An enum with all the types of actions to use in our reducer
export enum TableContextActionKind {
  SetColumnFilters = 'setColumnFilters',
  SetColumnMeta = 'setColumnMeta',
  SetSorting = 'setSorting',
  ToggleShowColumnFilters = 'toggleShowColumnFilters',
}

// A type for our actions
type TableContextAction =
  | {
      type: TableContextActionKind.SetColumnMeta;
      payload: Pick<TableContextState, 'columnMeta'>;
    }
  | {
      type: TableContextActionKind.SetColumnFilters;
      payload: Pick<TableContextState, 'columnFilters'>;
    }
  | {
      type: TableContextActionKind.SetSorting;
      payload: Pick<TableContextState, 'sorting'>;
    }
  | {
      type: TableContextActionKind.ToggleShowColumnFilters;
    };

// A type for our state
type TableContextState = {
  columnFilters: ColumnFiltersState;
  columnMeta: ColumnMetaState;
  sorting: SortingState;
  filterQuery: string;
  sortingQuery: string;
  fullQuery: string;
  title: string;
  showColumnFilters: boolean;
  allowFilters: boolean;
};

type TableContextType = {
  state: TableContextState;
  dispatch: React.Dispatch<TableContextAction>;
};

type UseStoreContextType = {
  columnMeta?: ColumnMetaState;
  title: string;
  allowFilters?: boolean;
};

type TableContextProviderProps = UseStoreContextType & {
  children: ReactElement;
};

const defaultState: TableContextState = {
  columnFilters: [],
  columnMeta: [],
  sorting: [],
  title: '',
  filterQuery: '',
  sortingQuery: '',
  fullQuery: '',
  showColumnFilters: false,
  allowFilters: true,
};

// Our reducer function that uses a switch statement to handle our actions
const tableContextReducer = (
  state: TableContextState,
  action: TableContextAction
): TableContextState => {
  const { type } = action;
  switch (type) {
    case TableContextActionKind.SetColumnMeta:
      return {
        ...state,
        columnMeta: action.payload.columnMeta,
      };

    case TableContextActionKind.SetColumnFilters: {
      const filterQuery = action.payload.columnFilters
        .map((cf) => {
          const currentFilterMeta = state.columnMeta.find(
            (cm) => cm.id === cf.id
          );

          switch (currentFilterMeta?.type || '') {
            case 'date':
            case 'datetime': {
              const dateVal = cf.value as Date[];
              return `&filter=${cf.id} gt ${dateVal[0].toISOString()}&filter=${
                cf.id
              } lt ${dateVal[1].toISOString()}`;
            }
            case 'number': {
              const numberVal = cf.value as number[];
              return `&filter=${cf.id} gt ${numberVal[0]}&filter=${cf.id} lt ${numberVal[1]} `;
            }
            case 'enum': {
              const enumVal = cf.value as string;
              return `&filter=${cf.id} equals ${enumVal}`;
            }
            default: {
              const defaultVal = cf.value as string;
              return `&filter=${cf.id} contains ${defaultVal} `;
            }
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
    }
    case TableContextActionKind.SetSorting: {
      const sortingQuery = action.payload.sorting
        .map((s) => `&orderBy=${s.id} ${s.desc ? 'desc' : 'asc'}`)
        .join('');
      return {
        ...state,
        sorting: action.payload.sorting,
        sortingQuery,
        fullQuery: `${state.filterQuery}${sortingQuery}`,
      };
    }
    case TableContextActionKind.ToggleShowColumnFilters:
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

const useStoreContext = ({
  columnMeta,
  title,
  allowFilters = false,
}: UseStoreContextType) => {
  const [state, dispatch] = useReducer(tableContextReducer, {
    ...defaultState,
    columnMeta: columnMeta ?? defaultState.columnMeta,
    title,
    allowFilters,
  });

  return { state, dispatch };
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  return { ...context };
};

export const TableContextProvider = ({
  children,
  columnMeta,
  title,
  allowFilters,
}: TableContextProviderProps) => (
  <TableContext.Provider
    value={useStoreContext({ columnMeta, title, allowFilters })}
  >
    {children}
  </TableContext.Provider>
);
