// components
import { Header, Button, Modal, FormField } from 'components';
// hooks
import { useFormData } from 'hooks';
// react
import { useState, memo } from 'react';
// styles
import { FieldGroupStyled, FieldRowStyled, FormMain, FormStyled } from './Form.styled';
// utilities
import { getErrorField } from 'utilities';
// types
import type { FormFieldBaseType, FormFieldGroupType, FormFieldType, MouseEvent } from 'types';
import type { FormProps, ModalType } from './Form.types';

const initialModal = { show: false };

const Form = <TDataType extends Record<string, unknown>>({
  actions,
  title,
  icon,
  initialFields,
  initialData,
  onAccept,
  onFinish,
}: FormProps<TDataType>) => {
  const { data, errors, setField, setFieldFromEvent, verifyForm } = useFormData<TDataType>(initialFields, initialData);

  const [modal, setModal] = useState<ModalType>(initialModal);

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { errorFields, hasChanged } = verifyForm();

    if (errorFields?.length > 0) {
      const errorMessages = (
        <ul>
          {errorFields.map((err) => (
            <li>{err.errorMessage}</li>
          ))}
        </ul>
      );
      setModal({
        show: true,
        title: 'Error Validating Customer',
        message: errorMessages,
        onClose: () => setModal(initialModal),
      });
      return;
    }

    if (typeof onAccept === 'function' && hasChanged) {
      console.log('is saving');
      onAccept(data);
    } else {
      onFinish?.();
    }
  };

  const getFieldElements = (formFields?: FormFieldType[], fieldWidth?: number, groupId = '') =>
    formFields?.map((field, index) => {
      const calculatedType = field?.type ?? 'field';
      const groupKey = `form-group-${index}-${field?.label ?? ''}`;
      switch (calculatedType) {
        case 'group':
          const groupField = field as FormFieldGroupType;
          return (
            groupField?.fields && (
              <FieldGroupStyled key={groupKey}>
                <legend>{field?.label}</legend>
                {getFieldElements(groupField?.fields, 100, groupKey)}
              </FieldGroupStyled>
            )
          );
        case 'row':
          const rowField = field as FormFieldGroupType;
          const calculatedWidth = 100 / rowField?.fields?.length! || 100;
          const rowKey = `${groupId}-form-row-${index}`;
          return (
            rowField?.fields && (
              <FieldRowStyled key={rowKey}>
                {getFieldElements(rowField?.fields, calculatedWidth, rowKey)}
              </FieldRowStyled>
            )
          );
        case 'field':
        default:
          const simpleField = field as FormFieldBaseType;
          const errorField = getErrorField(simpleField, errors);
          const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;
          return (
            <FormField
              key={fieldKey}
              value={data[simpleField.accessor] as string | number | undefined}
              field={simpleField}
              setFieldFromEvent={setFieldFromEvent}
              setField={setField}
              width={fieldWidth}
              {...errorField}
            />
          );
      }
    });

  return (
    <>
      {modal?.show && <Modal {...modal} />}
      <FormStyled noValidate>
        <Header icon={icon} title={title}></Header>
        <FormMain>{getFieldElements(initialFields)}</FormMain>
        <footer>
          <Button id="form-button-accept" onClick={onSubmit}>
            Accept
          </Button>
          {actions}
        </footer>
      </FormStyled>
    </>
  );
};

export default memo(Form) as typeof Form;
