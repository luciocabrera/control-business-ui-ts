import {
  Notification,
  NotificationContainer,
  NotificationImage,
  NotificationMessage,
  NotificationTitle,
} from './Toasts.styled';
// Context
import { useToasts, useDeleteToast } from 'contexts';
import { Portal } from 'components';

type ToastProps = {
  position?: string;
};

const Toast = ({ position = 'bottomRight' }: ToastProps) => {
  const toasts = useToasts();
  const deleteToast = useDeleteToast();

  return (
    <Portal>
      <NotificationContainer id="toast-container" position={position}>
        {toasts?.map((toast, i) => (
          <Notification key={i} backgroundColor={toast.backgroundColor} position={position}>
            <button type="button" onClick={() => deleteToast?.(toast.id)}>
              X
            </button>
            <NotificationImage>
              <img src={toast.icon} alt="" />
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

export default Toast;
