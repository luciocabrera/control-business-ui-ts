// react
import {
  InvoiceDetailProduct,
  PriceQuantityField
} from 'features/Invoice/components';
// react
import { useMemo } from 'react';
// types
import type { ProductType } from 'types';
import type { FormFieldType } from 'components/Form/components/FormField/types';

const useInvoiceDetailFormConfig = (products?: ProductType[]) => {
  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: '',
            type: 'object',
            render: () => <InvoiceDetailProduct products={products ?? []} />
          },
          {
            accessor: '',
            type: 'object',
            render: () => <PriceQuantityField />
          }
        ]
      },
      {
        type: 'rule',
        accessor: 'date',
        label: 'Date',
        rules: [{ type: 'required' }]
      },
      {
        type: 'rule',
        accessor: 'productId',
        label: 'Product',
        rules: [{ type: 'required' }]
      },
      {
        type: 'rule',
        accessor: 'description',
        label: 'Description',
        rules: [{ type: 'required' }]
      },
      {
        type: 'rule',
        accessor: 'quantity',
        label: 'Quantity',
        rules: [{ type: 'required' }]
      },
      {
        type: 'rule',
        accessor: 'priceUnit',
        label: 'Price',
        rules: [{ type: 'required' }]
      },
      {
        type: 'rule',
        accessor: 'priceQuantity',
        label: 'Price Quantity',
        rules: [{ type: 'required' }]
      }
    ],
    [products]
  );

  return { fields };
};

export default useInvoiceDetailFormConfig;
