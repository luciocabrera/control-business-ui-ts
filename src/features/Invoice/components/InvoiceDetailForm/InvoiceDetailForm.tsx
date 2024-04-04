import { memo, useCallback } from 'react';
import { detailsViewImg } from 'assets';
import { FormContextProvider } from 'contexts';
import { useFetchProducts, useParams } from 'hooks';
import type {
  InvoiceDetailForm as InvoiceDetailFormType,
  ProductType,
} from 'types';

import { PageSpinner } from 'components';
import { Button } from 'components/Form/components/Button';
import Form from 'components/Form/Form/Form';

import useInvoiceDetailFormConfig from './hooks/useInvoiceDetailFormConfig';
import type { InvoiceDetailFormProps } from './InvoiceDetailForm.types';

const InvoiceDetailForm = memo(
  ({ detail, onAcceptDetail, onFinish }: InvoiceDetailFormProps) => {
    const { customerId } = useParams();

    const isCreating = customerId === 'new' || !customerId;

    const { data: products, isLoading: isLoadingProducts } = useFetchProducts();

    const { fields } = useInvoiceDetailFormConfig(products);

    const onAccept = useCallback(
      (detail: InvoiceDetailFormType) => {
        const selectedProduct = products?.find(
          ({ productId }: ProductType) =>
            productId ===
            (typeof detail.productId === 'number'
              ? detail.productId
              : parseInt(detail.productId, 10))
        );
        onAcceptDetail?.({
          ...detail,
          ...{
            productDescription: selectedProduct?.description ?? '',
            productNameWithCode: selectedProduct?.nameWithCode ?? '',
            productPrice: selectedProduct?.price ?? 0,
          },
        });
      },
      [onAcceptDetail, products]
    );

    if (isLoadingProducts) return <PageSpinner />;

    const title = `${isCreating ? 'New' : 'Edit'} Detail`;

    return (
      <FormContextProvider<InvoiceDetailFormType>
        initialData={detail}
        initialFields={fields}
      >
        <Form<InvoiceDetailFormType>
          actions={
            <Button
              inverse
              id='invoice-details-actions-button-cancel'
              onClick={onFinish}
            >
              Cancel
            </Button>
          }
          icon={detailsViewImg}
          title={title}
          viewMode={false}
          width='650px'
          onAccept={onAccept}
          onFinish={onFinish}
        />
      </FormContextProvider>
    );
  }
);

InvoiceDetailForm.displayName = 'InvoiceDetailForm';

export default InvoiceDetailForm;
