// components
import { Header } from 'components';
import FormFields from '../utilities/FormFields';
import Actions from './Actions';
// react
import { memo } from 'react';
// styles
import { FormStyled } from './Form.styled';
// types
import type { FormProps } from './Form.types';

const Form = <TData extends Record<string, unknown>>({
  viewMode,
  actions,
  children,
  title,
  icon,
  onAccept,
  onFinish,
  width,
  height,
}: FormProps<TData>) => (
  <FormStyled noValidate width={width} height={height}>
    <Header icon={icon} title={title} onClose={onFinish} />
    <main>
      <>
        <FormFields groupId={''} viewMode={viewMode} />
        {children}
      </>
    </main>
    <footer>
      {onAccept && <Actions<TData> onAccept={onAccept} onFinish={onFinish} />}
      {actions}
    </footer>
  </FormStyled>
);

export default memo(Form) as typeof Form;
