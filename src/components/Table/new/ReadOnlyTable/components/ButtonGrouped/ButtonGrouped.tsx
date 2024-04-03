import { flexRender } from '@tanstack/react-table';

import type { TButtonGroupedProps } from './ButtonGrouped.types';

import styles from './ButtonGrouped.module.css';

const ButtonGrouped = <TData extends Record<string, unknown>>({
  cell,
  row,
}: TButtonGroupedProps<TData>) => (
  <button
    className={styles.groupedButton}
    {...{
      onClick: row.getToggleExpandedHandler(),
      style: {
        cursor: row.getCanExpand() ? 'pointer' : 'normal',
      },
    }}
    type='button'
  >
    {row.getIsExpanded() ? '-' : '+'}{' '}
    {flexRender(cell.column.columnDef.cell, cell.getContext())} (
    {row.subRows.length})
  </button>
);

export default ButtonGrouped;
