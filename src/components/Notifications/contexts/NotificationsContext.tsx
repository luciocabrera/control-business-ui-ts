import type { MouseEventHandler, ReactNode } from 'react';
import { createContext, use, useSyncExternalStore } from 'react';
import { type TStoreReturn, type UsesStore, useStore } from 'hooks/useStore';

import Notifications from '../Notifications';
import type {
  TNotification,
  TNotifications,
  TNotificationType,
} from '../types';
import { getNotification } from '../utilities';

type NotificationsContextProviderProps = {
  children: ReactNode;
};

const NotificationsContext = createContext<TStoreReturn | null>(null);

export const useNotificationsStore = <
  SelectorOutput,
  TDataType = TNotifications,
>(
  selector: (store: TDataType) => SelectorOutput
): UsesStore<SelectorOutput, TDataType> => {
  const store = use(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get() as TDataType)
  );

  return [state, store.set];
};

export const useAddNotification = () => {
  const store = use(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return (
    description: ReactNode,
    title: string,
    type: TNotificationType,
    onClose?: MouseEventHandler<HTMLButtonElement>,
    onAccept?: (() => Promise<void>) | (() => void),
    isConfirmation?: boolean
  ) => {
    const notification = getNotification(
      description,
      title,
      type,
      onClose,
      onAccept,
      isConfirmation
    );
    const notifications = (store.get()?.notifications ?? []) as TNotification[];
    if (notification)
      store.set({ notifications: [...notifications, notification] });
  };
};

export const useDeleteNotification = () => {
  const store = use(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return (id: number) => {
    const notifications = (store.get()?.notifications ?? []) as TNotification[];
    const newNotifications = notifications.filter(
      (notification) => notification.id !== id
    );

    store.set({ notifications: newNotifications });
  };
};

export const NotificationsContextProvider = ({
  children,
}: NotificationsContextProviderProps) => (
  <NotificationsContext value={useStore<TNotifications>()}>
    {children}
    <Notifications />
  </NotificationsContext>
);
