import { useFormDataArgs } from 'hooks';
import { FormFieldType, FormFieldGroupType, FormSimpleFieldType } from 'types';
import { getErrorField } from 'utilities';
import FormField from '../FormField/FormField';
import TableField from '../TableField/TableField';
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

    if (field?.render) return field?.render();
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
      // case 'table':
      //   const tableField = field as FormFieldTableType<TDataType>;
      //   return (
      //     <TableField
      //       columns={tableField.columns || []}
      //       value={form.data[tableField.accessor]}
      //       onChange={function (event: ChangeEvent<HTMLInputElement>): void {
      //         throw new Error('Function not implemented.');
      //       }}
      //     />
      //   );
      case 'field':
      default:
        const simpleField = field as FormSimpleFieldType;
        const errorField = getErrorField(simpleField, form.errors);
        const fieldKey = `${groupId}-form-field-${index}-${simpleField.accessor}`;
        return (
          <FormField
            key={fieldKey}
            value={form.data[simpleField.accessor] as string | number | undefined}
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
