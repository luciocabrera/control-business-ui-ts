import { memo } from 'react';
import { isInfiniteResponse } from 'hooks';

import ReadOnlyTable from '../ReadOnlyTable/ReadOnlyTable';
import type { TableWithDataHook } from '../table.types';

const ReadOnlyHookedTable = <TData extends Record<string, unknown>>({
  // actions,
  columns,
  dataHook,
  getRowCanExpand,
  // height,
  // renderSubComponent,
  // showHeader = true,
}: TableWithDataHook<TData>) => {
  const isInfinite = isInfiniteResponse(dataHook);

  const { data, isLoading } = dataHook;

  return (
    <ReadOnlyTable<TData>
      // actions={actions}
      columns={columns}
      data={data}
      defaultColumnOrder={[]}
      getRowCanExpand={getRowCanExpand}
      hidden={[]}
      isInfinite={isInfinite}
      isLoading={isLoading}
      isReachingEnd={isInfinite ? dataHook.isReachingEnd : undefined}
      manualFiltering={isInfinite}
      manualSorting={isInfinite}
      setSize={isInfinite ? dataHook.setSize : undefined}
      visible={[]} // showHeader={showHeader}
      // height={height}

      // renderSubComponent={renderSubComponent}
    />
  );
};

export default memo(ReadOnlyHookedTable) as typeof ReadOnlyHookedTable;
