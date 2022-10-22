// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay } from 'components';
// hooks
import { useParams, useFetchProducts } from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { memo, useMemo } from 'react';
// types
import type { CreateInvoiceDetail, FormFieldType, InvoicesDetails } from 'types';

export type DetailFormProps = {
  detail?: InvoicesDetails;
  onAccept: (detail: CreateInvoiceDetail) => void;
  onFinish: () => void;
};

const DetailForm = memo(({ detail, onAccept, onFinish }: DetailFormProps) => {
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
            accessor: 'quantity',
            label: 'Quantity',
            type: 'number',
            required: true,
            value: detail?.quantity,
          },
          {
            accessor: 'priceUnit',
            label: 'Price Unit',
            type: 'number',
            required: true,
            value: detail?.priceUnit,
          },
          {
            accessor: 'priceQuantity',
            label: 'Price Quantity',
            type: 'number',
            required: true,
            // readonly: true,
            value: detail?.priceQuantity,
          },
        ],
      },
    ],
    [
      detail?.description,
      detail?.priceQuantity,
      detail?.priceUnit,
      detail?.productId,
      detail?.quantity,
      productsOptions,
    ],
  );

  if (isLoadingProducts) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Detail`;

  return (
    <FormWrapper>
      <Overlay />
      <Form<CreateInvoiceDetail>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={detail}
        onAccept={onAccept}
        onFinish={onFinish}
        // actions={<CustomerActions customer={customer} />}
        viewMode={false}
      />
    </FormWrapper>
  );
});
export default DetailForm;
