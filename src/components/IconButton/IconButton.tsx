// styles
import { ButtonStyled } from './IconButton.styled';
// types
import { ButtonProps } from './IconButton.types';
// react
import { memo } from 'react';

export const IconButton = memo(({ onClick, src, inverse = false, warning = false, id }: ButtonProps) => (
  <ButtonStyled id={id} onClick={onClick} type="button">
    <img src={src} alt="" width="18" height="18" />
  </ButtonStyled>
));

export default IconButton;
