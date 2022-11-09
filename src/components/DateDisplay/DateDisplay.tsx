// types
import type { DateOutputType, DateParameterType } from 'types';
// utilities
import { getDateAsString, memo } from 'utilities';

type DateDisplayProps = {
  date?: DateParameterType;
  output?: DateOutputType;
  utc?: boolean;
};

const DateDisplay = memo(({ date, output, utc }: DateDisplayProps) => <>{getDateAsString(date, output, utc)}</>);

export default DateDisplay;
