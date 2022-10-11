import type { ReactNode, Dispatch, SetStateAction } from 'types';
export type ModalProps = {
  title?: string;
  message?: ReactNode;
  onClose?: Dispatch<SetStateAction<{}>>;
  onAccept?: () => void;
  isConfirmation?: boolean;
};
