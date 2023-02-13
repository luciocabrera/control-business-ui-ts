import type { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from 'react';

export type TNotification = {
  id: number;
  title?: string;
  description?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>> | (() => void);
  onAccept?: () => void;
  backgroundColor: string;
  icon?: string;
  isConfirmation?: boolean;
};

export type TNotificationType = 'success' | 'danger' | 'info' | 'warning' | 'error';

export type TNotifications = {
  notifications?: TNotification[];
};
