import { Button, Overlay, Portal } from 'components';
import { useDeleteNotification, useNotifications } from 'contexts';
import { memo } from 'react';

// types
import type { NotificationProps } from './Notification.types';

const Notification = memo(() => {
  const notifications = useNotifications();
  const deleteNotification = useDeleteNotification();

  if ((notifications?.length ?? 0) === 0) return null;
  return (
    <Portal>
      <>
        <Overlay />
        {notifications?.map(
          ({ id, icon, onAccept, onClose, description, title, isConfirmation = false }: NotificationProps, i) => (
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
                        deleteNotification?.(id);
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
                      deleteNotification?.(id);
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
                        deleteNotification?.(id);
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
                          deleteNotification?.(id);
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
});
export default Notification;
