// styles
import { ButtonStyled } from './Button.styled';
// types
import { ButtonProps } from './Button.types';
// react
import { memo } from 'react';

export const Button = memo(({ children, onClick, inverse = false, warning = false, id }: ButtonProps) => (
  <ButtonStyled id={id} onClick={onClick} inverse={inverse} type="button" warning={warning}>
    {children}
  </ButtonStyled>
));

export default Button;
