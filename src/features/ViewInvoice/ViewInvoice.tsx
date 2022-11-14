// components
import { Form, PageSpinner, InvoiceActions, NumberDisplay, TableField, DateDisplay } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useNavigate, useFetchInvoice, useCallback, useMemo } from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  Column,
  InvoicesDetails,
  DateParameterType,
  FieldBaseValueType,
  InvoiceDetailForm,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber, memo } from 'utilities';

const ViewInvoice = memo(() => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, loading: isLoadingInvoice } = useFetchInvoice(invoiceId);

  const columns = useMemo<Column<InvoicesDetails>[]>(
    () => [
      {
        key: 'productNameWithCode',
        name: 'Product',
      },
      {
        key: 'date',
        name: 'Date',
        formatter: ({ row: { date } }) => <DateDisplay date={date} />,
      },
      {
        key: 'description',
        name: 'Description',
      },
      {
        key: 'quantity',
        name: 'Quantity',
        formatter: ({ row: { quantity } }) => <NumberDisplay value={quantity} output={'number'} />,
      },
      {
        key: 'priceUnit',
        name: 'Price Unit',
        formatter: ({ row: { priceUnit } }) => <NumberDisplay value={priceUnit} output={'currency'} />,
      },
      {
        key: 'priceQuantity',
        name: 'Price Quantity',
        formatter: ({ row: { priceQuantity } }) => <NumberDisplay value={priceQuantity} output={'currency'} />,
      },
    ],
    [],
  );
  type Comparator = (a: InvoicesDetails, b: InvoicesDetails) => number;
  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'productNameWithCode':
      case 'date':
      case 'description':
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      case 'quantity':
      case 'priceUnit':
      case 'priceQuantity':
        return (a, b) => a[sortColumn] - b[sortColumn];

      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }, []);

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
                type: 'row',
                fields: [
                  {
                    accessor: 'subtotal',
                    label: 'Subtotal',
                    type: 'text',
                    textAlign: 'right',
                    value: invoice?.subtotal,
                    normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
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
                    textAlign: 'right',
                    value: invoice?.taxes,
                    normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
                    readonly: true,
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    accessor: 'taxesPercentage',
                    label: 'Taxes',
                    type: 'text',
                    textAlign: 'right',
                    value: `${invoice?.taxesPercentage}%`,
                    normalize: (value: FieldBaseValueType) => `${value}%`,
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
                    textAlign: 'right',
                    value: invoice?.total,
                    normalize: (value: FieldBaseValueType) => getFormattedNumber(value, 'currency'),
                    readonly: true,
                  },
                ],
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
              <TableField<InvoicesDetails, InvoiceDetailForm>
                accessor="invoiceDetails"
                label="Details"
                columns={columns}
                data={invoice?.invoiceDetails as InvoicesDetails[]}
                getComparator={getComparator}
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
      getComparator,
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
      />
    </FormDataContextProvider>
  );
});
export default ViewInvoice;
