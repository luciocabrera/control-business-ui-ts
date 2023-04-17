// styles
// react
import { memo } from 'react';

import { ButtonStyled } from './IconButton.styled';
// types
import { ButtonProps } from './IconButton.types';

export const IconButton = memo(
  ({ onClick, icon, disabled = false, id, title = 'button' }: ButtonProps) => (
    <ButtonStyled
      id={id}
      onClick={onClick}
      type='button'
      title={title}
      disabled={disabled}
    >
      {icon}
    </ButtonStyled>
  )
);

IconButton.displayName = 'IconButton';

export default IconButton;
