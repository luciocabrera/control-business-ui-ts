import { ButtonStyled } from './styles';
import type { ButtonProps } from './types';

export const Button = ({
  children,
  id,
  inverse = false,
  warning = false,
  ...props
}: ButtonProps) => (
  <ButtonStyled
    id={id}
    inverse={inverse}
    type='button'
    warning={warning}
    {...props}
  >
    {children}
  </ButtonStyled>
);

Button.displayName = 'Button';

export default Button;
