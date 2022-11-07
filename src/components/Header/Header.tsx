import { memo } from 'react';
import { HeaderStyled } from './Header.styled';
import { HeaderProps } from './Header.types';

const Header = memo(({ icon, title, subtitle, children, isTable, onClose }: HeaderProps) => (
  <HeaderStyled isTable={isTable}>
    {icon && <img src={icon} alt={title} />}
    <div id="title-content">
      {title && <h1>{title}</h1>}
      {subtitle && <span>{subtitle}</span>}
    </div>
    {children && <div id="children-content">{children}</div>}
    {onClose && (
      <button type="button" onClick={onClose} className="close" data-dismiss="modal">
        &times;
      </button>
    )}
  </HeaderStyled>
));

export default Header;
