import { useEffect } from 'react';

import { Portal } from 'components';

import { useDeleteToast, useToastsStore } from './contexts';
import {
  Notification,
  NotificationContainer,
  NotificationImage,
  NotificationMessage,
  NotificationTitle,
} from './styles';
import { TToast, TToastProps, TToasts } from './types';

const Toasts = ({ position = 'bottomRight' }: TToastProps) => {
  const [toasts] = useToastsStore<TToast[] | undefined, TToasts>(
    (store) => store?.toasts
  );
  const deleteToast = useDeleteToast();

  const handleDeleteToast = (id: number) => {
    deleteToast?.(id);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts && toasts?.length > 0) {
        deleteToast(toasts[0].id);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [deleteToast, toasts]);

  return (
    <Portal>
      <NotificationContainer
        id='toast-container'
        position={position}
      >
        {toasts?.map((toast) => (
          <Notification
            key={toast.id}
            backgroundColor={toast.backgroundColor}
            position={position}
          >
            <button
              type='button'
              onClick={() => handleDeleteToast(toast.id)}
            >
              X
            </button>
            <NotificationImage>
              <img
                alt=''
                src={toast.icon}
              />
            </NotificationImage>
            <>
              <NotificationTitle>{toast.title}</NotificationTitle>
              <NotificationMessage>{toast.description}</NotificationMessage>
            </>
          </Notification>
        ))}
      </NotificationContainer>
    </Portal>
  );
};

export default Toasts;
