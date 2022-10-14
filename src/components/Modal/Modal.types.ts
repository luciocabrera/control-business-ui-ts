import type { ReactNode, MouseEventHandler, Dispatch, SetStateAction } from 'types';
export type ModalProps = {
  title?: string;
  message?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement> | Dispatch<SetStateAction<{}>>;
  onAccept?: () => void;
  isConfirmation?: boolean;
};
