// components
import { TextInput } from 'components/Form/components/TextInput';
// contexts
import { useFormMetaContext, useFieldsContext, FormMetaType } from 'contexts';
// react
import { useCallback, useMemo } from 'react';
// types
import type { PriceQuantityFieldProps } from './PriceQuantityField.types';
import type { InvoiceDetailForm } from 'types';
// utilities
import { getErrorField, validateField, memo, getFormattedNumber } from 'utilities';

const PriceQuantityField = memo(({ ...props }: PriceQuantityFieldProps) => {
  const [quantity, setQuantity] = useFieldsContext<number, Pick<InvoiceDetailForm, 'quantity'>>(
    (store) => store.quantity,
  );
  const [priceUnit, setPriceUnit] = useFieldsContext<number, Pick<InvoiceDetailForm, 'priceUnit'>>(
    (store) => store.priceUnit,
  );
  const [priceQuantity, setPriceQuantity] = useFieldsContext<number, Pick<InvoiceDetailForm, 'priceQuantity'>>(
    (store) => store.priceQuantity || 0,
  );

  const [submittedCounter] = useFormMetaContext<number, Pick<FormMetaType<InvoiceDetailForm>, 'submittedCounter'>>(
    (store) => store.submittedCounter,
  );

  const quantityField = useMemo(
    () => ({ accessor: 'quantity', label: 'Quantity', type: 'number', required: true }),
    [],
  );

  const errorsQuantity = useMemo(
    () => (submittedCounter > 0 ? validateField(quantityField, quantity) : []),
    [quantity, quantityField, submittedCounter],
  );

  const errorFieldQuantity = useMemo(
    () => getErrorField(quantityField, errorsQuantity),
    [errorsQuantity, quantityField],
  );

  const priceUnitField = useMemo(
    () => ({ accessor: 'priceUnit', label: 'Price Unit', type: 'number', required: true }),
    [],
  );

  const errorsPriceUnitField = useMemo(
    () => (submittedCounter > 0 ? validateField(priceUnitField, priceUnit) : []),
    [priceUnit, priceUnitField, submittedCounter],
  );

  const errorPriceUnitField = useMemo(
    () => getErrorField(priceUnitField, errorsPriceUnitField),
    [errorsPriceUnitField, priceUnitField],
  );

  const priceQuantityField = useMemo(
    () => ({ accessor: 'priceQuantity', label: 'Price Quantity', type: 'text', required: true, readonly: true }),
    [],
  );

  const errorsPriceQuantity = useMemo(
    () => (submittedCounter > 0 ? validateField(priceQuantityField, priceQuantity) : []),
    [priceQuantity, priceQuantityField, submittedCounter],
  );

  const errorPriceQuantityField = useMemo(
    () => getErrorField(priceQuantityField, errorsPriceQuantity),
    [errorsPriceQuantity, priceQuantityField],
  );

  const onQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity({ quantity: event.target.value as unknown as number });
      setPriceQuantity({ priceQuantity: ((event.target.value || 0) as number) * priceUnit });
    },
    [priceUnit, setPriceQuantity, setQuantity],
  );

  return (
    <>
      <TextInput
        key={`field-input-quantity`}
        onChange={onQuantityChange}
        textAlign="right"
        {...quantityField}
        {...props}
        {...errorFieldQuantity}
        value={quantity}
      />
      <TextInput
        key={`field-input-price-unit`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPriceUnit({ priceUnit: event.target.value as unknown as number });
          setPriceQuantity({ priceQuantity: quantity * ((event.target.value || 0) as number) });
        }}
        textAlign="right"
        {...priceUnitField}
        {...props}
        {...errorPriceUnitField}
        value={priceUnit}
      />
      <TextInput
        key={`field-input-price-quantity`}
        onChange={() => { }}
        textAlign="right"
        {...priceQuantityField}
        {...props}
        {...errorPriceQuantityField}
        value={getFormattedNumber(priceQuantity, 'currency')}
      />
    </>
  );
});

export default PriceQuantityField;
