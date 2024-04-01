import { useMemo } from 'react';
import { useFetchCustomers } from 'hooks';
import type { DateParameterType, InvoiceType } from 'types';
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
        fields: [
          {
            accessor: 'invoice',
            label: 'Invoice',
            required: true,
            rules: [
              {
                type: 'length',
                value: 6,
              },
            ],
            type: 'text',
            value: isCopying ? undefined : invoice?.invoice,
          },
          {
            accessor: 'date',
            label: 'Date',
            normalize: (value: DateParameterType | undefined) =>
              getDateAsString(value, 'date', true),
            required: true,
            type: 'date',
            value: invoice?.date,
          },
        ],
        label: 'General',
        type: 'row',
      },
      {
        fields: [
          {
            accessor: 'customerId',
            label: 'Customer',
            options: customersOptions,
            required: true,
            type: 'select',
            value: invoice?.customerId,
          },
        ],
        label: 'General',
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
        value: taxesPercentage,
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
      {
        fields: [
          {
            accessor: 'details',
            label: 'details',
            readonly: true,
            render: () => <InvoiceDetailsField />,
            type: 'table',
          },
        ],
        type: 'row',
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
