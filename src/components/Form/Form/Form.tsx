// components
import { Header, Button, ErrorDisplay } from 'components';
// contexts
import { useAddNotification } from 'contexts';
// hooks
import { useFormData } from 'hooks';
// react
import { memo } from 'react';
// styles
import { FormStyled } from './Form.styled';
// types
import type { MouseEvent } from 'types';
import type { FormProps } from './Form.types';

import { getFieldElements } from './util';

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
  const form = useFormData<TDataType>(initialFields, initialData);
  const { data, verifyForm } = form;
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
      onAccept(data);
    } else {
      onFinish?.(event);
    }
  };

  return (
    <FormStyled noValidate>
      <Header icon={icon} title={title} onClose={onFinish} />
      <main>
        <>
          {getFieldElements(form, initialFields, undefined, undefined, viewMode)}
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
