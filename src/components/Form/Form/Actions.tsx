// components
import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay';
import Button from '../Button/Button';
// contexts
import { useAddNotification, useFieldsContext, useFormMetaContext } from 'contexts';
// react
import { memo, useCallback } from 'react';
// types
import type { MouseEvent, FormBaseProps, FormFieldType } from 'types';
// utilities
import { deepEqual, validateFields } from 'utilities';

type ActionsProps<TDataType> = FormBaseProps<TDataType>;

const Actions = <TDataType extends Record<string, unknown>>({ onAccept, onFinish }: ActionsProps<TDataType>) => {
  const addNotification = useAddNotification();
  const [data] = useFieldsContext<TDataType, TDataType>((store) => store);
  const [initialFields] = useFormMetaContext('initialFields');

  const [initialData] = useFormMetaContext('initialData');

  const [submittedCounter, incrementSubmittedCounter] = useFormMetaContext<number>('submittedCounter');

  const onSubmit = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      incrementSubmittedCounter?.(submittedCounter + 1);

      const errorFields = validateFields<TDataType>(initialFields as FormFieldType[], data);
      const hasChanged = !deepEqual<TDataType>((initialData || {}) as TDataType, data);

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
    },
    [
      addNotification,
      data,
      incrementSubmittedCounter,
      initialData,
      initialFields,
      onAccept,
      onFinish,
      submittedCounter,
    ],
  );

  return (
    <Button id="form-button-accept" onClick={onSubmit}>
      Accept
    </Button>
  );
};

export default memo(Actions) as typeof Actions;
