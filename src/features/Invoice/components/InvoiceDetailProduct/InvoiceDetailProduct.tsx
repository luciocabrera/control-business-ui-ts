import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';
import type { DateParameterType, InvoiceDetailForm, ProductType } from 'types';
import { getDateAsString } from 'utilities';

import type { FieldBaseValueType } from 'components/Form/components/FormField/types';
import { Select } from 'components/Form/components/Select';
import { TextInput } from 'components/Form/components/TextInput';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { InvoiceDetailProductProps } from './InvoiceDetailProduct.types';

const InvoiceDetailProduct = ({
  products,
  ...props
}: InvoiceDetailProductProps) => {
  const [productId, setProductId] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'productId'>
  >((store) => store.productId);
  const [, setPriceUnit] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'priceUnit'>
  >((store) => store.priceUnit);
  const [description, setDescription] = useFieldsContext<
    FieldBaseValueType,
    Pick<InvoiceDetailForm, 'description'>
  >((store) => store.description);
  const [date, setDate] = useFieldsContext<
    DateParameterType,
    Pick<InvoiceDetailForm, 'date'>
  >((store) => store.date);
  const [quantity] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'quantity'>
  >((store) => store.quantity);
  const [, setPriceQuantity] = useFieldsContext<
    number,
    Pick<InvoiceDetailForm, 'priceQuantity'>
  >((store) => store.priceQuantity || 0);

  const dateSanitized = getDateAsString(date, 'date', true);

  const productsOptions = products?.map((product) => ({
    label: product.nameWithCode,
    value: product.productId,
  }));

  const [submittedCounter] = useFormMetaContext<
    number,
    Pick<FormMetaType<InvoiceDetailForm>, 'submittedCounter'>
  >((store) => store.submittedCounter);

  // Product -Service
  // ---------------------------------------------------------------------------------------------------
  const productField = {
    accessor: 'productId',
    label: 'Product',
    options: productsOptions,
    required: true,
    type: 'select',
  };

  const errorsProductId =
    submittedCounter > 0 ? validateField(productField, productId) : [];

  const errorFieldProductId = getErrorField(productField, errorsProductId);

  // Description
  // ---------------------------------------------------------------------------------------------------
  const descriptionField = {
    accessor: 'description',
    label: 'Description',
    required: true,
    type: 'text',
  };

  const errorsDescriptionField =
    submittedCounter > 0 ? validateField(descriptionField, description) : [];
  const errorDescriptionField = getErrorField(
    descriptionField,
    errorsDescriptionField
  );

  // Date - Carried out
  // ---------------------------------------------------------------------------------------------------
  const dateField = {
    accessor: 'date',
    label: 'Date',
    required: true,
    type: 'date',
  };

  const errorsDateField =
    submittedCounter > 0 ? validateField(dateField, date) : [];

  const errorDateField = getErrorField(dateField, errorsDateField);

  const onSelectProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected =
      parseInt(event.target.options[event.target.selectedIndex]?.value, 10) ||
      undefined;

    const selectedProduct = products?.find(
      ({ productId }: ProductType) => productId === selected
    );
    setProductId({ productId: selected });
    setPriceUnit({ priceUnit: selectedProduct?.price });
    setPriceQuantity({
      priceQuantity: quantity * (selectedProduct?.price || 0),
    });
    if (!description)
      setDescription({ description: selectedProduct?.description });
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription({ description: event.target.value });
  };
  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate({ date: event.target.value });
  };
  return (
    <>
      <Select
        key={`field-select-product-id`}
        value={productId}
        onChange={onSelectProduct}
        {...productField}
        {...props}
        {...errorFieldProductId}
      />
      <TextInput
        key={`field-input-description`}
        onChange={onDescriptionChange}
        {...descriptionField}
        {...props}
        {...errorDescriptionField}
        value={description}
      />
      <TextInput
        key={`field-input-carried-out`}
        onChange={onDateChange}
        {...dateField}
        {...props}
        {...errorDateField}
        value={dateSanitized}
      />
    </>
  );
};

export default InvoiceDetailProduct;
