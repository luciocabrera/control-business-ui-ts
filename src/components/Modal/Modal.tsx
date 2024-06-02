import { Button } from 'components/Form/components/Button';
import { Portal } from 'components/Portal';

import Overlay from '../Overlay/Overlay';

import type { ModalProps } from './Modal.types';

const Modal = ({
  isConfirmation = false,
  message,
  onAccept,
  onClose,
  title,
}: ModalProps) => {
  const handleClose = onClose;
  const handleAccept = onAccept;
  return (
    <Portal data-testid='modal-portal'>
      <>
        <Overlay />
        <div
          className='fade'
          id='myModal'
          role='dialog'
        >
          <div
            className='modal-dialog'
            style={{ zIndex: '100' }}
          >
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  className='close'
                  data-dismiss='modal'
                  type='button'
                  onClick={handleClose}
                >
                  &times;
                </button>
                <h4 className='modal-title'>{title}</h4>
              </div>
              <div className='modal-body'>{message}</div>
              <div className='modal-footer'>
                {handleAccept && (
                  <Button
                    className='btn btn-default'
                    data-dismiss='modal'
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                )}
                {isConfirmation && handleClose && (
                  <Button
                    className='btn btn-default'
                    data-dismiss='modal'
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </Portal>
  );
};
Modal.displayName = 'Modal';

export default Modal;
