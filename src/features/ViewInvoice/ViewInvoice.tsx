// components
import { Form, PageSpinner, InvoiceActions, NumberDisplay, TableField, DateDisplay } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useNavigate, useFetchInvoice } from 'hooks';
// icons
import { InvoiceIcon } from 'icons';
// react
import { memo, useCallback, useMemo } from 'react';
import DataGrid, { Column, SortColumn } from 'react-data-grid';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  ColumnDef,
  InvoicesDetails,
  DateParameterType,
  FieldBaseValueType,
  CreateInvoiceDetail,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber } from 'utilities';

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

  const rowKeyGetter = useCallback((row: InvoicesDetails): number => {
    return row?.productId;
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
              <TableField<InvoicesDetails, CreateInvoiceDetail>
                accessor="invoiceDetails"
                label="Details"
                columns={columns}
                data={invoice?.invoiceDetails as InvoicesDetails[]}
                rowKeyGetter={rowKeyGetter}
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
      rowKeyGetter,
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
