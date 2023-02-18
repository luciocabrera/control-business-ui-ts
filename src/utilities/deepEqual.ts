import { isObject } from 'utilities';

export const deepEqual = <T>(object1: T, object2: T) => {
  const keys1 = Object.keys(object1 as Record<string, unknown>);
  const keys2 = Object.keys(object2 as Record<string, unknown>);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key as keyof T];
    const val2 = object2[key as keyof T];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};
