import type { TMainHeaderProps } from './MainHeader.types';

import styles from './MainHeader.module.css';

const MainHeader = ({
  children,
  className,
  title,
  topRadius = false,
}: TMainHeaderProps) => (
  <section
    className={`${styles.container} ${className ?? ''} ${
      topRadius ? styles.radius : ''
    }`}
  >
    <div>{title && <span>{title}</span>}</div>
    {children && <section className={styles.toolbar}>{children}</section>}
  </section>
);

export default MainHeader;
