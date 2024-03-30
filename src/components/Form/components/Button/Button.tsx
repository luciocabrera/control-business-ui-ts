import { memo } from 'react';

import { ButtonStyled } from './styles';
import type { ButtonProps } from './types';

export const Button = memo(
  ({
    children,
    onClick,
    inverse = false,
    warning = false,
    id,
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
