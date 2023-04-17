export const groupBy = <T>(
  array: T[],
  groupingKey: ((item: T) => string) | string
) =>
  array.reduce((previous, currentItem) => {
    const group =
      typeof groupingKey === 'function'
        ? groupingKey(currentItem)
        : groupingKey;
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<string, T[]>);

export const groupByArrayToDataList = <T>(
  array: T[],
  groupingKey: ((item: T) => string) | string
) => {
  return array.reduce(
    (previous, currentItem: T) => {
      const group =
        typeof groupingKey === 'function'
          ? groupingKey(currentItem)
          : groupingKey;

      const groupInPrevious = previous.find(
        (r) =>
          r?.groupName === (currentItem[group as keyof T] as unknown as string)
      );
      if (groupInPrevious) {
        groupInPrevious.children.push(currentItem);
      } else {
        previous.push({
          groupName: currentItem[group as keyof T] as unknown as string,
          children: [currentItem],
        });
      }
      return previous;
    },
    [] as {
      groupName: string;
      children: T[];
    }[]
  );
};

/**
 * Sorts an array based on a property of type string.
 * This method mutates the array and returns a reference to the same array.
 * @param array Array to be sorted
 * @param sortingKey Key to be used to sort the array, the value must be string
 * @param order Order, defines how to sort the array, by default is ascending
 * ```ts
 * sortArrayBy([{"name":"apple", "color":"green"},{"name":"orange", "color":"orange"}],'name')
 * ```
 */
export const sortArrayBy = <T extends Record<string, unknown>>(
  array: T[],
  sortingKey: string,
  order: 'asc' | 'desc' = 'asc'
) => [...array].sort(sortBy(sortingKey, order));

/**
 * Sorts an array based on provided key and order .
 * This method mutates the array and returns a reference to the same array.
 * @param key Key to be used to sort the array, the value must be string
 * @param order Order, defines how to sort the array, by default is ascending
 * When comparing strings, upper case letters have a different weight than lower case letters and A would be, for instance, positioned after b.
 * It's generally considered good practice to equalize the strings to either all lowercase or all uppercase (more commonly, lowercase, due to efficiency).
 * ```ts
 * [{"name":"apple", "color":"green"},{"name":"orange", "color":"orange"}].sort(sortBy('name'))
 * ```
 */
export const sortBy =
  (key: string | number, order: 'asc' | 'desc' = 'asc') =>
  (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const valueA =
      typeof a[key] === 'number'
        ? (a[key] as number)
        : String(a[key]).toUpperCase();
    const valueB =
      typeof b[key] === 'number'
        ? (b[key] as number)
        : String(b[key]).toUpperCase();

    return compareValues(valueA, valueB, order);
  };
export const compareValues = (
  valueA: string | number,
  valueB: string | number,
  order: 'asc' | 'desc' | 'descend' | 'ascend' = 'asc'
) => {
  let comparison = 0;

  if (valueA > valueB) {
    comparison = 1;
  } else {
    comparison = valueB > valueA ? -1 : 0;
  }

  return order.startsWith('desc') ? comparison * -1 : comparison;
};

export const onSort = (a: string | number, b: string | number) => {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? '' : a;
  b = b === null || b === undefined ? '' : b;

  const numberDateA = getNumberDate(a);
  const numberDateB = getNumberDate(b);

  if (numberDateA !== null && numberDateB !== null) {
    a = numberDateA;
    b = numberDateB;
  } else {
    const isANumber = isNumber(a as string);
    const isBNumber = isNumber(b as string);

    if (isANumber !== true && isBNumber !== true) {
      // force any string values to lowercase
      a = typeof a === 'string' ? a.toLowerCase() : a;
      b = typeof b === 'string' ? b.toLowerCase() : b;
    }
  }

  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  return 0;
};

export const getNumberDate = (value: Date | string | number) => {
  const jsDate = value ? new Date(value) : undefined;

  if (!jsDate) return 0;

  const isValidDate = jsDate instanceof Date;
  const numberDate = isValidDate === true ? jsDate.getTime() : null;

  return numberDate;
};

export const isNumber = (value: string) => {
  return !isNaN(parseInt(value, 10));
};

export const filter = (
  value: string | number | boolean,
  recordValue: string | number
) => {
  const searchValue = String(value).toLowerCase().trim();
  if (!recordValue) return false;

  return String(recordValue).toLowerCase().includes(searchValue);
};
