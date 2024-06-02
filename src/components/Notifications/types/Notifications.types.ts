import type { MouseEventHandler, ReactNode } from 'react';

export type TNotification = {
  id: number;
  title?: string;
  description?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement> | (() => void);
  onAccept?: () => void;
  backgroundColor: string;
  icon?: string;
  isConfirmation?: boolean;
};

export type TNotificationType =
  'danger' | 'error' | 'info' | 'success' | 'warning';

export type TNotifications = {
  notifications?: TNotification[];
};
