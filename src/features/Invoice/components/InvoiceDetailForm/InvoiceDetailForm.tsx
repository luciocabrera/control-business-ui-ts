// assets
import { detailsViewImg } from 'assets';
// components
import { Button, Form, PageSpinner } from 'components';
import { InvoiceDetailProduct, PriceQuantityField } from '..';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useFetchProducts } from 'hooks';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { CreateInvoiceDetail, FormFieldType, InvoicesDetails, ProductType } from 'types';

export type DetailFormProps = {
  detail?: InvoicesDetails;
  onAcceptDetail: (detail: InvoicesDetails) => void;
  onFinish: () => void;
};

const InvoiceDetailForm = memo(({ detail, onAcceptDetail, onFinish }: DetailFormProps) => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

  const { data: products, loading: isLoadingProducts } = useFetchProducts();

  const onAccept = useCallback(
    (detail: CreateInvoiceDetail) => {
      const selectedProduct = products?.find(
        ({ productId }: ProductType) =>
          productId === (typeof detail.productId === 'number' ? detail.productId : parseInt(detail.productId, 10)),
      );
      onAcceptDetail?.({
        ...detail,
        ...{
          productNameWithCode: selectedProduct?.nameWithCode ?? '',
          productDescription: selectedProduct?.description ?? '',
          productPrice: selectedProduct?.price ?? 0,
        },
      });
    },
    [onAcceptDetail, products],
  );

  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: '',
            type: 'object',
            render: () => <InvoiceDetailProduct products={products} />,
          },
          {
            accessor: '',
            type: 'object',
            render: () => <PriceQuantityField />,
          },
        ],
      },
      { type: 'rule', accessor: 'productId', label: 'Product', rules: [{ type: 'required' }] },
      {
        type: 'rule',
        accessor: 'description',
        label: 'Description',
        rules: [{ type: 'required' }],
      },
      {
        type: 'rule',
        accessor: 'quantity',
        label: 'Quantity',
        rules: [{ type: 'required' }],
      },
      {
        type: 'rule',
        accessor: 'priceUnit',
        label: 'Price',
        rules: [{ type: 'required' }],
      },
      {
        type: 'rule',
        accessor: 'priceQuantity',
        label: 'Price Quantity',
        rules: [{ type: 'required' }],
      },
    ],
    [products],
  );

  if (isLoadingProducts) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Detail`;

  return (
    <FormDataContextProvider<CreateInvoiceDetail> initialFields={fields} initialData={detail}>
      <Form<CreateInvoiceDetail>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={detail}
        onAccept={onAccept}
        actions={
          <Button id="invoice-details-actions-button-cancel" inverse onClick={onFinish}>
            Cancel
          </Button>
        }
        onFinish={onFinish}
        viewMode={false}
      />
    </FormDataContextProvider>
  );
});

export default InvoiceDetailForm;
