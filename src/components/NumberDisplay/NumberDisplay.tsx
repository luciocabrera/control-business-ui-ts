// utilities
import { getFormattedNumber, memo } from 'utilities';
import { NumberDisplayStyled } from './NumberDisplay.styles';

type NumberDisplayProps = {
  value?: string | number;
  output?: 'currency' | 'number';
};

const NumberDisplay = memo(({ value, output }: NumberDisplayProps) => (
  <NumberDisplayStyled>{getFormattedNumber(value, output)}</NumberDisplayStyled>
));

export default NumberDisplay;
