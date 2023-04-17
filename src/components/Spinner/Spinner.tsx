// Styles
// react
import { memo } from 'react';

import { SpinnerStyled } from './Spinner.styled';

type SpinnerProps = {
  size?: 'md' | 'lg' | 'sm';
};

const Spinner = memo(({ size = 'md' }: SpinnerProps) => (
  <SpinnerStyled size={size} />
));

Spinner.displayName = 'Spinner';

export default Spinner;
