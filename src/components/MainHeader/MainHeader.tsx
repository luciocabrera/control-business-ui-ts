import type { TMainHeaderProps } from './MainHeader.types';

import styles from './MainHeader.module.css';

const MainHeader = ({
  actions,
  children,
  className,
  showTopRadius = false,
  title,
}: TMainHeaderProps) => (
  <section
    className={`${styles.container} ${className ?? ''} ${
      showTopRadius ? styles.radius : ''
    }`}
  >
    <div className={styles.titleContainer}>
      {title && <span>{title}</span>}
      {actions}
    </div>
    {children && <section className={styles.toolbar}>{children}</section>}
  </section>
);

export default MainHeader;
