import { useState } from 'react';
import { IoMdHelpCircle } from 'react-icons/io';

import type { TPopoverProps } from './Popover.types';
import { PopoverContent } from './PopoverContent';

import styles from './Popover.module.css';

const Popover = ({ content, positionAbsolute }: TPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);

  return (
    <div
      className={styles.infoIcon}
      onMouseOut={onClose}
      onMouseOver={onOpen}
    >
      <IoMdHelpCircle />
      {isVisible && (
        <PopoverContent positionAbsolute={positionAbsolute}>
          {content}
        </PopoverContent>
      )}
    </div>
  );
};

export default Popover;
