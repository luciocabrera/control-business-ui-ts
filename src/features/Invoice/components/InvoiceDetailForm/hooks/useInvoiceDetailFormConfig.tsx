import { useMemo } from 'react';
import {
  InvoiceDetailProduct,
  PriceQuantityField,
} from 'features/Invoice/components';
import type { ProductType } from 'types';

import type { FormFieldType } from 'components/Form/components/FormField/types';

const useInvoiceDetailFormConfig = (products?: ProductType[]) => {
  const fields: FormFieldType[] = useMemo(
    () => [
      {
        fields: [
          {
            accessor: '',
            render: () => <InvoiceDetailProduct products={products ?? []} />,
            type: 'object',
          },
          {
            accessor: '',
            render: () => <PriceQuantityField />,
            type: 'object',
          },
        ],
        type: 'row',
      },
      {
        accessor: 'date',
        label: 'Date',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
      {
        accessor: 'productId',
        label: 'Product',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
      {
        accessor: 'description',

        label: 'Description',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
      {
        accessor: 'quantity',
        label: 'Quantity',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
      {
        accessor: 'priceUnit',
        label: 'Price',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
      {
        accessor: 'priceQuantity',
        label: 'Price Quantity',
        rules: [{ type: 'required' }],
        type: 'rule',
      },
    ],
    [products]
  );

  return { fields };
};

export default useInvoiceDetailFormConfig;
