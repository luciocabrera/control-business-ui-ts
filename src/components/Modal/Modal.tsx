import { Button } from 'components/Form/components/Button';
import { memo } from 'react';
import Overlay from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
// types
import type { ModalProps } from './Modal.types';

const Modal = memo(
  ({
    onAccept,
    onClose,
    message,
    title,
    isConfirmation = false
  }: ModalProps) => {
    return (
      <Portal data-testid='modal-portal'>
        <Overlay />
        <div className='fade' id='myModal' role='dialog'>
          <div className='modal-dialog' style={{ zIndex: '100' }}>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  onClick={onClose}
                  className='close'
                  data-dismiss='modal'
                >
                  &times;
                </button>
                <h4 className='modal-title'>{title}</h4>
              </div>
              <div className='modal-body'>
                <>{message}</>
              </div>
              <div className='modal-footer'>
                {onAccept && (
                  <Button
                    className='btn btn-default'
                    data-dismiss='modal'
                    onClick={onAccept}
                  >
                    Accept
                  </Button>
                )}
                {isConfirmation && onClose && (
                  <Button
                    className='btn btn-default'
                    data-dismiss='modal'
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
);
Modal.displayName = 'Modal';

export default Modal;
