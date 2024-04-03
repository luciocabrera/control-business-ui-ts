import { FaFilter } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import { flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getFiltersFromParams } from 'utilities/getFiltersFromParams';

import { Popover } from 'components/Popover';
import { getHeaderCalculatedSize } from 'components/Table/utilities/getHeaderCalculatedSize';

import { VirtualPaddingTd } from '../VirtualPaddingTd';

import type { THeaderGroupProps } from './HeaderGroup.types';

import styles from './HeaderGroup.module.css';

const HeaderGroup = <TData extends Record<string, unknown>>({
  headerGroup,
  parentRef,
}: THeaderGroupProps<TData>) => {
  const { headers, id } = headerGroup;

  const [searchParams] = useSearchParams();
  const where = searchParams.get('where') ?? '';
  const filters = getFiltersFromParams(where);

  const getIsFiltering = (id?: string) => {
    const index = filters?.findIndex((filter) => filter.accessor === id) ?? -1;

    return index >= 0;
  };

  const columnVirtualizer = useVirtualizer({
    count: headers.length,
    estimateSize: (index) => headers[index].getSize(),
    getScrollElement: () => parentRef.current,
    horizontal: true,
    overscan: 1,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <tr key={`tr-${id}`}>
      <VirtualPaddingTd
        columnVirtualizer={columnVirtualizer}
        isLeft={true}
      />
      {virtualColumns.map((vc) => {
        const header = headerGroup.headers[vc.index];
        const headerCalculatedSize = getHeaderCalculatedSize(header);
        const width = `${headerCalculatedSize}px`;

        const popover = header.column.columnDef.meta?.helpText;
        const isFiltering = getIsFiltering(header.id);

        return (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={{
              minWidth: width,
              width,
            }}
          >
            {header.isPlaceholder ? null : (
              <button
                {...{
                  className: `${styles.headerWrapper} ${isFiltering ? styles.isFiltering : ''}`,
                  onClick: header.column.getToggleSortingHandler(),
                }}
                type='button'
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: <span className={styles.sortingSpan}>&#8593;</span>,
                  desc: <span className={styles.sortingSpan}>&#8595;</span>,
                }[header.column.getIsSorted() as string] ?? null}

                {popover && (
                  <Popover
                    positionAbsolute
                    content={<div>{popover}</div>}
                  />
                )}
                {isFiltering && <FaFilter />}
              </button>
            )}
            {header.column.getCanGroup() ? (
              // If the header can be grouped, let's add a toggle
              <button
                {...{
                  onClick: header.column.getToggleGroupingHandler(),
                  style: {
                    cursor: 'pointer',
                  },
                }}
              >
                {header.column.getIsGrouped()
                  ? `🛑(${header.column.getGroupedIndex()}) `
                  : `👊 `}
              </button>
            ) : null}{' '}
            <span
              {...{
                className: `${styles.resizer} ${
                  header.column.getIsResizing() ? styles.isResizing : ''
                }`,
                onDoubleClick: () => header.column.resetSize(),
                onMouseDown: header.getResizeHandler(),
              }}
            />
          </th>
        );
      })}
      <VirtualPaddingTd columnVirtualizer={columnVirtualizer} />
    </tr>
  );
};

export default HeaderGroup;
