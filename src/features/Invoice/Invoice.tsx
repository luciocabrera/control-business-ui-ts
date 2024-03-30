// components
// react
import { useCallback, useMemo } from 'react';
// contexts
import { useAddNotification, useAddToast } from 'contexts';
// hooks
import {
  useFetchInvoice,
  useFetchInvoiceRates,
  useNavigate,
  useParams,
  usePostInvoice,
  useRefreshInvoice,
  useRefreshInvoices,
} from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type {
  APiResponseErrorType,
  InvoiceCreateType,
  InvoiceDetailCreate,
  InvoiceFormType,
  InvoicesDetails,
} from 'types';

import { ErrorDisplay, InvoiceActions, PageSpinner } from 'components';
import { FormContextProvider } from 'components/Form/contexts';
import Form from 'components/Form/Form/Form';

import { useInvoiceConfig } from './hooks';

const Invoice = () => {
  const { invoiceId, action } = useParams();
  const taxesPercentage = useFetchInvoiceRates();

  const isCreating = invoiceId === 'new' || !invoiceId;
  const isCopying = action === 'copy' && !isCreating;

  const { data: invoice, isLoading: isLoadingInvoice } = useFetchInvoice(
    !isCreating ? invoiceId : undefined
  );

  const invoiceForm: InvoiceFormType = useMemo(() => {
    if (isCopying && invoice)
      return { ...invoice, invoiceId: undefined, invoice: '' };
    if (invoice) return { ...invoice };
    return {
      invoice: '',
      date: undefined,
      customerId: 0,
      details: [],
      subtotal: 0,
      total: 0,
      taxes: 0,
      taxesPercentage,
    };
  }, [invoice, isCopying, taxesPercentage]);

  const refreshInvoices = useRefreshInvoices();
  const refreshInvoice = useRefreshInvoice();
  const postInvoice = usePostInvoice();
  const navigate = useNavigate();

  const addToast = useAddToast();
  const addNotification = useAddNotification();

  const { fields } = useInvoiceConfig({ invoice, isCopying, taxesPercentage });

  const sanitizeInvoiceDetails = (
    invoiceDetails: InvoicesDetails[]
  ): InvoiceDetailCreate[] =>
    invoiceDetails.map(
      ({
        date,
        productId,
        description,
        quantity,
        priceUnit,
        priceQuantity,
      }) => ({
        date: date ? new Date(date) : new Date(),
        description,
        quantity,
        priceUnit,
        priceQuantity,
        productId:
          typeof productId === 'string' ? parseInt(productId, 10) : productId,
      })
    );

  const handleOnAccept = useCallback(
    async (payload: InvoiceFormType) => {
      const calculatedInvoiceId =
        isCreating || isCopying ? undefined : parseInt(invoiceId, 10);
      const { customerId, date, details, ...rest } = payload;

      const body: InvoiceCreateType = {
        invoiceId: calculatedInvoiceId,
        date: date ? new Date(date) : new Date(),
        customerId:
          typeof customerId === 'string'
            ? parseInt(customerId, 10)
            : customerId,
        details: sanitizeInvoiceDetails(details),
        ...rest,
      };

      if (isCreating || isCopying) {
        body.createdBy = 1;
      } else {
        body.updatedBy = 1;
      }
      try {
        const res = await postInvoice(body);
        if ([200, 201].includes(res?.status || 0)) {
          await refreshInvoices();
          refreshInvoice(calculatedInvoiceId);
          addToast?.(
            'success',
            'Invoice successfully saved',
            `The Invoice ${invoice?.invoice} has been successfully saved.`
          );
          navigate(`/invoices`);
        }
      } catch (err) {
        const error = err as APiResponseErrorType;
        addNotification?.(
          <ErrorDisplay errors={error.cause.errors} />,
          'Error Saving Invoice',
          'error'
        );
      }
    },
    [
      addNotification,
      addToast,
      invoice?.invoice,
      invoiceId,
      isCopying,
      isCreating,
      navigate,
      postInvoice,
      refreshInvoice,
      refreshInvoices,
    ]
  );

  const handleOnFinish = useCallback(() => navigate('/invoices'), [navigate]);

  if ((isLoadingInvoice || !fields) && !isCreating) return <PageSpinner />;

  const title = `${isCreating || isCopying ? 'New' : 'Edit'} Invoice`;

  return (
    <FormContextProvider<InvoiceFormType>
      initialFields={fields}
      initialData={invoiceForm}
    >
      <Form<InvoiceFormType>
        icon={<InvoiceIcon />}
        title={title}
        onAccept={handleOnAccept}
        actions={<InvoiceActions invoice={invoiceForm} />}
        onFinish={handleOnFinish}
        viewMode={false}
        height='612px'
        width='1120px'
      />
    </FormContextProvider>
  );
};
export default Invoice;
