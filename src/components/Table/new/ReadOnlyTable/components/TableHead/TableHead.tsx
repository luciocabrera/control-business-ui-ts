import { HeaderGroup } from '../HeaderGroup';

import type { TTableHeadProps } from './TableHead.types';

const TableHead = <TData extends Record<string, unknown>>({
  headerGroups,
  parentRef,
}: TTableHeadProps<TData>) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <HeaderGroup<TData>
        key={`header-group-${headerGroup.id}`}
        headerGroup={headerGroup}
        parentRef={parentRef}
      />
    ))}
  </thead>
);

export default TableHead;
