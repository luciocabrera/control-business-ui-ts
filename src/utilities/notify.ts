import { ReactNode } from 'react';
import { checkImg, errorImg, infoImg, warningImg } from 'assets';
import type { ToastType, ToastTypeType } from 'types';

export const notify = (description: ReactNode, title: string, type: ToastTypeType): ToastType => {
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
      };
      break;
    case 'info':
      toastProperties = {
        id,
        title: title || 'Info',
        description: description,
        backgroundColor: '#5bc0de',
        icon: infoImg,
      };
      break;
    case 'warning':
      toastProperties = {
        id,
        title: title || 'Warning',
        description: description,
        backgroundColor: '#f0ad4e',
        icon: warningImg,
      };
      break;
    default:
      toastProperties = {
        id,
        title: title || 'Default',
        description: description,
        backgroundColor: '#5bc0de',
        icon: infoImg,
      };
      break;
  }
  return toastProperties;
};
