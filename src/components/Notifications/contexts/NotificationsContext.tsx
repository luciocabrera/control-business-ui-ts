// components
import Notifications from '../Notifications';
// hooks
import { type TStoreReturn, type UsesStore, useStore } from 'hooks/useStore';
// react
import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback
} from 'react';
// types
import type { MouseEventHandler, ReactNode } from 'react';
import type {
  TNotification,
  TNotificationType,
  TNotifications
} from '../types';
// utilities
import { getNotification } from '../utilities';

type NotificationsContextProviderProps = {
  children: ReactNode;
};

const NotificationsContext = createContext<TStoreReturn | null>(null);

export const useNotificationsStore = <
  SelectorOutput,
  TDataType = TNotifications
>(
  selector: (store: TDataType) => SelectorOutput
): UsesStore<SelectorOutput, TDataType> => {
  const store = useContext(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get() as TDataType)
  );

  return [state, store.set];
};

export const useAddNotification = () => {
  const store = useContext(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return useCallback(
    (
      description: ReactNode,
      title: string,
      type: TNotificationType,
      onClose?: MouseEventHandler<HTMLButtonElement>,
      onAccept?: (() => void) | (() => Promise<void>),
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
      const notifications = (store.get()?.notifications ??
        []) as TNotification[];
      if (notification)
        store.set({ notifications: [...notifications, notification] });
    },
    [store]
  );
};

export const useDeleteNotification = () => {
  const store = useContext(NotificationsContext);
  if (!store) {
    throw new Error('Store not found');
  }

  return useCallback(
    (id: number) => {
      const notifications = (store.get()?.notifications ??
        []) as TNotification[];
      const newNotifications = notifications.filter(
        (notification) => notification.id !== id
      );

      store.set({ notifications: newNotifications });
    },
    [store]
  );
};

export const NotificationsContextProvider = ({
  children
}: NotificationsContextProviderProps) => (
  <NotificationsContext.Provider value={useStore<TNotifications>()}>
    {children}
    <Notifications />
  </NotificationsContext.Provider>
);
