import { joinArray } from 'utilities';

import { NoAvailableData } from 'components/NoAvailableData';

import { TableCell } from '../TableCell';
import { VirtualPaddingTd } from '../VirtualPaddingTd';

import type { TTableBodyProps } from './TableBody.types';

import styles from './TableBody.module.css';
const TableBody = <TData extends Record<string, unknown>>({
  columnVirtualizer,
  rows,
  rowVirtualizer,
}: TTableBodyProps<TData>) => {
  const virtualColumns = columnVirtualizer.getVirtualItems();
  const virtualRows = rowVirtualizer.getVirtualItems();

  if (!rows.length) {
    return (
      <tbody className={styles.bodyForNotAvailable}>
        <tr>
          <td>
            <NoAvailableData />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        const visibleCells = row.getVisibleCells();

        return (
          <tr
            key={`tr-${virtualRow.index}-${row.id}-${row.parentId ?? ''}`}
            ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
            className={joinArray([
              styles.trWrapper,
              row.getIsExpanded() ? styles.isExpanded : '',
            ])}
            data-index={virtualRow.index} //needed for dynamic row height measurement
            style={{
              transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
            }}
          >
            <VirtualPaddingTd
              columnVirtualizer={columnVirtualizer}
              isLeft={true}
            />
            {virtualColumns.map((vc) => {
              const cell = visibleCells[vc.index];
              return (
                <TableCell<TData>
                  key={`${row.id}-${row.parentId ?? ''}-${vc.index}-${
                    virtualRow.index
                  }`}
                  cell={cell}
                  row={row}
                />
              );
            })}
            <VirtualPaddingTd columnVirtualizer={columnVirtualizer} />
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
