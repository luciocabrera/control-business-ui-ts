import { memo, type RefObject } from 'react';
import { isInfiniteResponse, useDebounce } from 'hooks';

import ReadOnlyTable from '../ReadOnlyTable/ReadOnlyTable';
import type { TableWithDataHook } from '../table.types';

const ReadOnlyHookedTable = <TData extends Record<string, unknown>>({
  actions,
  columns,
  height,
  renderSubComponent,
  getRowCanExpand,
  showHeader = true,
  dataHook,
}: TableWithDataHook<TData>) => {
  const isInfinite = isInfiniteResponse(dataHook);

  // TODO: Implement error handling
  const { data, isLoading } = dataHook;

  const useFetchMoreOnBottomReached = (childRef: RefObject<HTMLDivElement>) =>
    useDebounce(() => {
      if (childRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = childRef.current;
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (isInfinite) {
          const { isReachingEnd } = dataHook;
          if (
            scrollHeight - scrollTop - clientHeight < 300 &&
            !isLoading &&
            !isReachingEnd
          ) {
            void dataHook.setSize?.((prev: number) => prev + 1);
          }
        }
      }
    }, 500);

  return (
    <ReadOnlyTable<TData>
      actions={actions}
      data={data}
      columns={columns}
      manualFiltering={isInfinite}
      manualSorting={isInfinite}
      isLoading={isLoading}
      showHeader={showHeader}
      height={height}
      renderSubComponent={renderSubComponent}
      getRowCanExpand={getRowCanExpand}
      fetchMoreOnBottomReached={useFetchMoreOnBottomReached}
    />
  );
};

export default memo(ReadOnlyHookedTable) as typeof ReadOnlyHookedTable;
