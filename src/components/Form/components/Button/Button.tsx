// styles
import { ButtonStyled } from './styles';
// types
import type { ButtonProps } from './types';
// react
import { memo } from 'react';

export const Button = memo(
  ({
    children,
    onClick,
    inverse = false,
    warning = false,
    id
  }: ButtonProps) => (
    <ButtonStyled
      id={id}
      onClick={onClick}
      inverse={inverse}
      type='button'
      warning={warning}
    >
      {children}
    </ButtonStyled>
  )
);

Button.displayName = 'Button';

export default Button;
