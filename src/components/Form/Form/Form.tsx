// components
import { Header, Button, FormField, ErrorDisplay, Tabs } from 'components';
// contexts
import { useAddNotification } from 'contexts';
// hooks
import { useFormData } from 'hooks';
// react
import { memo } from 'react';
// styles
import { FieldGroupStyled, FieldRowStyled, FormStyled } from './Form.styled';
// utilities
import { getErrorField } from 'utilities';
// types
import type { FormFieldBaseType, FormFieldGroupType, FormFieldType, MouseEvent } from 'types';
import type { FormProps } from './Form.types';
import { TabType } from 'components/Tabs/Tabs';

const Form = <TDataType extends Record<string, unknown>>({
  viewMode = true,
  actions,
  children,
  title,
  icon,
  initialFields,
  initialData,
  onAccept,
  onFinish,
}: FormProps<TDataType>) => {
  const { data, errors, setField, setFieldFromEvent, verifyForm } = useFormData<TDataType>(initialFields, initialData);

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

  const getFieldElements = (formFields?: FormFieldType[], fieldWidth?: number, groupId = '') =>
    formFields?.map((field, index) => {
      const calculatedType = field?.type ?? 'field';
      const groupKey = `form-group-${index}-${field?.label ?? ''}`;
      switch (calculatedType) {
        case 'tab':
          const tabField = field as FormFieldGroupType;
          const tabs: TabType[] =
            tabField?.fields?.map((field, i) => ({
              children: getFieldElements(tabField.fields, 100, groupKey),
              title: field.label || '',
              key: field.label || '',
            })) || [];
          return tabField?.fields && tabs && <Tabs key={groupKey} tabs={tabs} />;
        case 'group':
          const groupField = field as FormFieldGroupType;
          return (
            groupField?.fields && (
              <FieldGroupStyled key={groupKey}>
                <legend>{groupField?.label}</legend>
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
              viewMode={viewMode}
              {...errorField}
            />
          );
      }
    });

  return (
    <FormStyled noValidate>
      <Header icon={icon} title={title} onClose={onFinish} />
      <main>
        <>
          {getFieldElements(initialFields)}
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
