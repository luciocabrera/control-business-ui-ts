// assets
import { detailsViewImg } from 'assets';
// components
import { PageSpinner, Overlay, InvoiceActions, ErrorDisplay, NumberDisplay, Form } from 'components';
// hooks
import {
  useParams,
  useNavigate,
  useRefreshInvoice,
  useFetchInvoice,
  useFetchCustomers,
  usePostInvoice,
  useRefreshInvoices,
  useFetchProducts,
} from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  InvoiceCreateType,
  APiResponseErrorType,
  InvoicesDetails,
  ColumnDef,
  FieldBaseValueType,
  CreateInvoiceDetail,
} from 'types';
// utilities
import { getFormattedNumber } from 'utilities';
import { useAddNotification, useAddToast } from 'contexts';
import InvoiceForm from './InvoiceForm';
import TableField from 'components/Form/TableField/TableField';
import DetailForm from './InvoiceDetailForm';

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
  const columnsDetails = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row: { original } }) => <NumberDisplay value={original.quantity} output={'number'} />,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: ({ row: { original } }) => <NumberDisplay value={original.priceUnit} output={'currency'} />,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: ({ row: { original } }) => <NumberDisplay value={original.priceQuantity} output={'currency'} />,
      },
    ],
    [],
  );

  const { data: products, loading: isLoadingProducts } = useFetchProducts();

  const productsOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: product.name,
        value: product.productId,
      })),
    [products],
  );

  // const fieldDetails: FormFieldType[] = useMemo(
  //   () => [
  //     {
  //       type: 'row',
  //       fields: [
  //         {
  //           accessor: 'productId',
  //           label: 'Product',
  //           type: 'select',
  //           required: true,
  //           options: productsOptions,
  //           value: detail?.productId,
  //         },
  //         {
  //           accessor: 'quantity',
  //           label: 'Quantity',
  //           type: 'number',
  //           required: true,
  //           value: detail?.quantity,
  //         },
  //         {
  //           accessor: 'priceUnit',
  //           label: 'Price Unit',
  //           type: 'number',
  //           required: true,
  //           value: detail?.priceUnit,
  //         },
  //         {
  //           accessor: 'priceQuantity',
  //           label: 'Price Quantity',
  //           type: 'number',
  //           required: true,
  //           value: detail?.priceQuantity,
  //         },
  //       ],
  //     },
  //   ],
  //   [detail?.priceQuantity, detail?.priceUnit, detail?.productId, detail?.quantity, productsOptions],
  // );

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
                    // normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
                    // readonly: true,
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
                    //  normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
                    // readonly: true,
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
                    //  normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
                    // readonly: true,
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'taxesPercentage',
                    label: 'taxesPercentage',
                    type: 'number',
                    value: invoice?.taxesPercentage,
                    // normalize: (value: FieldBaseValueType) => getFormattedNumber(value || 0),
                    // readonly: true,
                  },
                ],
              },
              // {
              //   type: 'row',
              //   fields: [
              //     {
              //       accessor: 'invoiceDetails',
              //       label: 'invoiceDetails',
              //       type: 'array',
              //       value: invoice?.invoiceDetails,
              //       render: () => <pre>{JSON.stringify(invoice?.invoiceDetails)}</pre>,
              //       readonly: true,
              //     },
              //   ],
              // },
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
            render: (value, setField) => (
              <TableField<InvoicesDetails, CreateInvoiceDetail>
                accessor="invoiceDetails"
                label="Details"
                columns={columnsDetails}
                data={value as InvoicesDetails[]}
                setField={setField}
                renderDetail={(
                  onAccept: (detail: CreateInvoiceDetail) => void,
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
    [
      columnsDetails,
      customersOptions,
      invoice?.customerId,
      invoice?.date,
      invoice?.invoice,
      invoice?.subtotal,
      invoice?.taxes,
      invoice?.taxesPercentage,
      invoice?.total,
    ],
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
    <FormWrapper>
      <Overlay />
      <Form<InvoiceFormType>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={invoice}
        onAccept={onAccept}
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={() => navigate('/invoices')}
        viewMode={false}
      ></Form>
    </FormWrapper>
  );
});
export default ViewInvoice;
