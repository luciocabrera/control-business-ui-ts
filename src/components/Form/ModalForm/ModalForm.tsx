// components
import { Overlay } from 'components';
// react
import { memo } from 'react';
// types
import type { ReactNode } from 'types';
// styles
import { FormWrapper } from './styles';

type ModalWrapperProps = {
  children: ReactNode;
};

const ModalForm = memo(({ children }: ModalWrapperProps) => (
  <FormWrapper>
    <Overlay />
    {children}
  </FormWrapper>
));
export default ModalForm;
