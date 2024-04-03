import type { AggregationFn } from '@tanstack/react-table';

export type TColumnMetaDataType =
  | 'boolean'
  | 'date'
  | 'number'
  | 'string'
  | 'text';

export type TAggregatorMethodType = 'count' | 'distinctCount' | 'sum';

export type TPivotMode = 'both' | 'column' | 'none' | 'row' | 'value';

declare module '@tanstack/table-core' {
  type ColumnMeta = {
    aggregatorMethod?: TAggregatorMethodType;
    canFilterWhenAggregating?: boolean;
    caption?: string;
    type?: TColumnMetaDataType;
    query?: string;
    pivotMode?: TPivotMode[];
    display?: boolean;
    counter?: string;
    helpText?: string;
  };
  type AggregationFns = {
    aggregateSum?: AggregationFn<unknown>;
  };
}
