import type { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from 'types';

export type NotificationType = {
  id: number;
  title?: string;
  description?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>> | (() => void);
  onAccept?: () => void;
  backgroundColor: string;
  icon?: string;
  isConfirmation?: boolean;
};

export type NotificationTypeType = 'success' | 'danger' | 'info' | 'warning' | 'error';
