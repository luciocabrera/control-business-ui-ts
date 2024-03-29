// assets
// react
import { memo, useCallback } from 'react';
import { detailsViewImg } from 'assets';
// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useFetchProducts,useParams } from 'hooks';
// types
import type {
  InvoiceDetailForm as InvoiceDetailFormType,
  ProductType,
} from 'types';

// components
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
            productNameWithCode: selectedProduct?.nameWithCode ?? '',
            productDescription: selectedProduct?.description ?? '',
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
        initialFields={fields}
        initialData={detail}
      >
        <Form<InvoiceDetailFormType>
          icon={detailsViewImg}
          title={title}
          onAccept={onAccept}
          actions={
            <Button
              id='invoice-details-actions-button-cancel'
              inverse
              onClick={onFinish}
            >
              Cancel
            </Button>
          }
          onFinish={onFinish}
          viewMode={false}
          width='650px'
        />
      </FormContextProvider>
    );
  }
);

InvoiceDetailForm.displayName = 'InvoiceDetailForm';

export default InvoiceDetailForm;
