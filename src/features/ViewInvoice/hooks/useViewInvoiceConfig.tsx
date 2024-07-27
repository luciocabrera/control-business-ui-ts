import { InvoiceAmountsField } from 'features/Invoice/components';
import type {
  ColumnDef,
  DateParameterType,
  InvoiceDetailForm,
  InvoicesDetails,
  InvoiceType,
} from 'types';
import { getDateAsString, getFormattedNumber } from 'utilities';

import type {
  FieldBaseValueType,
  FormFieldType,
} from 'components/Form/components/FormField/types';
import { TableField } from 'components/Form/components/TableField';

import { getDateCell } from '../utilities';

export const useViewInvoiceConfig = (invoice?: InvoiceType) => {
  const columns: ColumnDef<InvoicesDetails, unknown>[] = [
    {
      accessorKey: 'productNameWithCode',
      enableGrouping: false,
      header: 'Product',
    },
    {
      accessorKey: 'date',
      cell: getDateCell,
      enableGrouping: false,
      header: 'Date',
    },
    {
      accessorKey: 'description',
      enableGrouping: false,
      header: 'Description',
    },
    {
      accessorKey: 'quantity',
      enableGrouping: false,
      header: 'Quantity',
      meta: { type: 'number' },
    },
    {
      accessorKey: 'priceUnit',
      enableGrouping: false,
      header: 'Price Unit',
      meta: { type: 'currency' },
    },
    {
      accessorKey: 'priceQuantity',
      enableGrouping: false,
      header: 'Price Quantity',
      meta: { type: 'currency' },
    },
  ];

  const fields: FormFieldType[] = [
    {
      fields: [
        {
          fields: [
            {
              fields: [
                {
                  accessor: 'invoice',
                  label: 'Invoice',
                  readonly: true,
                  type: 'text',
                  value: invoice?.invoice,
                },
                {
                  accessor: 'date',
                  label: 'Date',
                  normalize: (value) =>
                    getDateAsString(value as DateParameterType),
                  readonly: true,
                  type: 'text',
                  value: invoice?.date,
                },
              ],
              label: 'General',
              type: 'row',
            },
            {
              accessor: 'fullNameWithInitials',
              label: 'Customer',
              readonly: true,
              type: 'text',
              value: invoice?.customer,
            },
          ],
          type: 'group',
        },
        {
          fields: [
            {
              accessor: '',

              label: 'Amounts',
              render: () => <InvoiceAmountsField />,
              type: 'object',
            },
          ],
          label: 'Amounts',
          type: 'group',
        },
        {
          accessor: 'taxesPercentage',
          type: 'rule',

          value: invoice?.taxesPercentage,
        },
        {
          accessor: 'subtotal',
          normalize: (value: FieldBaseValueType) =>
            getFormattedNumber(value, 'currency'),
          type: 'rule',
          value: invoice?.subtotal,
        },
        {
          accessor: 'taxes',

          normalize: (value: FieldBaseValueType) =>
            getFormattedNumber(value, 'currency'),
          type: 'rule',
          value: invoice?.taxes,
        },
        {
          accessor: 'total',

          normalize: (value: FieldBaseValueType) =>
            getFormattedNumber(value, 'currency'),
          type: 'rule',
          value: invoice?.total,
        },
      ],
      label: 'General',
      type: 'row',
    },
    {
      fields: [
        {
          accessor: 'details',
          label: 'details',
          readonly: true,
          render: () => (
            <TableField<InvoicesDetails, InvoiceDetailForm>
              accessor='details'
              columns={columns}
              data={invoice?.details as InvoicesDetails[]}
              label='Details'
              showHeader={false}
            />
          ),

          type: 'table',
        },
      ],
      type: 'row',
    },
  ];

  return { fields };
};
