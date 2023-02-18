// assets
import { checkImg, errorImg, infoImg, warningImg } from 'assets';
// types
import type { MouseEventHandler, ReactNode } from 'react';
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
        id,
        title: title || 'Success',
        description: description,
        backgroundColor: '#5cb85c',
        icon: checkImg,
        onClose,
        onAccept,
        isConfirmation
      };
      break;
    case 'danger':
    case 'error':
      notificationProperties = {
        id,
        title: title || 'Danger',
        description: description,
        backgroundColor: '#d9534f',
        icon: errorImg,
        onClose,
        onAccept,
        isConfirmation
      };
      break;
    case 'info':
      notificationProperties = {
        id,
        title: title || 'Info',
        description: description,
        backgroundColor: '#5bc0de',
        icon: infoImg,
        onClose,
        onAccept,
        isConfirmation
      };
      break;
    case 'warning':
      notificationProperties = {
        id,
        title: title || 'Warning',
        description: description,
        backgroundColor: '#f0ad4e',
        icon: warningImg,
        onClose,
        onAccept,
        isConfirmation
      };
      break;
    default:
      notificationProperties = {
        id,
        title: title || 'Default',
        description: description,
        backgroundColor: '#5bc0de',
        onClose,
        onAccept,
        isConfirmation
      };
      break;
  }
  return notificationProperties;
};
