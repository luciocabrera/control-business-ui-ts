export const isObject = (object: unknown): boolean =>
  typeof object === 'object' && !Array.isArray(object) && object !== null;
