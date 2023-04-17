// components
// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useCallback,useFetchInvoice, useNavigate, useParams } from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type { InvoiceFormType } from 'types';

import { InvoiceActions,PageSpinner } from 'components';
// utilities
import Form from 'components/Form/Form/Form';

import { useViewInvoiceConfig } from './hooks';

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
