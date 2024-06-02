import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';
import type { InvoiceFormType } from 'types';
import { getFormattedNumber } from 'utilities';

import { TextInput } from 'components/Form/components/TextInput';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { InvoiceAmountsFieldProps } from './InvoiceAmountsField.types';

const InvoiceAmountsField = ({ ...props }: InvoiceAmountsFieldProps) => {
  const [subtotal] = useFieldsContext<
    number,
    Pick<InvoiceFormType, 'subtotal'>
  >((store) => store.subtotal);
  const [taxes] = useFieldsContext<number, Pick<InvoiceFormType, 'taxes'>>(
    (store) => store.taxes
  );
  const [total] = useFieldsContext<number, Pick<InvoiceFormType, 'total'>>(
    (store) => store.total
  );
  const [taxesPercentage] = useFieldsContext<
    number,
    Pick<InvoiceFormType, 'taxesPercentage'>
  >((store) => store.taxesPercentage);
  const [submittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<InvoiceFormType>, 'submittedCounter'>
  >((store) => store.submittedCounter);
  const subtotalField = {
    accessor: 'subtotal',
    label: 'Sub Total',
    type: 'text',
  };

  const errorsSubtotal =
    submittedCounter > 0 ? validateField(subtotalField, subtotal) : [];

  const errorFieldSubtotal = getErrorField(subtotalField, errorsSubtotal);

  const taxesField = {
    accessor: 'taxes',
    label: 'Taxes',
    required: true,
    type: 'text',
  };

  const errorsTaxesField =
    submittedCounter > 0 ? validateField(taxesField, taxes) : [];

  const errorTaxesField = getErrorField(taxesField, errorsTaxesField);

  const taxesPercentageField = {
    accessor: 'taxesPercentage',
    label: 'Taxes Percentage',
    type: 'text',
  };

  const totalField = {
    accessor: 'total',
    label: 'Total',
    readonly: true,
    required: true,
    type: 'text',
  };

  const errorsTotal =
    submittedCounter > 0 ? validateField(totalField, total) : [];

  const errorTotalField = getErrorField(totalField, errorsTotal);

  const onDisplayFieldChange = () => null;

  return (
    <>
      <TextInput
        key={`field-input-subtotal`}
        textAlign='right'
        onChange={onDisplayFieldChange}
        {...subtotalField}
        {...props}
        {...errorFieldSubtotal}
        value={getFormattedNumber(subtotal, 'currency')}
      />
      <TextInput
        key={`field-input-taxes-percentage`}
        textAlign='right'
        onChange={onDisplayFieldChange}
        {...taxesPercentageField}
        value={`${taxesPercentage}%`}
      />
      <TextInput
        key={`field-input-taxes`}
        textAlign='right'
        onChange={onDisplayFieldChange}
        {...taxesField}
        {...props}
        {...errorTaxesField}
        value={getFormattedNumber(taxes, 'currency')}
      />
      <TextInput
        key={`field-input-total`}
        textAlign='right'
        onChange={onDisplayFieldChange}
        {...totalField}
        {...props}
        {...errorTotalField}
        value={getFormattedNumber(total, 'currency')}
      />
    </>
  );
};

export default InvoiceAmountsField;
