import { useFormDataArgs } from 'hooks';
import { FormFieldType, FormFieldGroupType, FormSimpleFieldType, FieldBaseValueType } from 'types';
import { getErrorField } from 'utilities';
import FormField from '../FormField/FormField';
import { FieldGroupStyled, FieldRowStyled } from './Form.styled';

export const getFieldElements = <TDataType extends Record<string, unknown>>(
  form: useFormDataArgs<TDataType>,
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
              {getFieldElements(form, groupField?.fields, 100, groupKey, viewMode)}
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
              {getFieldElements(form, rowField?.fields, calculatedWidth, rowKey, viewMode)}
            </FieldRowStyled>
          )
        );
      case 'field':
      default:
        const simpleField = field as FormSimpleFieldType;
        const errorField = getErrorField(simpleField, form.errors);
        const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;

        if (field?.render) return field?.render(form.data[simpleField.accessor], form.setField);
        return (
          <FormField
            key={fieldKey}
            value={form.data[simpleField.accessor] as FieldBaseValueType}
            field={simpleField}
            setFieldFromEvent={form.setFieldFromEvent}
            setField={form.setField}
            width={fieldWidth}
            viewMode={viewMode}
            {...errorField}
          />
        );
    }
  });
