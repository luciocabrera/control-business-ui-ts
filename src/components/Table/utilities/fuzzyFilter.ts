/* eslint-disable @typescript-eslint/consistent-type-definitions */
// react table
import { FilterFn } from '@tanstack/react-table';

import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item

  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default fuzzyFilter;
