import { ReactNode } from 'react';
import { checkImg, errorImg, infoImg, warningImg } from 'assets';

import type { TToast, TToastType } from '../types';

export const getToast = (
  description: ReactNode,
  title: string,
  type: TToastType
): TToast => {
  let toastProperties = null;
  const id = Math.floor(Math.random() * 101 + 1);

  switch (type) {
    case 'success':
      toastProperties = {
        backgroundColor: '#5cb85c',
        description: description,
        icon: checkImg,
        id,
        title: title || 'Success',
      };
      break;
    case 'danger':
    case 'error':
      toastProperties = {
        backgroundColor: '#d9534f',
        description: description,
        icon: errorImg,
        id,
        title: title || 'Danger',
      };
      break;
    case 'info':
      toastProperties = {
        backgroundColor: '#5bc0de',
        description: description,
        icon: infoImg,
        id,
        title: title || 'Info',
      };
      break;
    case 'warning':
      toastProperties = {
        backgroundColor: '#f0ad4e',
        description: description,
        icon: warningImg,
        id,
        title: title || 'Warning',
      };
      break;
    default:
      toastProperties = {
        backgroundColor: '#5bc0de',
        description: description,
        icon: infoImg,
        id,
        title: title || 'Default',
      };
      break;
  }
  return toastProperties;
};
