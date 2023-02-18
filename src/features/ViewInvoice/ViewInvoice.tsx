// components
import { PageSpinner, InvoiceActions } from 'components';
// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useParams, useNavigate, useFetchInvoice, useCallback } from 'hooks';
import { useViewInvoiceConfig } from './hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type { InvoiceFormType } from 'types';
// utilities
import Form from 'components/Form/Form/Form';

const ViewInvoice = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, isLoading: isLoadingInvoice } =
    useFetchInvoice(invoiceId);
  const { fields } = useViewInvoiceConfig(invoice);

  const onFinish = useCallback(() => navigate('/invoices'), [navigate]);

  if (isLoadingInvoice || !fields) return <PageSpinner />;

  return (
    <FormContextProvider<InvoiceFormType>
      initialFields={fields}
      initialData={invoice}
    >
      <Form<InvoiceFormType>
        icon={<InvoiceIcon />}
        title='View invoice'
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={onFinish}
        height='612px'
        width='1120px'
      />
    </FormContextProvider>
  );
};
export default ViewInvoice;
