import { useCallback, useMemo } from 'react';
import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';
import type { InvoiceFormType } from 'types';
import { getFormattedNumber, memo } from 'utilities';

import { TextInput } from 'components/Form/components/TextInput';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { InvoiceAmountsFieldProps } from './InvoiceAmountsField.types';

const InvoiceAmountsField = memo(({ ...props }: InvoiceAmountsFieldProps) => {
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
  const subtotalField = useMemo(
    () => ({ accessor: 'subtotal', label: 'Sub Total', type: 'text' }),
    []
  );

  const errorsSubtotal = useMemo(
    () => (submittedCounter > 0 ? validateField(subtotalField, subtotal) : []),
    [subtotal, subtotalField, submittedCounter]
  );

  const errorFieldSubtotal = useMemo(
    () => getErrorField(subtotalField, errorsSubtotal),
    [errorsSubtotal, subtotalField]
  );

  const taxesField = useMemo(
    () => ({ accessor: 'taxes', label: 'Taxes', required: true, type: 'text' }),
    []
  );

  const errorsTaxesField = useMemo(
    () => (submittedCounter > 0 ? validateField(taxesField, taxes) : []),
    [taxes, taxesField, submittedCounter]
  );
  const errorTaxesField = useMemo(
    () => getErrorField(taxesField, errorsTaxesField),
    [errorsTaxesField, taxesField]
  );

  const taxesPercentageField = useMemo(
    () => ({
      accessor: 'taxesPercentage',
      label: 'Taxes Percentage',
      type: 'text',
    }),
    []
  );

  const totalField = useMemo(
    () => ({
      accessor: 'total',
      label: 'Total',
      readonly: true,
      required: true,
      type: 'text',
    }),
    []
  );
  const errorsTotal = useMemo(
    () => (submittedCounter > 0 ? validateField(totalField, total) : []),
    [total, totalField, submittedCounter]
  );

  const errorTotalField = useMemo(
    () => getErrorField(totalField, errorsTotal),
    [errorsTotal, totalField]
  );

  const onDisplayFieldChange = useCallback(() => null, []);

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
});

export default InvoiceAmountsField;
