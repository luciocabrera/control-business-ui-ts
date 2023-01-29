export type DateParameterType = Date | string;
export type DateOutputType = 'date' | 'datetime';

export const getDiffInSeconds = (dt2: DateParameterType, dt1: DateParameterType) => {
  const sanitizeDt2 = dt2 instanceof Date ? dt2 : new Date(dt2);
  const sanitizeDt1 = dt1 instanceof Date ? dt1 : new Date(dt1);
  const diff = (sanitizeDt2.getTime() - sanitizeDt1.getTime()) / 1000;
  return Math.abs(Math.round(diff));
};

export const getDateAsString = (
  date?: DateParameterType,
  output: DateOutputType = 'date',
  iso: boolean = false,
): string => {
  if (!date) return '';

  const jsDate = date instanceof Date ? date : new Date(date);

  switch (output) {
    case 'date':
      return iso ? jsDate.toISOString().slice(0, 10) : jsDate.toLocaleDateString();
    case 'datetime':
    default:
      return iso ? jsDate.toISOString() : jsDate.toLocaleString();
  }
};

export const isDateBetween = ({ dateToCheck, from, to }: { dateToCheck: string | Date; from: Date; to: Date }) => {
  const d = new Date(dateToCheck);
  return from <= d && d <= to;
};
