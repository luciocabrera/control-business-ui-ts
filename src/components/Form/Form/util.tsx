// components
import FormField from '../FormField/FormField';
// styles
import { FieldGroupStyled, FieldRowStyled } from './Form.styled';
// types
import type { FormFieldType, FormFieldGroupType, FormSimpleFieldType } from 'types';

export const getFieldElements = (
  formFields?: FormFieldType[],
  fieldWidth?: number,
  groupId: string = '',
  viewMode: boolean = true,
) =>
  formFields?.map((field, index) => {
    const calculatedType = field?.type ?? 'field';
    const groupKey = `form-group-${index}-${field?.label ?? ''}`;

    switch (calculatedType) {
      case 'group':
        const groupField = field as FormFieldGroupType;
        return (
          groupField?.fields && (
            <FieldGroupStyled key={groupKey}>
              <legend>{groupField?.label}</legend>
              {getFieldElements(groupField?.fields, 100, groupKey, viewMode)}
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
              {getFieldElements(rowField?.fields, calculatedWidth, rowKey, viewMode)}
            </FieldRowStyled>
          )
        );
      case 'field':
      default:
        const simpleField = field as FormSimpleFieldType;
        const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;

        if (field?.render) return <div key={fieldKey}>{field?.render()}</div>;
        return <FormField key={fieldKey} field={simpleField} width={fieldWidth} viewMode={viewMode} />;
    }
  });
