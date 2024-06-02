import { ButtonStyled } from './IconButton.styled';
import { ButtonProps } from './IconButton.types';

export const IconButton = ({
  disabled = false,
  icon,
  id,
  title = 'button',
  ...props
}: ButtonProps) => (
  <ButtonStyled
    disabled={disabled}
    id={id}
    title={title}
    type='button'
    {...props}
  >
    {icon}
  </ButtonStyled>
);

IconButton.displayName = 'IconButton';

export default IconButton;
