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
    disabled={disabled}
    id={id}
    title={title}
    type='button'
    onClick={onClick}
  >
    {icon}
  </ButtonStyled>
);

IconButton.displayName = 'IconButton';

export default IconButton;
