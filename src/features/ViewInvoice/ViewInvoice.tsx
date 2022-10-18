// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay, InvoiceActions, NumberDisplay, ReadOnlyTable } from 'components';
// hooks
import { useParams, useNavigate, useFetchInvoice } from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { ChangeEvent, memo, useMemo } from 'react';
// types
import type {
  InvoiceFormType,
  FormFieldType,
  ColumnDef,
  InvoicesDetails,
  DateParameterType,
  FieldBaseValueType,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber } from 'utilities';
import TableField from 'components/Form/TableField/TableField';

const ViewInvoice = memo(() => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { data: invoice, loading: isLoadingInvoice } = useFetchInvoice(invoiceId);

  const columns = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorFn: (original) => original.product?.code,
        header: 'Code',
      },
      {
        accessorFn: (original) => original.product?.name,
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
                accessor: 'firstName',
                label: 'Customer',
                type: 'text',
                value: `${invoice?.customer?.firstName} ${invoice?.customer?.lastName}`,
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
            // value: invoice?.invoiceDetails || [],
            // columns: columns,
            render: () => (
              // <pre key="hey">
              //   {invoice?.invoiceDetails?.map((a) => (
              //     <pre>{JSON.stringify(a)}</pre>
              //   ))}
              // </pre>

              <TableField<InvoicesDetails>
                columns={columns}
                data={invoice?.invoiceDetails || []}
                onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                }}
              />
            ),
            readonly: true,
          },
        ],
      },
    ],
    [
      columns,
      invoice?.customer?.firstName,
      invoice?.customer?.lastName,
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
    <FormWrapper>
      <Overlay />
      <Form<InvoiceFormType>
        icon={detailsViewImg}
        title="View invoice"
        initialFields={fields}
        initialData={invoice}
        actions={<InvoiceActions invoice={invoice} />}
        onFinish={() => navigate('/invoices')}
      >
        {/* <ReadOnlyTable<InvoicesDetails> data={invoice?.invoiceDetails || []} columns={columns} useRadius /> */}
      </Form>
    </FormWrapper>
  );
});
export default ViewInvoice;
