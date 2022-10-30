import ErrorDisplay from 'components/ErrorDisplay/ErrorDisplay';
import { useAddNotification, useFormStatusStore, useStore } from 'contexts';
import { memo } from 'react';
import { deepEqual, validateFields } from 'utilities';
import Button from '../Button/Button';

import type { MouseEvent, FormBaseProps } from 'types';

type ActionsProps<TDataType> = FormBaseProps<TDataType>;

const Actions = <TDataType extends Record<string, unknown>>({
  initialFields,
  initialData,
  onAccept,
  onFinish,
}: ActionsProps<TDataType>) => {
  const addNotification = useAddNotification();
  const [data] = useStore<TDataType, TDataType>((store) => store);
  const [, incrementSubmittedCounter] = useFormStatusStore();
  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    incrementSubmittedCounter();
    const errorFields = validateFields<TDataType>(initialFields, data);
    const hasChanged = !deepEqual<TDataType>(initialData || ({} as TDataType), data);

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
    <Button id="form-button-accept" onClick={onSubmit}>
      Accept
    </Button>
  );
};

export default memo(Actions) as typeof Actions;
