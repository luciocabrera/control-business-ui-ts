// types
import type { DateOutputType, DateParameterType } from 'types';
// utilities
import { getDateAsString } from 'utilities';

type DateDisplayProps = {
  date?: DateParameterType;
  output?: DateOutputType;
  utc?: boolean;
};

const DateDisplay = ({ date, output, utc }: DateDisplayProps) => <>{getDateAsString(date, output, utc)}</>;

export default DateDisplay;
