import { ReactElement } from 'react';

import { styles } from './styles';
import type { HeaderProps } from './types';

const getIcon = (icon?: ReactElement | string) =>
  typeof icon === 'string' ? (
    <img
      alt=''
      src={icon}
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
        className={styles.close}
        data-dismiss='modal'
        type='button'
        onClick={onClose}
      >
        &times;
      </button>
    )}
  </header>
);

Header.displayName = 'Header';

export default Header;
