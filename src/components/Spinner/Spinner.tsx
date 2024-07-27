import { SpinnerStyled } from './Spinner.styled';

type SpinnerProps = {
  size?: 'lg' | 'md' | 'sm';
};

const Spinner = ({ size = 'md' }: SpinnerProps) => (
  <SpinnerStyled size={size} />
);

Spinner.displayName = 'Spinner';

export default Spinner;
