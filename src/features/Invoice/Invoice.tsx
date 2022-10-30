// assets
import { detailsViewImg } from 'assets';
// components
import { PageSpinner, InvoiceActions, ErrorDisplay, Form } from 'components';
// hooks
import {
  useParams,
  useNavigate,
  useRefreshInvoice,
  useFetchInvoice,
  useFetchCustomers,
  usePostInvoice,
  useRefreshInvoices,
} from 'hooks';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { InvoiceFormType, FormFieldType, InvoiceCreateType, APiResponseErrorType, InvoicesDetails } from 'types';
// utilities

import { useAddNotification, useAddToast, FormDataContextProvider } from 'contexts';

import DetailForm from './InvoiceDetailForm';

import InvoiceAmountsField from 'components/Form/Form/InvoiceAmountsField/InvoiceAmountsField';
import InvoiceDetailsField from 'components/Form/TableField/InvoiceDetailsField';

const ViewInvoice = memo(() => {
  const { invoiceId } = useParams();

  const isCreating = invoiceId === 'new' || !invoiceId;

  const { data: customers, loading: isLoadingCustomers } = useFetchCustomers();
  const { data: invoice, loading: isLoadingInvoice } = useFetchInvoice(!isCreating ? invoiceId : undefined);

  const refreshInvoices = useRefreshInvoices();
  const refreshInvoice = useRefreshInvoice();
  const postInvoice = usePostInvoice();
  const navigate = useNavigate();

  const addToast = useAddToast();
  const addNotification = useAddNotification();

  const customersOptions = useMemo(
    () =>
      customers?.map((customer) => ({
        label: `${customer.fullNameWithInitials}`,
        value: customer.customerId,
      })),
    [customers],
  );

  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        label: 'General',
        fields: [
          {
            type: 'group',
            label: 'General',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'invoice',
                    label: 'Invoice',
                    type: 'text',
                    value: invoice?.invoice,
                    required: true,
                  },
                  {
                    accessor: 'date',
                    label: 'Date',
                    type: 'date',
                    value: invoice?.date,
                    required: true,
                  },
                ],
              },
              {
                accessor: 'customerId',
                label: 'Customer',
                type: 'select',
                value: invoice?.customerId,
                options: customersOptions,
                required: true,
              },
            ],
          },
          {
            type: 'group',
            label: 'Amounts',
            fields: [
              {
                type: 'object',
                label: 'Amounts',
                accessor: '',
                render: () => <InvoiceAmountsField />,
              },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'invoiceDetails',
            label: 'invoiceDetails',
            type: 'table',
            render: () => (
              <InvoiceDetailsField
                renderDetail={(
                  onAccept: (detail: InvoicesDetails) => void,
                  onFinish: () => void,
                  detail?: InvoicesDetails,
                ) => <DetailForm detail={detail} onAcceptDetail={onAccept} onFinish={onFinish} />}
              />
            ),

            readonly: true,
          },
        ],
      },
    ],
    [customersOptions, invoice?.customerId, invoice?.date, invoice?.invoice],
  );

  const onAccept = useCallback(
    async (payload: InvoiceFormType) => {
      const calculatedInvoiceId = invoiceId === 'new' ? undefined : invoiceId;
      const { customerId, date, invoiceDetails, ...rest } = payload;
      debugger;
      const body: InvoiceCreateType = {
        invoiceId: calculatedInvoiceId,
        date: new Date(date),
        customerId: typeof customerId === 'string' ? parseInt(customerId, 10) : customerId,
        invoiceDetails: invoiceDetails.map(
          ({ productId, productNameWithCode, productDescription, productPrice, ...rest }) => ({
            ...rest,
            productId: typeof productId === 'string' ? parseInt(productId, 10) : productId,
          }),
        ),
        ...rest,
      };

      try {
        const res = await postInvoice(body);
        if ([200, 201].includes(res?.status || 0)) {
          refreshInvoices();
          refreshInvoice(calculatedInvoiceId);
          addToast?.(
            'success',
            'Invoice successfully saved',
            `The Invoice ${invoice?.invoice} has been successfully saved.`,
          );
          navigate(`/invoices`);
        }
      } catch (err) {
        const error = err as APiResponseErrorType;
        addNotification?.(<ErrorDisplay errors={error.cause.errors} />, 'Error Saving Invoice', 'error');
      }
    },
    [addNotification, addToast, invoice?.invoice, invoiceId, navigate, postInvoice, refreshInvoice, refreshInvoices],
  );

  if (((isLoadingInvoice || !fields) && !isCreating) || isLoadingCustomers) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Invoice`;

  return (
    <FormDataContextProvider<InvoiceFormType> initialFields={fields} initialData={invoice}>
      <Form<InvoiceFormType>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={invoice}
        onAccept={onAccept}
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={() => navigate('/invoices')}
        viewMode={false}
      />
    </FormDataContextProvider>
  );
});
export default ViewInvoice;
