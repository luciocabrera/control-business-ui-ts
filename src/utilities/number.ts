import { getLanguage } from 'utilities';

export const getFormattedNumber = (value?: string | number, output: 'currency' | 'number' = 'number'): string => {
  const sanitizedValue = (value as number) ?? 0;

  const locale = getLanguage();

  switch (output) {
    case 'currency':
      return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(sanitizedValue);
    case 'number':
    default:
      return new Intl.NumberFormat().format(sanitizedValue);
  }
};
