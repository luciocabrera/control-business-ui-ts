// components
import FormField from '../FormField/FormField';
// styles
import { CustomFieldWrapper, FieldGroupStyled, FieldRowStyled } from '../Form/Form.styled';
// types
import type { FormFieldType, FormFieldGroupType, FormSimpleFieldType } from 'types';
import { FormMetaType, useFormMetaContext } from 'contexts/FormDataContext';

type TFormField = {
  formFields?: FormFieldType[];
  fieldWidth?: number;
  groupId: string;
  viewMode?: boolean;
};

export const FormFields = ({ formFields, fieldWidth, groupId = '', viewMode = true }: TFormField) => {
  const [initialFields] = useFormMetaContext<FormFieldType[], Pick<FormMetaType<any>, 'initialFields'>>(
    (store) => store.initialFields,
  );

  const fields = formFields ?? initialFields;
  if (!fields) return null;
  return (
    <>
      {fields.map((field, index) => {
        const calculatedType = field?.type ?? 'field';
        const groupKey = `form-group-${index}-${field?.label ?? ''}`;

        switch (calculatedType) {
          case 'group':
            const groupField = field as FormFieldGroupType;
            return (
              groupField?.fields && (
                <FieldGroupStyled key={groupKey} id="field-group">
                  <legend>{groupField?.label}</legend>
                  <FormFields
                    key={`field-${groupKey}`}
                    groupId={groupKey}
                    viewMode={viewMode}
                    fieldWidth={100}
                    formFields={groupField?.fields}
                  />
                </FieldGroupStyled>
              )
            );
          case 'row':
            const rowField = field as FormFieldGroupType;
            const calculatedWidth = 100 / rowField?.fields?.length! || 100;
            const rowKey = `${groupId}-form-row-${index}`;
            return (
              rowField?.fields && (
                <FieldRowStyled key={rowKey} id="field-row">
                  <FormFields
                    key={`field-${rowKey}`}
                    groupId={rowKey}
                    viewMode={viewMode}
                    fieldWidth={calculatedWidth}
                    formFields={rowField?.fields}
                  />
                </FieldRowStyled>
              )
            );
          case 'rule':
            return <></>;
          case 'field':
          default:
            const simpleField = field as FormSimpleFieldType;
            const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;

            if (field?.render)
              return (
                <CustomFieldWrapper id="custom-field-wrapper" width={fieldWidth} key={fieldKey}>
                  {field?.render()}
                </CustomFieldWrapper>
              );
            return <FormField key={fieldKey} field={simpleField} width={fieldWidth} viewMode={viewMode} />;
        }
      })}
    </>
  );
};

export default FormFields;
