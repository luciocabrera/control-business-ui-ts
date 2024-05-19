import { ButtonStyled } from './styles';
import type { ButtonProps } from './types';

export const Button = ({
  children,
  id,
  inverse = false,
  onClick,
  warning = false,
}: ButtonProps) => (
  <ButtonStyled
    id={id}
    inverse={inverse}
    type='button'
    warning={warning}
    onClick={onClick}
  >
    {children}
  </ButtonStyled>
);

Button.displayName = 'Button';

export default Button;
