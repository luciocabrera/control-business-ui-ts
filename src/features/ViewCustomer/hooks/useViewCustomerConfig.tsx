// react
import { useMemo } from 'react';
// types
import type { CustomerType } from 'types';
import type { FormFieldType } from 'components/Form/components/FormField/types';

export const useViewCustomerConfig = (customer?: CustomerType) => {
  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: 'documentTypeName',
            label: 'Id Type',
            type: 'text',
            value: customer?.documentTypeName,
            readonly: true,
          },
          {
            accessor: 'documentId',
            label: 'ID',
            type: 'text',
            value: customer?.documentId,
            readonly: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'titleName',
            label: 'Title',
            type: 'text',
            value: customer?.titleName,
            readonly: true,
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            value: customer?.initials,
            readonly: true,
          },
          {
            accessor: 'firstName',
            label: 'First Name',
            type: 'text',
            value: customer?.firstName,
            readonly: true,
          },
          {
            accessor: 'lastName',
            label: 'Last Name',
            type: 'text',
            value: customer?.lastName,
            readonly: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'number',
            label: 'Phone Number',
            type: 'text',
            value: customer?.defaultPhone?.phone,
            readonly: true,
          },
          {
            accessor: 'email',
            label: 'Email',
            type: 'text',
            value: customer?.defaultEmail?.email,
            readonly: true,
          },
        ],
      },
      {
        label: 'Address',
        type: 'group',
        fields: [
          {
            type: 'row',
            fields: [
              {
                accessor: 'line1',
                label: 'Line 1',
                type: 'text',
                value: customer?.defaultAddress.line1,
                readonly: true,
              },
              {
                accessor: 'line2',
                label: 'Line 2',
                type: 'text',
                value: customer?.defaultAddress.line2,
                readonly: true,
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'country',
                label: 'Country',
                type: 'text',
                value: customer?.defaultAddress.country,
                readonly: true,
              },
              {
                accessor: 'state',
                label: 'State / Province',
                type: 'text',
                value: customer?.defaultAddress.region,
                readonly: true,
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'city',
                label: 'City / Town',
                type: 'text',
                value: customer?.defaultAddress.city,
                readonly: true,
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                value: customer?.defaultAddress.postalCode,
                readonly: true,
              },
            ],
          },
        ],
      },
    ],
    [
      customer?.defaultAddress.city,
      customer?.defaultAddress.country,
      customer?.defaultAddress.line1,
      customer?.defaultAddress.line2,
      customer?.defaultAddress.postalCode,
      customer?.defaultAddress.region,
      customer?.defaultEmail?.email,
      customer?.defaultPhone?.phone,
      customer?.documentId,
      customer?.documentTypeName,
      customer?.firstName,
      customer?.initials,
      customer?.lastName,
      customer?.titleName,
    ],
  );

  return { fields };
};
