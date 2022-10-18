// assets
import { detailsViewImg } from 'assets';
// components
import { PageSpinner, Overlay, InvoiceActions, ErrorDisplay } from 'components';
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
// styles
import { FormWrapper } from 'styles';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { InvoiceFormType, FormFieldType, InvoiceCreateType, APiResponseErrorType } from 'types';
// utilities
import { getFormattedNumber } from 'utilities';
import { useAddNotification, useAddToast } from 'contexts';
import InvoiceForm from './InvoiceForm';

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
        label: `${customer.firstName} ${customer.lastName}`,
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
                type: 'row',
                fields: [
                  {
                    accessor: 'subtotal',
                    label: 'Subtotal',
                    type: 'text',
                    value: invoice?.subtotal,
                    normalize: (value: string | number | undefined) => getFormattedNumber(value, 'currency'),
                    readonly: true,
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'taxes',
                    label: 'Taxes',
                    type: 'text',
                    value: invoice?.taxes,
                    normalize: (value) => getFormattedNumber(value, 'currency'),
                    readonly: true,
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'total',
                    label: 'Total',
                    type: 'text',
                    value: invoice?.total,
                    normalize: (value) => getFormattedNumber(value, 'currency'),
                    readonly: true,
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'invoiceDetails',
                    label: 'invoiceDetails',
                    type: 'array',
                    value: invoice?.invoiceDetails,
                    render: () => <pre>{JSON.stringify(invoice?.invoiceDetails)}</pre>,
                    readonly: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    [
      customersOptions,
      invoice?.customerId,
      invoice?.date,
      invoice?.invoice,
      invoice?.invoiceDetails,
      invoice?.subtotal,
      invoice?.taxes,
      invoice?.total,
    ],
  );

  const onAccept = useCallback(
    async (payload: InvoiceFormType) => {
      const calculatedInvoiceId = invoiceId === 'new' ? undefined : invoiceId;
      const { customerId, ...rest } = payload;

      debugger;
      const body: InvoiceCreateType = {
        invoiceId: calculatedInvoiceId,
        customerId: customerId,
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
    <FormWrapper>
      <Overlay />
      <InvoiceForm<InvoiceFormType>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={invoice}
        onAccept={onAccept}
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={() => navigate('/invoices')}
        viewMode={false}
      ></InvoiceForm>
    </FormWrapper>
  );
});
export default ViewInvoice;
