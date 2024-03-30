// components
// react
import { useMemo } from 'react';
// hooks
import { useFetchCustomers } from 'hooks';
// types
import type { DateParameterType, InvoiceType } from 'types';
// utilities
import { getDateAsString, getFormattedNumber } from 'utilities';

import type {
  FieldBaseValueType,
  FormFieldType,
} from 'components/Form/components/FormField/types';

import { InvoiceAmountsField, InvoiceDetailsField } from '../components';

export const useInvoiceConfig = ({
  invoice,
  isCopying,
  taxesPercentage,
}: {
  invoice?: InvoiceType;
  isCopying: boolean;
  taxesPercentage: number;
}) => {
  const { data: customers } = useFetchCustomers();

  const customersOptions = useMemo(
    () =>
      customers?.map((customer) => ({
        label: `${customer.fullNameWithInitials}`,
        value: customer.peopleId,
      })),
    [customers]
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
                    normalize: (value: DateParameterType | undefined) =>
                      getDateAsString(value, 'date', true),
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
    ]
  );

  return { fields };
};
