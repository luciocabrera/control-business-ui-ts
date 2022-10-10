import { Overlay } from 'components';
import { ReactNode } from 'types';
import { FormWrapper } from './ModalForm.styled';

type ModalWrapperProps = {
  children: ReactNode;
};

const ModalForm = ({ children }: ModalWrapperProps) => (
  <FormWrapper>
    <Overlay />
    {children}
  </FormWrapper>
);
export default ModalForm;
