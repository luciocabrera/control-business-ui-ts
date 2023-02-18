export const isEmpty = (value: unknown) => {
  if (typeof value === 'number') return false;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object')
    return value == null || Object.keys(value).length === 0;
  if (typeof value === 'boolean') return false;
  return !value;
};
