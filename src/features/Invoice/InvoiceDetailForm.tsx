// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useFetchProducts } from 'hooks';
// react
import { memo, useMemo } from 'react';
// types
import type { CreateInvoiceDetail, FormFieldType, InvoicesDetails, ProductType } from 'types';

import PriceQuantityField from 'components/Form/Form/PriceQuantityField/PriceQuantityField';

export type DetailFormProps = {
  detail?: InvoicesDetails;
  onAcceptDetail: (detail: InvoicesDetails) => void;
  onFinish: () => void;
};

const DetailForm = memo(({ detail, onAcceptDetail, onFinish }: DetailFormProps) => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

  const { data: products, loading: isLoadingProducts } = useFetchProducts();

  const productsOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: product.nameWithCode,
        value: product.productId,
      })),
    [products],
  );

  const onAccept = (detail: CreateInvoiceDetail) => {
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
  };
  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: 'productId',
            label: 'Product',
            type: 'select',
            required: true,
            options: productsOptions,
            value: detail?.productId,
          },
          {
            accessor: 'description',
            label: 'Description',
            type: 'text',
            required: true,
            value: detail?.description,
          },
          {
            accessor: 'priceQuantity',
            label: 'Price Quantity',
            type: 'number',
            required: true,
            readonly: true,
            render: () => <PriceQuantityField />,
          },
        ],
      },
    ],
    [detail?.description, detail?.productId, productsOptions],
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
        onFinish={onFinish}
        viewMode={false}
      />
    </FormDataContextProvider>
  );
});

export default DetailForm;
