import {
  type FormMetaType,
  useFormMetaContext,
} from 'components/Form/contexts/FormContext';

import { FormField } from '../FormField';
import type {
  FormFieldGroupType,
  FormFieldType,
  FormSimpleFieldType,
} from '../FormField/types';

import { CustomFieldWrapper, FieldGroupStyled, FieldRowStyled } from './styles';

type TFormField = {
  formFields?: FormFieldType[];
  fieldWidth?: number;
  groupId: string;
  viewMode?: boolean;
};

export const FormFields = ({
  fieldWidth,
  formFields,
  groupId = '',
  viewMode = true,
}: TFormField) => {
  const [initialFields] = useFormMetaContext<
    FormFieldType[],
    Pick<FormMetaType<Record<string, unknown>>, 'initialFields'>
  >((store) => store.initialFields);

  const fields = formFields ?? initialFields;
  if (!fields) return null;
  return (
    <>
      {fields.map((field, index) => {
        const calculatedType = field?.type ?? 'field';
        const groupKey = `form-group-${index}-${field?.label ?? ''}`;

        switch (calculatedType) {
          case 'group': {
            const groupField = field as FormFieldGroupType;
            return (
              groupField?.fields && (
                <FieldGroupStyled
                  key={groupKey}
                  id='field-group'
                >
                  <legend>{groupField?.label}</legend>
                  <FormFields
                    key={`field-${groupKey}`}
                    fieldWidth={100}
                    formFields={groupField?.fields}
                    groupId={groupKey}
                    viewMode={viewMode}
                  />
                </FieldGroupStyled>
              )
            );
          }
          case 'row': {
            const rowField = field as FormFieldGroupType;
            const calculatedWidth = 100 / (rowField?.fields?.length ?? 100);
            const rowKey = `${groupId}-form-row-${index}`;
            return (
              rowField?.fields && (
                <FieldRowStyled
                  key={rowKey}
                  id='field-row'
                >
                  <FormFields
                    key={`field-${rowKey}`}
                    fieldWidth={calculatedWidth}
                    formFields={rowField?.fields}
                    groupId={rowKey}
                    viewMode={viewMode}
                  />
                </FieldRowStyled>
              )
            );
          }
          case 'rule':
            return null;
          case 'field':
          default: {
            const simpleField = field as FormSimpleFieldType;
            const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;

            if (field?.render)
              return (
                <CustomFieldWrapper
                  key={fieldKey}
                  id='custom-field-wrapper'
                  width={fieldWidth}
                >
                  {field?.render()}
                </CustomFieldWrapper>
              );
            return (
              <FormField
                key={fieldKey}
                field={simpleField}
                viewMode={viewMode}
                width={fieldWidth}
              />
            );
          }
        }
      })}
    </>
  );
};

export default FormFields;
