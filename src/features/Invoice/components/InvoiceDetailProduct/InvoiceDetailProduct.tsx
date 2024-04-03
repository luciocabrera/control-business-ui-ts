import { useCallback, useMemo } from 'react';
import { FormMetaType, useFieldsContext, useFormMetaContext } from 'contexts';
import type { DateParameterType, InvoiceDetailForm, ProductType } from 'types';
import { getDateAsString, memo } from 'utilities';

import type { FieldBaseValueType } from 'components/Form/components/FormField/types';
import { Select } from 'components/Form/components/Select';
import { TextInput } from 'components/Form/components/TextInput';
import { getErrorField, validateField } from 'components/Form/utilities';

import type { InvoiceDetailProductProps } from './InvoiceDetailProduct.types';

const InvoiceDetailProduct = memo(
  ({ products, ...props }: InvoiceDetailProductProps) => {
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

    const productsOptions = useMemo(
      () =>
        products?.map((product) => ({
          label: product.nameWithCode,
          value: product.productId,
        })),
      [products]
    );

    const [submittedCounter] = useFormMetaContext<
      number,
      Pick<FormMetaType<InvoiceDetailForm>, 'submittedCounter'>
    >((store) => store.submittedCounter);

    // Product -Service
    // ---------------------------------------------------------------------------------------------------
    const productField = useMemo(
      () => ({
        accessor: 'productId',
        label: 'Product',
        options: productsOptions,
        required: true,
        type: 'select',
      }),
      [productsOptions]
    );

    const errorsProductId = useMemo(
      () =>
        submittedCounter > 0 ? validateField(productField, productId) : [],
      [productId, productField, submittedCounter]
    );

    const errorFieldProductId = useMemo(
      () => getErrorField(productField, errorsProductId),
      [errorsProductId, productField]
    );

    // Description
    // ---------------------------------------------------------------------------------------------------
    const descriptionField = useMemo(
      () => ({
        accessor: 'description',
        label: 'Description',

        required: true,
        type: 'text',
      }),
      []
    );

    const errorsDescriptionField = useMemo(
      () =>
        submittedCounter > 0
          ? validateField(descriptionField, description)
          : [],
      [description, descriptionField, submittedCounter]
    );

    const errorDescriptionField = useMemo(
      () => getErrorField(descriptionField, errorsDescriptionField),
      [errorsDescriptionField, descriptionField]
    );

    // Date - Carried out
    // ---------------------------------------------------------------------------------------------------
    const dateField = useMemo(
      () => ({ accessor: 'date', label: 'Date', required: true, type: 'date' }),
      []
    );

    const errorsDateField = useMemo(
      () => (submittedCounter > 0 ? validateField(dateField, date) : []),
      [date, dateField, submittedCounter]
    );

    const errorDateField = useMemo(
      () => getErrorField(dateField, errorsDateField),
      [errorsDateField, dateField]
    );

    const onSelectProduct = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected =
          parseInt(
            event.target.options[event.target.selectedIndex]?.value,
            10
          ) || undefined;

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
      },
      [
        description,
        products,
        quantity,
        setDescription,
        setPriceQuantity,
        setPriceUnit,
        setProductId,
      ]
    );

    const onDescriptionChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription({ description: event.target.value });
      },
      [setDescription]
    );

    const onDateChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate({ date: event.target.value });
      },
      [setDate]
    );

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
  }
);

export default InvoiceDetailProduct;
