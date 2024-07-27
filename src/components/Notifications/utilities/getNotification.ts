import type { MouseEventHandler, ReactNode } from 'react';
import { checkImg, errorImg, infoImg, warningImg } from 'assets';

import type { TNotification, TNotificationType } from '../types';

export const getNotification = (
  description: ReactNode,
  title: string,
  type: TNotificationType,
  onClose?: MouseEventHandler<HTMLButtonElement>,
  onAccept?: () => void,
  isConfirmation?: boolean
): TNotification => {
  let notificationProperties = null;
  const id = Math.floor(Math.random() * 101 + 1);

  switch (type) {
    case 'success':
      notificationProperties = {
        backgroundColor: '#5cb85c',
        description: description,
        icon: checkImg,
        id,
        isConfirmation,
        onAccept,
        onClose,
        title: title || 'Success',
      };
      break;
    case 'danger':
    case 'error':
      notificationProperties = {
        backgroundColor: '#d9534f',
        description: description,
        icon: errorImg,
        id,
        isConfirmation,
        onAccept,
        onClose,
        title: title || 'Danger',
      };
      break;
    case 'info':
      notificationProperties = {
        backgroundColor: '#5bc0de',
        description: description,
        icon: infoImg,
        id,
        isConfirmation,
        onAccept,
        onClose,
        title: title || 'Info',
      };
      break;
    case 'warning':
      notificationProperties = {
        backgroundColor: '#f0ad4e',
        description: description,
        icon: warningImg,
        id,
        isConfirmation,
        onAccept,
        onClose,
        title: title || 'Warning',
      };
      break;
    default:
      notificationProperties = {
        backgroundColor: '#5bc0de',
        description: description,
        id,
        isConfirmation,
        onAccept,
        onClose,
        title: title || 'Default',
      };
      break;
  }
  return notificationProperties;
};
