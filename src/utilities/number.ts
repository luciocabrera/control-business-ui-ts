import { getLanguage } from 'utilities';

export const getFormattedNumber = (
  value?: number | string,
  output: 'currency' | 'number' = 'number'
): string => {
  const sanitizedValue = (value as number) ?? 0;

  const locale = getLanguage();

  switch (output) {
    case 'currency':
      return new Intl.NumberFormat(locale, {
        currency: 'EUR',
        style: 'currency',
      }).format(sanitizedValue);
    case 'number':
    default:
      return new Intl.NumberFormat().format(sanitizedValue);
    // Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces);
  }
};

export const parseToNumber = (value: number | string, decimalPlaces = 2) => {
  const decimalPlacesString = decimalPlaces.toString();
  const valueString = typeof value === 'number' ? value.toString() : value;
  const mathRounded = Math.round(
    parseFloat(`${valueString}e${decimalPlacesString}`)
  ).toString();

  return Number(`${mathRounded}e${decimalPlacesString}`);
};
