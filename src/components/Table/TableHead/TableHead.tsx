import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import { FilterIcon } from 'icons';

import cls from '../table.module.css';

type TableHeadType<TData> = { headerGroups: HeaderGroup<TData>[] };

const TableHead = <TData extends Record<string, unknown>>({
  headerGroups,
}: TableHeadType<TData>) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <th
              key={header.id}
              style={{ width: header.getSize(), maxWidth: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  className={cls['header-wrapper']}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <span>&#8593;</span>,
                    desc: <span>&#8595;</span>,
                  }[header.column.getIsSorted() as string] ?? null}

                  {header.column.getIsFiltered() ? (
                    <FilterIcon className={cls['header-icon']} />
                  ) : null}
                </div>
              )}
              {header.column.getCanResize() && (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={[
                    cls['resizer'],
                    cls[header.column.getIsResizing() ? 'isResizing' : ''],
                  ].join(' ')}
                />
              )}
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);
export default TableHead;
