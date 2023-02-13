// assets
import { detailsViewImg } from 'assets';
// components
import { PageSpinner } from 'components';
import Form from 'components/Form/Form/Form';
import { Button } from 'components/Form/components/Button';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useFetchProducts } from 'hooks';
import useInvoiceDetailFormConfig from './hooks/useInvoiceDetailFormConfig';
// react
import { memo, useCallback } from 'react';
// types
import type { InvoiceDetailForm as InvoiceDetailFormType, ProductType } from 'types';
import type { InvoiceDetailFormProps } from './InvoiceDetailForm.types';


const InvoiceDetailForm = memo(({ detail, onAcceptDetail, onFinish }: InvoiceDetailFormProps) => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

  const { data: products, isLoading: isLoadingProducts } = useFetchProducts();

  const { fields } = useInvoiceDetailFormConfig(products);

  const onAccept = useCallback(
    (detail: InvoiceDetailFormType) => {
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

  if (isLoadingProducts) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Detail`;

  return (
    <FormDataContextProvider<InvoiceDetailFormType> initialFields={fields} initialData={detail}>
      <Form<InvoiceDetailFormType>
        icon={detailsViewImg}
        title={title}
        onAccept={onAccept}
        actions={
          <Button id="invoice-details-actions-button-cancel" inverse onClick={onFinish}>
            Cancel
          </Button>
        }
        onFinish={onFinish}
        viewMode={false}
        width="650px"
      />
    </FormDataContextProvider>
  );
});

export default InvoiceDetailForm;
