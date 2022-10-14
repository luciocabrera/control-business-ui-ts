// Styles
import { SpinnerStyled } from './Spinner.styled';
// react
import { memo } from 'react';

type SpinnerProps = {
  size?: 'md' | 'lg' | 'sm';
};

const Spinner = memo(({ size = 'md' }: SpinnerProps) => <SpinnerStyled size={size} />);

export default Spinner;
