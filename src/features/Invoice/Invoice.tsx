import { useAddNotification, useAddToast } from 'contexts';
import {
  useFetchInvoice,
  useFetchInvoiceRates,
  useNavigate,
  useParams,
  usePostInvoice,
  useRefreshInvoice,
  useRefreshInvoices,
} from 'hooks';
import { InvoiceIcon } from 'icons';
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
  const { action, invoiceId } = useParams();
  const taxesPercentage = useFetchInvoiceRates();

  const isCreating = invoiceId === 'new' || !invoiceId;
  const isCopying = action === 'copy' && !isCreating;

  const { data: invoice, isLoading: isLoadingInvoice } = useFetchInvoice(
    !isCreating ? invoiceId : undefined
  );

  let invoiceForm: InvoiceFormType;

  if (isCopying && invoice) {
    invoiceForm = { ...invoice, invoice: '', invoiceId: undefined };
  } else {
    if (invoice) {
      invoiceForm = { ...invoice };
    } else {
      invoiceForm = {
        customerId: 0,
        date: undefined,
        details: [],
        invoice: '',
        subtotal: 0,
        taxes: 0,
        taxesPercentage,
        total: 0,
      };
    }
  }

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
        description,
        priceQuantity,
        priceUnit,
        productId,
        quantity,
      }) => ({
        date: date ? new Date(date) : new Date(),
        description,
        priceQuantity,
        priceUnit,

        productId:
          typeof productId === 'string' ? parseInt(productId, 10) : productId,
        quantity,
      })
    );

  const onAccept = async (payload: InvoiceFormType) => {
    const calculatedInvoiceId =
      isCreating || isCopying ? undefined : parseInt(invoiceId, 10);
    const { customerId, date, details, ...rest } = payload;

    const body: InvoiceCreateType = {
      customerId:
        typeof customerId === 'string' ? parseInt(customerId, 10) : customerId,
      date: date ? new Date(date) : new Date(),
      details: sanitizeInvoiceDetails(details),
      invoiceId: calculatedInvoiceId,
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
        await refreshInvoice(calculatedInvoiceId);
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
  };

  const onFinish = () => navigate('/invoices');

  if ((isLoadingInvoice || !fields) && !isCreating) return <PageSpinner />;

  const title = `${isCreating || isCopying ? 'New' : 'Edit'} Invoice`;

  return (
    <FormContextProvider<InvoiceFormType>
      initialData={invoiceForm}
      initialFields={fields}
    >
      <Form<InvoiceFormType>
        actions={<InvoiceActions invoice={invoiceForm} />}
        height='612px'
        icon={<InvoiceIcon />}
        title={title}
        viewMode={false}
        width='1120px'
        onAccept={onAccept}
        onFinish={onFinish}
      />
    </FormContextProvider>
  );
};
export default Invoice;
