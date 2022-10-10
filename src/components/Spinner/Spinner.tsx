// Styles
import { SpinnerStyled } from './Spinner.styled';

type SpinnerProps = {
  size?: 'md' | 'lg' | 'sm';
};

const Spinner = ({ size = 'md' }: SpinnerProps) => <SpinnerStyled size={size} />;

export default Spinner;
