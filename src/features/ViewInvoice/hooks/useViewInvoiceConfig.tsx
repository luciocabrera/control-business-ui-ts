// components
// react
import { useMemo } from 'react';
import { InvoiceAmountsField } from 'features/Invoice/components';
// types
import type {
  ColumnDef,
  DateParameterType,
  InvoiceDetailForm,
  InvoicesDetails,
  InvoiceType,
} from 'types';
// utilities
import { getDateAsString, getFormattedNumber } from 'utilities';

import type {
  FieldBaseValueType,
  FormFieldType,
} from 'components/Form/components/FormField/types';
import { TableField } from 'components/Form/components/TableField';

import {
  getDateCell,
  getPriceQuantityCell,
  getPriceUnitCell,
  getQuantityCell,
} from '../utilities';

export const useViewInvoiceConfig = (invoice?: InvoiceType) => {
  const columns = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: getDateCell,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: getQuantityCell,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: getPriceUnitCell,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: getPriceQuantityCell,
      },
    ],
    []
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
                    normalize: (value: DateParameterType | undefined) =>
                      getDateAsString(value),
                  },
                ],
              },
              {
                accessor: 'fullNameWithInitials',
                label: 'Customer',
                type: 'text',
                value: invoice?.customer,
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
            normalize: (value: FieldBaseValueType) =>
              getFormattedNumber(value, 'currency'),
          },
          {
            accessor: 'taxes',
            type: 'rule',
            value: invoice?.taxes,
            normalize: (value: FieldBaseValueType) =>
              getFormattedNumber(value, 'currency'),
          },
          {
            accessor: 'total',
            type: 'rule',
            value: invoice?.total,
            normalize: (value: FieldBaseValueType) =>
              getFormattedNumber(value, 'currency'),
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
            render: () => (
              <TableField<InvoicesDetails, InvoiceDetailForm>
                accessor='details'
                label='Details'
                columns={columns}
                data={invoice?.details as InvoicesDetails[]}
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
      invoice?.customer,
      invoice?.date,
      invoice?.invoice,
      invoice?.details,
      invoice?.subtotal,
      invoice?.taxes,
      invoice?.taxesPercentage,
      invoice?.total,
    ]
  );

  return { fields };
};
