import type { MouseEventHandler,ReactNode } from 'types';
export type ModalProps = {
  title?: string;
  message?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onAccept?: () => void;
  isConfirmation?: boolean;
};
