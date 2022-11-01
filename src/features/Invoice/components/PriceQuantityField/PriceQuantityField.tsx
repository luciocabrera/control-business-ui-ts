// components
import TextInput from 'components/Form/TextInput/TextInput';
// contexts
import { useFormStatusStore, useStore } from 'contexts';
// react
import { useCallback, useMemo } from 'react';
// types
import type { PriceQuantityFieldProps } from './PriceQuantityField.types';
import type { CreateInvoiceDetail } from 'types';
// utilities
import { getErrorField, validateField, memo, getFormattedNumber } from 'utilities';

const PriceQuantityField = memo(({ ...props }: PriceQuantityFieldProps) => {
  const [quantity, setQuantity] = useStore<number, Pick<CreateInvoiceDetail, 'quantity'>>((store) => store.quantity);
  const [priceUnit, setPriceUnit] = useStore<number, Pick<CreateInvoiceDetail, 'priceUnit'>>(
    (store) => store.priceUnit,
  );
  const [priceQuantity, setPriceQuantity] = useStore<number, Pick<CreateInvoiceDetail, 'priceQuantity'>>(
    (store) => store.priceQuantity || 0,
  );

  const [formStatus] = useFormStatusStore();
  const { submittedCounter } = formStatus;

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
        onChange={() => {}}
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
