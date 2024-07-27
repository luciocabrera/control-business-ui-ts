import { createContext, type ReactElement, use, useReducer } from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';

export type ColumnMetaItem = {
  name: string;
  id: string;
  type?: 'date' | 'datetime' | 'enum' | 'number' | 'string';
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
  {
      type: TableContextActionKind.SetColumnFilters;
      payload: Pick<TableContextState, 'columnFilters'>;
    } | {
      type: TableContextActionKind.SetColumnMeta;
      payload: Pick<TableContextState, 'columnMeta'>;
    } | {
      type: TableContextActionKind.SetSorting;
      payload: Pick<TableContextState, 'sorting'>;
    } | {
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
  allowFilters: true,
  columnFilters: [],
  columnMeta: [],
  filterQuery: '',
  fullQuery: '',
  showColumnFilters: false,
  sorting: [],
  sortingQuery: '',
  title: '',
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
        columnFilters: action.payload.columnFilters,
        filterQuery,
        fullQuery: `${filterQuery}${state.sortingQuery}`,
        showColumnFilters: false,
      };
    }
    case TableContextActionKind.SetSorting: {
      const sortingQuery = action.payload.sorting
        .map((s) => `&orderBy=${s.id} ${s.desc ? 'desc' : 'asc'}`)
        .join('');
      return {
        ...state,
        fullQuery: `${state.filterQuery}${sortingQuery}`,
        sorting: action.payload.sorting,
        sortingQuery,
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
  dispatch: () => null,
  state: defaultState,
});

const useStoreContext = ({
  allowFilters = false,
  columnMeta,
  title,
}: UseStoreContextType) => {
  const [state, dispatch] = useReducer(tableContextReducer, {
    ...defaultState,
    allowFilters,
    columnMeta: columnMeta ?? defaultState.columnMeta,
    title,
  });

  return { dispatch, state };
};

export const useTableContext = () => {
  const context = use(TableContext);
  return { ...context };
};

export const TableContextProvider = ({
  allowFilters,
  children,
  columnMeta,
  title,
}: TableContextProviderProps) => (
  <TableContext value={useStoreContext({ allowFilters, columnMeta, title })}>
    {children}
  </TableContext>
);
