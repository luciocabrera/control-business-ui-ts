// components
import { Header, Overlay, Portal } from 'components';
import { Button } from 'components/Form/components/Button';
// contexts
import { useDeleteNotification, useNotificationsStore } from './contexts';
// react
import { useCallback } from 'react';
// styles
import styles from './styles/Notifications.module.css';
// types
import type { TNotification, TNotifications } from './types';

const Notifications = () => {
  const [notifications] = useNotificationsStore<
    TNotification[] | undefined,
    TNotifications
  >((store) => store?.notifications);
  const deleteNotification = useDeleteNotification();

  const handleDeleteNotification = useCallback(
    (id: number) => {
      deleteNotification?.(id);
    },
    [deleteNotification]
  );

  if (!notifications || notifications?.length === 0) return null;

  return (
    <Portal>
      <>
        <Overlay />
        {notifications?.map(
          ({
            id,
            icon,
            onAccept,
            onClose,
            description,
            title,
            isConfirmation = false
          }: TNotification) => (
            <article key={id} className={styles.modalDialog}>
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
                    className='btn btn-default'
                    data-dismiss='modal'
                    inverse
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
