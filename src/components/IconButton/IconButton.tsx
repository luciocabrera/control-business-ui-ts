// styles
import { ButtonStyled } from './IconButton.styled';
// types
import { ButtonProps } from './IconButton.types';
// react
import { memo } from 'react';

export const IconButton = memo(({ onClick, icon, disabled = false, id }: ButtonProps) => (
  <ButtonStyled id={id} onClick={onClick} type="button" disabled={disabled}>
    {icon}
  </ButtonStyled>
));

export default IconButton;
