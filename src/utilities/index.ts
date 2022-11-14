export * from './api';
export * from './array';
export * from './json';
export * from './time';
export * from './language';
export * from './number';

export * from './validateFields';
export * from './validateFieldRules';
export * from './isEmpty';
export * from './json';

export * from './isObject';
export * from './deepEqual';

export * from './getInitialData';

export * from './getErrorField';

export * from './getToast';
export * from './getNotification';

export { createContext } from 'use-context-selector';

export { memo } from 'react';

// const dateFormatter = new Intl.DateTimeFormat(navigator.language);
// const currencyFormatter = new Intl.NumberFormat(navigator.language, {
//   style: 'currency',
//   currency: 'eur',
// });

// function TimestampFormatter({ timestamp }: { timestamp: number }) {
//   return <>{dateFormatter.format(timestamp)}</>;
// }

// function CurrencyFormatter({ value }: { value: number }) {
//   return <>{currencyFormatter.format(value)}</>;
// }
