// components
import { TextInput, Select } from 'components';
// contexts
import { useFormStatusStore, useStore } from 'contexts';
// hooks
import { useFetchProducts } from 'hooks';
// react
import { useCallback, useMemo } from 'react';
// types
import type { InvoiceDetailProductProps } from './InvoiceDetailProduct.types';
import type { CreateInvoiceDetail, FieldBaseValueType, ProductType } from 'types';
// utilities
import { getErrorField, validateField, memo } from 'utilities';

const InvoiceDetailProduct = memo(({ products, ...props }: InvoiceDetailProductProps) => {
  const [productId, setProductId] = useStore<number, Pick<CreateInvoiceDetail, 'productId'>>(
    (store) => store.productId,
  );
  const [, setPriceUnit] = useStore<number, Pick<CreateInvoiceDetail, 'priceUnit'>>((store) => store.priceUnit);
  const [description, setDescription] = useStore<FieldBaseValueType, Pick<CreateInvoiceDetail, 'description'>>(
    (store) => store.description,
  );
  const [quantity] = useStore<number, Pick<CreateInvoiceDetail, 'quantity'>>((store) => store.quantity);

  const [, setPriceQuantity] = useStore<number, Pick<CreateInvoiceDetail, 'priceQuantity'>>(
    (store) => store.priceQuantity || 0,
  );

  const productsOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: product.nameWithCode,
        value: product.productId,
      })),
    [products],
  );

  const [formStatus] = useFormStatusStore();
  const { submittedCounter } = formStatus;

  const productField = useMemo(
    () => ({ accessor: 'productId', label: 'Product', type: 'select', required: true, options: productsOptions }),
    [productsOptions],
  );

  const errorsProductId = useMemo(
    () => (submittedCounter > 0 ? validateField(productField, productId) : []),
    [productId, productField, submittedCounter],
  );

  const errorFieldProductId = useMemo(
    () => getErrorField(productField, errorsProductId),
    [errorsProductId, productField],
  );

  const descriptionField = useMemo(
    () => ({ accessor: 'description', label: 'Description', type: 'text', required: true }),
    [],
  );

  const errorsDescriptionField = useMemo(
    () => (submittedCounter > 0 ? validateField(descriptionField, description) : []),
    [description, descriptionField, submittedCounter],
  );

  const errorDescriptionField = useMemo(
    () => getErrorField(descriptionField, errorsDescriptionField),
    [errorsDescriptionField, descriptionField],
  );

  const onSelectProduct = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = parseInt(event.target.options[event.target.selectedIndex]?.value, 10);

      const selectedProduct = products?.find(({ productId }: ProductType) => productId === selected);
      setProductId({ productId: selected });
      setPriceUnit({ priceUnit: selectedProduct?.price });
      setPriceQuantity({ priceQuantity: quantity * (selectedProduct?.price || 0) });
      if (!description) setDescription({ description: selectedProduct?.description });
    },
    [description, products, quantity, setDescription, setPriceQuantity, setPriceUnit, setProductId],
  );

  return (
    <>
      <Select
        key={`field-select-product-id`}
        onChange={onSelectProduct}
        value={productId}
        {...productField}
        {...props}
        {...errorFieldProductId}
      />
      <TextInput
        key={`field-input-price-productId`}
        onChange={() => {}}
        {...descriptionField}
        {...props}
        {...errorDescriptionField}
        value={description}
      />
    </>
  );
});

export default InvoiceDetailProduct;
