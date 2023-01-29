// components
import TextInput from 'components/Form/TextInput/TextInput';
// contexts
import { useFormStatusStore, useStore } from 'contexts';
// react
import { useCallback, useMemo } from 'react';
// types
import type { InvoiceAmountsFieldProps } from './InvoiceAmountsField.types';
import type { InvoiceFormType } from 'types';
// utilities
import { getErrorField, validateField, memo, getFormattedNumber } from 'utilities';

const InvoiceAmountsField = memo(({ ...props }: InvoiceAmountsFieldProps) => {
  const [subtotal] = useStore<number, Pick<InvoiceFormType, 'subtotal'>>((store) => store.subtotal);
  const [taxes] = useStore<number, Pick<InvoiceFormType, 'taxes'>>((store) => store.taxes);
  const [total] = useStore<number, Pick<InvoiceFormType, 'total'>>((store) => store.total);
  const [taxesPercentage] = useStore<number, Pick<InvoiceFormType, 'taxesPercentage'>>(
    (store) => store.taxesPercentage,
  );
  const [formStatus] = useFormStatusStore();
  const { submittedCounter } = formStatus;

  const subtotalField = useMemo(() => ({ accessor: 'subtotal', label: 'Sub Total', type: 'text' }), []);

  const errorsSubtotal = useMemo(
    () => (submittedCounter > 0 ? validateField(subtotalField, subtotal) : []),
    [subtotal, subtotalField, submittedCounter],
  );

  const errorFieldSubtotal = useMemo(
    () => getErrorField(subtotalField, errorsSubtotal),
    [errorsSubtotal, subtotalField],
  );

  const taxesField = useMemo(() => ({ accessor: 'taxes', label: 'Taxes', type: 'text', required: true }), []);

  const errorsTaxesField = useMemo(
    () => (submittedCounter > 0 ? validateField(taxesField, taxes) : []),
    [taxes, taxesField, submittedCounter],
  );
  const errorTaxesField = useMemo(() => getErrorField(taxesField, errorsTaxesField), [errorsTaxesField, taxesField]);

  const taxesPercentageField = useMemo(
    () => ({ accessor: 'taxesPercentage', label: 'Taxes Percentage', type: 'text' }),
    [],
  );

  const totalField = useMemo(
    () => ({ accessor: 'total', label: 'Total', type: 'text', required: true, readonly: true }),
    [],
  );
  const errorsTotal = useMemo(
    () => (submittedCounter > 0 ? validateField(totalField, total) : []),
    [total, totalField, submittedCounter],
  );

  const errorTotalField = useMemo(() => getErrorField(totalField, errorsTotal), [errorsTotal, totalField]);

  const handleDisplayFieldOnChange = useCallback(() => null, []);

  return (
    <>
      <TextInput
        key={`field-input-subtotal`}
        onChange={handleDisplayFieldOnChange}
        textAlign="right"
        {...subtotalField}
        {...props}
        {...errorFieldSubtotal}
        value={getFormattedNumber(subtotal, 'currency')}
      />
      <TextInput
        key={`field-input-taxes-percentage`}
        onChange={handleDisplayFieldOnChange}
        textAlign="right"
        {...taxesPercentageField}
        value={`${taxesPercentage}%`}
      />
      <TextInput
        key={`field-input-taxes`}
        onChange={handleDisplayFieldOnChange}
        textAlign="right"
        {...taxesField}
        {...props}
        {...errorTaxesField}
        value={getFormattedNumber(taxes, 'currency')}
      />
      <TextInput
        key={`field-input-total`}
        onChange={handleDisplayFieldOnChange}
        textAlign="right"
        {...totalField}
        {...props}
        {...errorTotalField}
        value={getFormattedNumber(total, 'currency')}
      />
    </>
  );
});

export default InvoiceAmountsField;
