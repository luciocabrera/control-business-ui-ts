// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay } from 'components';
// hooks
import { useParams, useFetchProducts } from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { memo, useCallback, useMemo, useState } from 'react';
// types
import type { CreateInvoiceDetail, FormFieldType, InvoicesDetails, ProductInvoicesDetails, ProductType } from 'types';

export type DetailFormProps = {
  detail?: InvoicesDetails;
  onAcceptDetail: (detail: CreateInvoiceDetail) => void;
  onFinish: () => void;
};

const DetailForm = memo(({ detail, onAcceptDetail, onFinish }: DetailFormProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductInvoicesDetails | undefined>();
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

  const onSelectProduct = useCallback(
    (newSelectedProductId: string) => {
      const newSelectedProduct = products?.find(
        ({ productId }: ProductType) => productId === parseInt(newSelectedProductId, 10),
      );
      // .map(({ nameWithCode, price, description }: ProductType) => ({
      //   productNameWithCode: nameWithCode,
      //   productDescription: description,
      //   productPrice: price,
      // }));
      debugger;
      setSelectedProduct({
        productNameWithCode: newSelectedProduct?.nameWithCode ?? '',
        productDescription: newSelectedProduct?.description ?? '',
        productPrice: newSelectedProduct?.price ?? 0,
      });
    },
    [products],
  );

  const onAccept = (detail: CreateInvoiceDetail) => {
    debugger;
    onAcceptDetail?.({ ...detail, ...selectedProduct });
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
            onSelect: (newSelectedProduct: string) => onSelectProduct(newSelectedProduct),
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
            change: (quantity: number, priceUnit: number) => {
              //   setPartialFields({ quantity: quantity, priceUnit: priceUnit, priceQuantity: quantity * priceUnit });
            },
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
            readonly: true,
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
      onSelectProduct,
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
