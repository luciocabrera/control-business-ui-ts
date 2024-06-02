import { ButtonStyled } from './IconButton.styled';
import { ButtonProps } from './IconButton.types';

export const IconButton = ({
  disabled = false,
  icon,
  id,
  onClick,
  title = 'button',
}: ButtonProps) => (
  <ButtonStyled
    id={id}
    onClick={onClick}
    type='button'
    title={title}
    disabled={disabled}
  >
    {icon}
  </ButtonStyled>
);

IconButton.displayName = 'IconButton';

export default IconButton;
