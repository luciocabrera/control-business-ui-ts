import { memo, ReactElement } from 'react';
// styles
import { HeaderStyled } from './Header.styled';
// types
import type { HeaderProps } from './Header.types';

const getIcon = (icon?: ReactElement | string) => (typeof icon === 'string' ? <img src={icon} alt="" /> : icon);

const Header = memo(({ icon, title, subtitle, children, isTable, onClose }: HeaderProps) => (
  <HeaderStyled isTable={isTable}>
    {icon && getIcon(icon)}
    <div className="title-content">
      {title && <span>{title}</span>}
      {subtitle && <span>{subtitle}</span>}
    </div>
    {children && <div className="children-content">{children}</div>}
    {onClose && (
      <button type="button" onClick={onClose} className="close" data-dismiss="modal">
        &times;
      </button>
    )}
  </HeaderStyled>
));

export default Header;
