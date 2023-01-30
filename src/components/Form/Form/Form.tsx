// components
import { Header } from 'components';
import Actions from './Actions';
// react
import { memo } from 'react';
// styles
import { FormStyled } from './Form.styled';
// types
import type { FormProps } from './Form.types';
// utilities
import { getFieldElements } from '../utilities/getFieldElements';
import { useFormMetaContext } from 'contexts';
import { FormFieldType } from 'types';

const Form = <TDataType extends Record<string, unknown>>({
  viewMode,
  actions,
  children,
  title,
  icon,
  // initialFields,
  // initialData,
  onAccept,
  onFinish,
  width,
  height,
}: FormProps<TDataType>) => {
  const [initialFields] = useFormMetaContext<FormFieldType[]>('initialFields');

  return (
    <FormStyled noValidate width={width} height={height}>
      <Header icon={icon} title={title} onClose={onFinish} />
      <main>
        <>
          {getFieldElements(initialFields, undefined, undefined, viewMode)}
          {children}
        </>
      </main>
      <footer>
        {onAccept && <Actions<TDataType> onAccept={onAccept} onFinish={onFinish} />}
        {actions}
      </footer>
    </FormStyled>
  );
};

export default memo(Form) as typeof Form;
