// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, InvoiceActions, NumberDisplay, TableField } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useParams, useNavigate, useFetchInvoice } from 'hooks';
// react
import { memo, useMemo } from 'react';
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

import InvoiceIcon from 'components/Icons/InvoiceIcon/InvoiceIcon';

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
                    accessor: 'total',
                    label: 'Total',
                    type: 'text',
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
