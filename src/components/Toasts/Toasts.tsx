// components
import { Portal } from 'components';
// contexts
import { useDeleteToast, useToastsStore } from './contexts';
// react
import { useCallback, useEffect } from 'react';
// styles
import {
  Notification,
  NotificationContainer,
  NotificationImage,
  NotificationMessage,
  NotificationTitle
} from './styles';
// types
import { TToast, TToastProps, TToasts } from './types';

const Toasts = ({ position = 'bottomRight' }: TToastProps) => {
  const [toasts] = useToastsStore<TToast[] | undefined, TToasts>(
    (store) => store?.toasts
  );
  const deleteToast = useDeleteToast();

  const handleDeleteToast = useCallback(
    (id: number) => {
      deleteToast?.(id);
    },
    [deleteToast]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts && toasts?.length > 0) {
        handleDeleteToast(toasts[0].id);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [handleDeleteToast, toasts]);

  return (
    <Portal>
      <NotificationContainer id='toast-container' position={position}>
        {toasts?.map((toast) => (
          <Notification
            key={toast.id}
            backgroundColor={toast.backgroundColor}
            position={position}
          >
            <button type='button' onClick={() => handleDeleteToast(toast.id)}>
              X
            </button>
            <NotificationImage>
              <img src={toast.icon} alt='' />
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
