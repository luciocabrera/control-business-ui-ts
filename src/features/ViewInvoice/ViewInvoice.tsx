// components
// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useFetchInvoice, useNavigate, useParams } from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type { InvoiceFormType } from 'types';

import { InvoiceActions, PageSpinner } from 'components';
// utilities
import Form from 'components/Form/Form/Form';

import { useViewInvoiceConfig } from './hooks';

const ViewInvoice = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, isLoading: isLoadingInvoice } =
    useFetchInvoice(invoiceId);
  const { fields } = useViewInvoiceConfig(invoice);

  const onFinish = () => navigate('/invoices');

  if (isLoadingInvoice || !fields) return <PageSpinner />;

  return (
    <FormContextProvider<InvoiceFormType>
      initialData={invoice}
      initialFields={fields}
    >
      <Form<InvoiceFormType>
        actions={<InvoiceActions invoice={invoice} />}
        height='612px'
        icon={<InvoiceIcon />}
        title='View invoice'
        width='1120px'
        onFinish={onFinish}
      />
    </FormContextProvider>
  );
};
export default ViewInvoice;
