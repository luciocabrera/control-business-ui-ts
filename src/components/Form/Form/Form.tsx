// components
import { Header, Button, ErrorDisplay } from 'components';
// contexts
import { useAddNotification } from 'contexts';
// hooks
import { useFormData } from 'hooks';
// react
import { memo, useEffect, useContext } from 'react';
// styles
import { FormStyled } from './Form.styled';
// types
import type { MouseEvent } from 'types';
import type { FormProps } from './Form.types';

import { getFieldElements } from './util';
import { FormDataContext, useFormDataContext } from 'contexts/FormDataContext';

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
  // const form = useFormData<TDataType>(initialFields, initialData);
  // const { data, verifyForm } = form;
  const form = useFormDataContext();

  //const form = useContext(FormDataContext);
  // const form = useFormData<TDataType>(initialFields, initialData);

  const { data, verifyForm, setField, initForm } = form;
  console.log('initialData', initialData);
  console.log('initialFields', initialFields);
  useEffect(() => {
    initForm(initialData || {}, initialFields);
  }, [initForm, initialData, initialFields]);

  console.log('data', data);
  const addNotification = useAddNotification();

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { errorFields, hasChanged } = verifyForm();

    if (errorFields?.length > 0) {
      const errorMessages = errorFields.map((err) => err.errorMessage);

      addNotification?.(<ErrorDisplay errors={errorMessages} />, 'Error Validating Customer', 'error');
      return;
    }

    if (typeof onAccept === 'function' && hasChanged) {
      onAccept(data as TDataType);
    } else {
      onFinish?.(event);
    }
  };

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
          <Button id="form-button-accept" onClick={onSubmit}>
            Accept
          </Button>
        )}
        {actions}
      </footer>
    </FormStyled>
  );
};

export default memo(Form) as typeof Form;
