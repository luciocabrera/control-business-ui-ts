// components
// react
import { memo, useCallback } from 'react';
// types
import type { FormBaseProps, MouseEvent } from 'types';
// utilities
import { deepEqual } from 'utilities';

import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay';
// contexts
import {
  FormMetaType,
  useFieldsContext,
  useFormMetaContext,
} from 'components/Form/contexts';
import { validateFields } from 'components/Form/utilities';
import { useAddNotification } from 'components/Notifications/contexts';

import { Button } from '../Button';
import type { FormFieldType } from '../FormField/types';

type ActionsProps<TDataType> = FormBaseProps<TDataType>;

const Actions = <TDataType extends Record<string, unknown>>({
  onAccept,
  onFinish,
}: ActionsProps<TDataType>) => {
  const addNotification = useAddNotification();
  const [data] = useFieldsContext<TDataType, TDataType>((store) => store);
  const [initialFields] = useFormMetaContext<
    FormFieldType[],
    Pick<FormMetaType<TDataType>, 'initialFields'>
  >((store) => store.initialFields);
  const [initialData] = useFormMetaContext<
    TDataType,
    Pick<FormMetaType<TDataType>, 'initialData'>
  >((store) => (store.initialData ?? {}) as TDataType);
  const [submittedCounter, incrementSubmittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<TDataType>, 'submittedCounter'>
  >((store) => store.submittedCounter);
  console.log('Actions');

  const onSubmit = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      incrementSubmittedCounter?.({ submittedCounter: submittedCounter + 1 });

      const errorFields = validateFields<TDataType>(initialFields, data);
      const hasChanged = !deepEqual<TDataType>(initialData, data);

      if (errorFields?.length > 0) {
        const errorMessages = errorFields.map((err) => err.errorMessage);
        addNotification?.(
          <ErrorDisplay errors={errorMessages} />,
          'Error Validating Customer',
          'error'
        );
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
    ]
  );

  return (
    <Button
      id='form-button-accept'
      onClick={onSubmit}
    >
      Accept
    </Button>
  );
};

export default memo(Actions) as typeof Actions;
