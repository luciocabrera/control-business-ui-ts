import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';
import type { InvoiceDetailForm } from 'types';
import { getFormattedNumber } from 'utilities';

import { TextInput } from 'components/Form/components/TextInput';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { PriceQuantityFieldProps } from './PriceQuantityField.types';

const PriceQuantityField = ({ ...props }: PriceQuantityFieldProps) => {
  const [quantity, setQuantity] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'quantity'>
  >((store) => store.quantity);
  const [priceUnit, setPriceUnit] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'priceUnit'>
  >((store) => store.priceUnit);
  const [priceQuantity, setPriceQuantity] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'priceQuantity'>
  >((store) => store.priceQuantity || 0);

  const [submittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<InvoiceDetailForm>, 'submittedCounter'>
  >((store) => store.submittedCounter);

  const quantityField = {
    accessor: 'quantity',
    label: 'Quantity',
    required: true,
    type: 'number',
  };

  const errorsQuantity =
    submittedCounter > 0 ? validateField(quantityField, quantity) : [];

  const errorFieldQuantity = getErrorField(quantityField, errorsQuantity);

  const priceUnitField = {
    accessor: 'priceUnit',
    label: 'Price Unit',
    required: true,
    type: 'number',
  };

  const errorsPriceUnitField =
    submittedCounter > 0 ? validateField(priceUnitField, priceUnit) : [];

  const errorPriceUnitField = getErrorField(
    priceUnitField,
    errorsPriceUnitField
  );

  const priceQuantityField = {
    accessor: 'priceQuantity',
    label: 'Price Quantity',
    readonly: true,
    required: true,
    type: 'text',
  };

  const errorsPriceQuantity =
    submittedCounter > 0
      ? validateField(priceQuantityField, priceQuantity)
      : [];
  const errorPriceQuantityField = getErrorField(
    priceQuantityField,
    errorsPriceQuantity
  );

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity({ quantity: event.target.value as unknown as number });
    setPriceQuantity({
      priceQuantity: ((event.target.value || 0) as number) * priceUnit,
    });
  };
  return (
    <>
      <TextInput
        key={`field-input-quantity`}
        textAlign='right'
        onChange={onQuantityChange}
        {...quantityField}
        {...props}
        {...errorFieldQuantity}
        value={quantity}
      />
      <TextInput
        key={`field-input-price-unit`}
        textAlign='right'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPriceUnit({ priceUnit: event.target.value as unknown as number });
          setPriceQuantity({
            priceQuantity: quantity * ((event.target.value || 0) as number),
          });
        }}
        {...priceUnitField}
        {...props}
        {...errorPriceUnitField}
        value={priceUnit}
      />
      <TextInput
        key={`field-input-price-quantity`}
        textAlign='right'
        onChange={() => {
          /* placeholder function */
        }}
        {...priceQuantityField}
        {...props}
        {...errorPriceQuantityField}
        value={getFormattedNumber(priceQuantity, 'currency')}
      />
    </>
  );
};

export default PriceQuantityField;
