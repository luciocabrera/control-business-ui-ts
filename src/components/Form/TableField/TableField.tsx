// React
import ReadOnlyTable from 'components/Table/ReadOnlyTable/ReadOnlyTable';
import { memo, forwardRef } from 'react';
// Prop-types
import type { TableFieldProps } from './TableField.types';
// Components

const TableField = <TData extends Record<string, unknown>>(
  props: TableFieldProps<TData>,
  ref: React.ForwardedRef<unknown>,
) => {
  const { data, normalize, columns } = props;

  const normalizedValue = (normalize?.(data) ?? data) as unknown as TData[];

  return <ReadOnlyTable<TData> data={normalizedValue} columns={columns} useRadius />;
};
export default memo(forwardRef(TableField)) as typeof TableField;
