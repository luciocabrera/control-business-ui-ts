import { ReactElement } from 'react';

import { styles } from './styles';
import type { HeaderProps } from './types';

const getIcon = (icon?: ReactElement | string) =>
  typeof icon === 'string' ? (
    <img
      src={icon}
      alt=''
    />
  ) : (
    icon
  );

const Header = ({ children, icon, onClose, subtitle, title }: HeaderProps) => (
  <header className={styles.header}>
    {icon && getIcon(icon)}
    <div className={styles.titleContent}>
      {title && <span>{title}</span>}
      {subtitle && <span>{subtitle}</span>}
    </div>
    {children && <div className={styles.childrenContent}>{children}</div>}
    {onClose && (
      <button
        type='button'
        onClick={onClose}
        className={styles.close}
        data-dismiss='modal'
      >
        &times;
      </button>
    )}
  </header>
);

Header.displayName = 'Header';

export default Header;
