// components
import { Form, PageSpinner, InvoiceActions, NumberDisplay, TableField, DateDisplay } from 'components';
import { InvoiceAmountsField } from 'features/Invoice/components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useNavigate, useFetchInvoice, useMemo } from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  ColumnDef,
  InvoicesDetails,
  DateParameterType,
  InvoiceDetailForm,
  FieldBaseValueType,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber, memo } from 'utilities';

const ViewInvoice = memo(() => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, loading: isLoadingInvoice } = useFetchInvoice(invoiceId);

  const columns = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({
          row: {
            original: { date },
          },
        }) => <DateDisplay date={date} />,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({
          row: {
            original: { quantity },
          },
        }) => <NumberDisplay value={quantity} output={'number'} />,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: ({
          row: {
            original: { priceUnit },
          },
        }) => <NumberDisplay value={priceUnit} output={'currency'} />,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: ({
          row: {
            original: { priceQuantity },
          },
        }) => <NumberDisplay value={priceQuantity} output={'currency'} />,
      },
    ],
    [],
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
                    readonly: true,
                  },
                  {
                    accessor: 'date',
                    label: 'Date',
                    type: 'text',
                    value: invoice?.date,
                    readonly: true,
                    normalize: (value: DateParameterType | undefined) => getDateAsString(value),
                  },
                ],
              },
              {
                accessor: 'fullNameWithInitials',
                label: 'Customer',
                type: 'text',
                value: invoice?.customer?.fullNameWithInitials,
                readonly: true,
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
            value: invoice?.taxesPercentage,
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
            accessor: 'invoiceDetails',
            label: 'invoiceDetails',
            type: 'table',
            render: () => (
              <TableField<InvoicesDetails, InvoiceDetailForm>
                accessor="invoiceDetails"
                label="Details"
                columns={columns}
                data={invoice?.invoiceDetails as InvoicesDetails[]}
                showHeader={false}
              />
            ),
            readonly: true,
          },
        ],
      },
    ],
    [
      columns,
      invoice?.customer?.fullNameWithInitials,
      invoice?.date,
      invoice?.invoice,
      invoice?.invoiceDetails,
      invoice?.subtotal,
      invoice?.taxes,
      invoice?.taxesPercentage,
      invoice?.total,
    ],
  );

  if (isLoadingInvoice || !fields) return <PageSpinner />;

  return (
    <FormDataContextProvider<InvoiceFormType> initialFields={fields} initialData={invoice}>
      <Form<InvoiceFormType>
        icon={<InvoiceIcon />}
        title="View invoice"
        initialFields={fields}
        initialData={invoice}
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={() => navigate('/invoices')}
        height="612px"
        width="1120px"
      />
    </FormDataContextProvider>
  );
});
export default ViewInvoice;
