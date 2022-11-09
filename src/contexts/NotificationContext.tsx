// components
import { Notification } from 'components';
// hooks
import { useContextSelector, useCallback, useState } from 'hooks';
// utilities
import { createContext, getNotification } from 'utilities';
// types
import type {
  ReactNode,
  NotificationType,
  NotificationTypeType,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'types';

type NotificationContextType = {
  addNotification: (
    description: ReactNode,
    title: string,
    type: NotificationTypeType,
    onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>>,
    onAccept?: () => void,
    isConfirmation?: boolean,
  ) => void;
  deleteNotification: (id: number) => void;
  notifications?: NotificationType[];
};
type NotificationContextProviderProps = {
  children: ReactNode;
};

const useNotificationContext = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const deleteNotification = useCallback(
    (id: number) => {
      const NotificationListItem = notifications.findIndex((e: NotificationType) => e.id === id);

      notifications.splice(NotificationListItem, 1);
      setNotifications([...notifications]);
    },
    [notifications],
  );

  const addNotification = useCallback(
    (
      description: ReactNode,
      title: string,
      type: NotificationTypeType,
      onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>>,
      onAccept?: () => void,
      isConfirmation?: boolean,
    ) => {
      const notification = getNotification(description, title, type, onClose, onAccept, isConfirmation);
      if (notification) setNotifications((prev) => [...prev, notification]);
    },
    [],
  );

  return {
    notifications,
    addNotification: useCallback(addNotification, [addNotification]),
    deleteNotification: useCallback(deleteNotification, [deleteNotification]),
  };
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => (
  <NotificationContext.Provider value={useNotificationContext()}>
    {children}
    <Notification />
  </NotificationContext.Provider>
);

export const useAddNotification = () => useContextSelector(NotificationContext, (s) => s?.addNotification);
export const useDeleteNotification = () => useContextSelector(NotificationContext, (s) => s?.deleteNotification);
export const useNotifications = () => useContextSelector(NotificationContext, (s) => s?.notifications);
