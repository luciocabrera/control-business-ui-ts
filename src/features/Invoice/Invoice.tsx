// components
import { PageSpinner, InvoiceActions, ErrorDisplay, Form } from 'components';
import { InvoiceAmountsField, InvoiceDetailsField } from './components';
// contexts
import { useAddNotification, useAddToast, FormDataContextProvider } from 'contexts';
// hooks
import {
  useParams,
  useNavigate,
  useRefreshInvoice,
  useFetchInvoice,
  useFetchCustomers,
  usePostInvoice,
  useRefreshInvoices,
  useFetchInvoiceRates,
} from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// react
import { useCallback, useMemo } from 'react';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  InvoiceCreateType,
  APiResponseErrorType,
  DateParameterType,
  FieldBaseValueType,
  InvoicesDetails,
  InvoiceDetailCreate,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber } from 'utilities';

const Invoice = () => {
  const { invoiceId, action } = useParams();
  const taxesPercentage = useFetchInvoiceRates();

  const isCreating = invoiceId === 'new' || !invoiceId;
  const isCopying = action === 'copy' && !isCreating;

  const { data: customers, isLoading: isLoadingCustomers } = useFetchCustomers();
  const { data: invoice, isLoading: isLoadingInvoice } = useFetchInvoice(!isCreating ? invoiceId : undefined);

  const invoiceForm: InvoiceFormType = useMemo(() => {
    if (isCopying && invoice) return { ...invoice, invoiceId: undefined, invoice: '' };
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

  const customersOptions = useMemo(
    () =>
      customers?.map((customer) => ({
        label: `${customer.fullNameWithInitials}`,
        value: customer.peopleId,
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
                    value: isCopying ? undefined : invoice?.invoice,
                    required: true,
                    rules: [
                      {
                        type: 'length',
                        value: 6,
                      },
                    ],
                  },
                  {
                    accessor: 'date',
                    label: 'Date',
                    type: 'date',
                    value: invoice?.date,
                    required: true,
                    normalize: (value: DateParameterType | undefined) => getDateAsString(value, 'date', true),
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
          {
            type: 'rule',
            accessor: 'taxesPercentage',
            value: taxesPercentage,
          },
          {
            accessor: 'subtotal',
            type: 'rule',
            value: invoice?.subtotal,
            normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
          },
          {
            accessor: 'taxes',
            type: 'rule',
            value: invoice?.taxes,
            normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
          },
          {
            accessor: 'total',
            type: 'rule',
            value: invoice?.total,
            normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'details',
            label: 'details',
            type: 'table',
            render: () => <InvoiceDetailsField />,
            readonly: true,
          },
        ],
      },
    ],
    [
      customersOptions,
      invoice?.customerId,
      invoice?.date,
      invoice?.invoice,
      invoice?.subtotal,
      invoice?.taxes,
      invoice?.total,
      isCopying,
      taxesPercentage,
    ],
  );

  const sanitizeInvoiceDetails = (invoiceDetails: InvoicesDetails[]): InvoiceDetailCreate[] =>
    invoiceDetails.map(({ date, productId, description, quantity, priceUnit, priceQuantity }) => ({
      date: date ? new Date(date) : new Date(),
      description,
      quantity,
      priceUnit,
      priceQuantity,
      productId: typeof productId === 'string' ? parseInt(productId, 10) : productId,
    }));

  const onAccept = useCallback(
    async (payload: InvoiceFormType) => {
      const calculatedInvoiceId = isCreating || isCopying ? undefined : parseInt(invoiceId, 10);
      const { customerId, date, details, ...rest } = payload;

      const body: InvoiceCreateType = {
        invoiceId: calculatedInvoiceId,
        date: date ? new Date(date) : new Date(),
        customerId: typeof customerId === 'string' ? parseInt(customerId, 10) : customerId,
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
            `The Invoice ${invoice?.invoice} has been successfully saved.`,
          );
          navigate(`/invoices`);
        }
      } catch (err) {
        const error = err as APiResponseErrorType;
        addNotification?.(<ErrorDisplay errors={error.cause.errors} />, 'Error Saving Invoice', 'error');
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
    ],
  );

  const onFinish = useCallback(() => navigate('/invoices'), [navigate]);

  if (((isLoadingInvoice || !fields) && !isCreating) || isLoadingCustomers) return <PageSpinner />;

  const title = `${isCreating || isCopying ? 'New' : 'Edit'} Invoice`;

  return (
    <FormDataContextProvider<InvoiceFormType> initialFields={fields} initialData={invoiceForm}>
      <Form<InvoiceFormType>
        icon={<InvoiceIcon />}
        title={title}
        initialFields={fields}
        initialData={invoiceForm}
        onAccept={onAccept}
        actions={<InvoiceActions invoice={invoiceForm} />}
        onFinish={onFinish}
        viewMode={false}
        height="612px"
        width="1120px"
      />
    </FormDataContextProvider>
  );
};
export default Invoice;
