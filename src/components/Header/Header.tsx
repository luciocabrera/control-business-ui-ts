import { memo, ReactElement } from 'react';
import { HeaderStyled } from './Header.styled';
import { HeaderProps } from './Header.types';

const getIcon = (icon?: ReactElement | string) => (typeof icon === 'string' ? <img src={icon} alt="" /> : icon);

const Header = memo(({ icon, title, subtitle, children, isTable, onClose }: HeaderProps) => (
  <HeaderStyled isTable={isTable}>
    {/* {icon && <img src={icon} alt={title} />} */}
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
