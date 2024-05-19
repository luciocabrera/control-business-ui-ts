import { Header, Overlay, Portal } from 'components';
import { Button } from 'components/Form/components/Button';

import { useDeleteNotification, useNotificationsStore } from './contexts';
import type { TNotification, TNotifications } from './types';

import styles from './styles/Notifications.module.css';

const Notifications = () => {
  const [notifications] = useNotificationsStore<
    TNotification[] | undefined,
    TNotifications
  >((store) => store?.notifications);
  const deleteNotification = useDeleteNotification();

  const handleDeleteNotification = (id: number) => {
    deleteNotification?.(id);
  };

  if (!notifications || notifications?.length === 0) return null;

  return (
    <Portal>
      <>
        <Overlay />
        {notifications?.map(
          ({
            description,
            icon,
            id,
            isConfirmation = false,
            onAccept,
            onClose,
            title,
          }: TNotification) => (
            <article
              key={id}
              className={styles.modalDialog}
            >
              <Header
                icon={icon}
                title={title}
                onClose={(e) => {
                  onClose?.(e);
                  handleDeleteNotification?.(id);
                }}
              />
              <main className={styles.modalBody}>
                <>{description}</>
              </main>
              <footer className={styles.modalFooter}>
                <Button
                  className='btn btn-default'
                  data-dismiss='modal'
                  onClick={() => {
                    onAccept?.();
                    handleDeleteNotification?.(id);
                  }}
                >
                  Accept
                </Button>
                {isConfirmation && (
                  <Button
                    inverse
                    className='btn btn-default'
                    data-dismiss='modal'
                    onClick={(e) => {
                      onClose?.(e);
                      handleDeleteNotification?.(id);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </footer>
            </article>
          )
        )}
      </>
    </Portal>
  );
};

export default Notifications;
