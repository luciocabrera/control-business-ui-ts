// components
import { Header } from 'components';
// react
import { memo } from 'react';
// styles
import { FormStyled } from './Form.styled';
// types
import type { FormProps } from './Form.types';
import { getFieldElements } from './util';
import Actions from './Actions';

const Form = <TDataType extends Record<string, unknown>>({
  viewMode,
  actions,
  children,
  title,
  icon,
  initialFields,
  initialData,
  onAccept,
  onFinish,
}: FormProps<TDataType>) => {
  return (
    <FormStyled noValidate>
      <Header icon={icon} title={title} onClose={onFinish} />
      <main>
        <>
          {getFieldElements(initialFields, undefined, undefined, viewMode)}
          {children}
        </>
      </main>
      <footer>
        {onAccept && (
          <Actions<TDataType>
            initialFields={initialFields}
            initialData={initialData}
            onAccept={onAccept}
            onFinish={onFinish}
          />
        )}
        {actions}
      </footer>
    </FormStyled>
  );
};

export default memo(Form) as typeof Form;
