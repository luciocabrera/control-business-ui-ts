import { joinArray } from 'utilities';

import type { TPopoverContentProps } from './PopoverContent.types';

import styles from './PopoverContent.module.css';

const PopoverContent = ({
  children,
  positionAbsolute,
}: TPopoverContentProps) => (
  <div
    className={joinArray([
      styles.container,
      positionAbsolute ? styles.containerAbsolute : styles.containerFixed,
    ])}
  >
    <div className={styles.childrenContainer}>{children}</div>
  </div>
);

export default PopoverContent;
