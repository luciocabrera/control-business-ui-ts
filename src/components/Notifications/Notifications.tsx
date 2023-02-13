// components
import { Button, Overlay, Portal } from 'components';
// contexts
import { useDeleteNotification, useNotificationsStore } from './contexts';
// react
import { useCallback } from 'react';
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
    [deleteNotification],
  );

  if (!notifications || notifications?.length === 0) return null;

  return (
    <Portal>
      <>
        <Overlay />
        {notifications?.map(
          ({ id, icon, onAccept, onClose, description, title, isConfirmation = false }: TNotification, i) => (
            <div key={i} className="fade" id="myModal" role="dialog">
              <div className="modal-dialog" style={{ zIndex: '100' }}>
                <div className="modal-content">
                  <div className="modal-header">
                    {icon && <img src={icon} alt={''} width={'32px'} height={'32px'} />}
                    <h4 className="modal-title">{title}</h4>
                    <button
                      type="button"
                      onClick={(e) => {
                        onClose?.(e);
                        handleDeleteNotification?.(id);
                      }}
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  {/* <Header
                    icon={icon}
                    title={title}
                    onClose={(e) => {
                      onClose?.(e);
                      // deleteNotification?.(id);
                    }}
                  /> */}
                  <div className="modal-body">
                    <>{description}</>
                  </div>
                  <div className="modal-footer">
                    <Button
                      className="btn btn-default"
                      data-dismiss="modal"
                      onClick={() => {
                        onAccept?.();
                        handleDeleteNotification?.(id);
                      }}
                    >
                      Accept
                    </Button>
                    {isConfirmation && (
                      <Button
                        className="btn btn-default"
                        data-dismiss="modal"
                        inverse
                        onClick={(e) => {
                          onClose?.(e);
                          handleDeleteNotification?.(id);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </>
    </Portal>
  );
};

export default Notifications;
