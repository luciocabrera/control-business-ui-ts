import { memo } from 'react';
import type { ReactNode } from 'types';

import { Overlay } from 'components';

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

ModalForm.displayName = 'ModalForm';

export default ModalForm;
