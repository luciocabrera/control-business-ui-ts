import { Header } from 'components';

import Actions from '../components/Actions/Actions';
import FormFields from '../components/FormFields/FormFields';

import { FormStyled } from './styles';
import type { FormProps } from './types';

const Form = <TData extends Record<string, unknown>>({
  actions,
  children,
  height,
  icon,
  onAccept,
  onFinish,
  title,
  viewMode,
  width,
}: FormProps<TData>) => (
  <FormStyled
    noValidate
    width={width}
    height={height}
  >
    <Header
      icon={icon}
      title={title}
      onClose={onFinish}
    />
    <main>
      <>
        <FormFields
          groupId={''}
          viewMode={viewMode}
        />
        {children}
      </>
    </main>
    <footer>
      {onAccept && (
        <Actions<TData>
          onAccept={onAccept}
          onFinish={onFinish}
        />
      )}
      {actions}
    </footer>
  </FormStyled>
);

export default Form;
