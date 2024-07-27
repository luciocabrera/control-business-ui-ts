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
}: FormProps<TData>) => {
  const handleClose = onFinish;
  return (
    <FormStyled
      noValidate
      height={height}
      width={width}
    >
      <Header
        icon={icon}
        title={title}
        onClose={handleClose}
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
        {onAccept && <Actions<TData> {...{ onAccept, onFinish }} />}
        {actions}
      </footer>
    </FormStyled>
  );
};

export default Form;
