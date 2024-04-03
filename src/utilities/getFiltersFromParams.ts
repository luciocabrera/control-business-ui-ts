export type TFilter = {
  accessor: string;
  condition: string;
  type: string;
  value: string;
};

export const getFiltersFromParams = (filter: string): TFilter[] | undefined => {
  const filters = filter.split('&');

  return filters
    .map((f) => {
      const decoded = decodeURIComponent(f);

      const splitted = decoded.split('|');

      const accessor = splitted[0] ?? '';
      const type = splitted[1] ?? '';
      const condition = splitted[2] ?? '';
      const value = splitted[3] ?? '';

      return {
        accessor,
        condition,
        type,
        value,
      };
    })
    .filter((f) => f.accessor);
};
