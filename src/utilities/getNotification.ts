import { checkImg, errorImg, infoImg, warningImg } from 'assets';
import type {
  Dispatch,
  MouseEventHandler,
  NotificationType,
  NotificationTypeType,
  ReactNode,
  SetStateAction,
} from 'types';

export const getNotification = (
  description: ReactNode,
  title: string,
  type: NotificationTypeType,
  onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>>,
  onAccept?: () => void,
  isConfirmation?: boolean,
): NotificationType => {
  let toastProperties = null;
  const id = Math.floor(Math.random() * 101 + 1);

  switch (type) {
    case 'success':
      toastProperties = {
        id,
        title: title || 'Success',
        description: description,
        backgroundColor: '#5cb85c',
        icon: checkImg,
        onClose,
        onAccept,
        isConfirmation,
      };
      break;
    case 'danger':
    case 'error':
      toastProperties = {
        id,
        title: title || 'Danger',
        description: description,
        backgroundColor: '#d9534f',
        icon: errorImg,
        onClose,
        onAccept,
        isConfirmation,
      };
      break;
    case 'info':
      toastProperties = {
        id,
        title: title || 'Info',
        description: description,
        backgroundColor: '#5bc0de',
        icon: infoImg,
        onClose,
        onAccept,
        isConfirmation,
      };
      break;
    case 'warning':
      toastProperties = {
        id,
        title: title || 'Warning',
        description: description,
        backgroundColor: '#f0ad4e',
        icon: warningImg,
        onClose,
        onAccept,
        isConfirmation,
      };
      break;
    default:
      toastProperties = {
        id,
        title: title || 'Default',
        description: description,
        backgroundColor: '#5bc0de',
        onClose,
        onAccept,
        isConfirmation,
      };
      break;
  }
  return toastProperties;
};
