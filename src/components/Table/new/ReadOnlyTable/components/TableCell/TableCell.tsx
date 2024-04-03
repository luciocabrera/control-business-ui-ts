import type { ReactNode } from 'react';
import { useId } from 'react';
import { flexRender } from '@tanstack/react-table';
import { joinArray } from 'utilities';

import { NumericDisplay } from 'components';
import { SpanDisplay } from 'components/SpanDisplay';

import { ButtonGrouped } from '../ButtonGrouped';
import { TableCheckbox } from '../TableCheckbox';

import { getTdSize } from './getTdSize';
import type { TTableCellProps } from './TableCell.types';

import styles from './TableCell.module.css';

const TableCell = <TData extends Record<string, unknown>>({
  cell,
  row,
}: TTableCellProps<TData>) => {
  const cellId = useId();
  const size = (getTdSize(cell) ?? 0) + 1;
  const width = `${size}px`;
  const style = size ? { minWidth: width, width } : {};
  const placeholderBackground = cell.getIsPlaceholder()
    ? styles.groupedH
    : 'inherit';
  const aggregatedBackground = cell.getIsAggregated()
    ? styles.groupedV
    : placeholderBackground;
  const styleBackground = cell.getIsGrouped()
    ? styles.groupedH
    : aggregatedBackground;

  const getCell = (isAggregated: boolean = false) => {
    const cellType = cell.column?.columnDef?.meta?.type ?? 'string';
    if (cell.column?.columnDef?.meta?.shouldUseDefaultCell)
      return isAggregated ? <></> : cell.column.columnDef.cell;

    switch (cellType) {
      case 'boolean':
        return <TableCheckbox info={cell.getContext()} />;
      case 'currency':
        return (
          <NumericDisplay
            output={'currency'}
            value={cell.getValue() as number}
          />
        );
      case 'number':
        return <NumericDisplay value={cell.getValue() as number} />;
      case 'string':
      case 'text':
      default:
        return <SpanDisplay value={cell.getValue() as ReactNode} />;
    }
  };

  const getNotAggregatedCell = () =>
    cell.getIsPlaceholder()
      ? null // For cells with repeated values, render null
      : // Otherwise, just render the regular cell
        flexRender(getCell(false), cell.getContext());

  const getNotGroupedCell = () =>
    cell.getIsAggregated()
      ? // If the cell is aggregated, use the Aggregated
        // renderer for cell
        flexRender(getCell(true), cell.getContext())
      : getNotAggregatedCell();

  const mergeEffect = cell.getIsGrouped() ? styles.borderTop : '';

  return (
    <td
      key={`td-${cell.id}-${cellId}`}
      className={joinArray([styleBackground, mergeEffect])}
      style={style}
    >
      {cell.getIsGrouped() ? (
        <ButtonGrouped
          cell={cell}
          row={row}
        />
      ) : (
        getNotGroupedCell()
      )}
    </td>
  );
};

export default TableCell;
