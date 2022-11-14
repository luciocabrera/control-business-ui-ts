// styles
import { ButtonStyled } from './IconButton.styled';
// types
import { ButtonProps } from './IconButton.types';
// react
import { memo } from 'react';

export const IconButton = memo(
  ({ onClick, src, icon, disabled = false, inverse = false, warning = false, id }: ButtonProps) => (
    <ButtonStyled id={id} onClick={onClick} type="button" disabled={disabled}>
      {icon}
    </ButtonStyled>
  ),
);

export default IconButton;
