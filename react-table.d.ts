/* eslint-disable @typescript-eslint/consistent-type-definitions */
import '@tanstack/react-table';

export type TColumnMetaDataType =
  | 'boolean'
  | 'currency'
  | 'date'
  | 'number'
  | 'string'
  | 'text';

export type TAggregatorMethodType = 'count' | 'distinctCount' | 'sum';

export type TPivotMode = 'both' | 'column' | 'none' | 'row' | 'value';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    aggregatorMethod?: TAggregatorMethodType;
    canFilterWhenAggregating?: boolean;
    caption?: string;
    type?: TColumnMetaDataType;
    query?: string;
    pivotMode?: TPivotMode[];
    shouldUseDefaultCell?: boolean;
    display?: boolean;
    counter?: string;
    helpText?: string;
  }
  interface AggregationFns {
    sum?: AggregationFn<unknown>;
  }
}
