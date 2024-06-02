import type { CustomerType } from 'types';

import type { FormFieldType } from 'components/Form/components/FormField/types';

export const useViewCustomerConfig = (customer?: CustomerType) => {
  const fields: FormFieldType[] = [
    {
      fields: [
        {
          accessor: 'documentTypeName',
          label: 'Id Type',
          readonly: true,
          type: 'text',
          value: customer?.documentTypeName,
        },
        {
          accessor: 'documentId',
          label: 'ID',
          readonly: true,
          type: 'text',
          value: customer?.documentId,
        },
      ],
      type: 'row',
    },
    {
      fields: [
        {
          accessor: 'titleName',
          label: 'Title',
          readonly: true,
          type: 'text',
          value: customer?.titleName,
        },
        {
          accessor: 'initials',
          label: 'Initials',
          readonly: true,
          type: 'text',
          value: customer?.initials,
        },
        {
          accessor: 'firstName',
          label: 'First Name',
          readonly: true,
          type: 'text',
          value: customer?.firstName,
        },
        {
          accessor: 'lastName',
          label: 'Last Name',
          readonly: true,
          type: 'text',
          value: customer?.lastName,
        },
      ],
      type: 'row',
    },
    {
      fields: [
        {
          accessor: 'number',
          label: 'Phone Number',
          readonly: true,
          type: 'text',
          value: customer?.defaultPhone?.phone,
        },
        {
          accessor: 'email',
          label: 'Email',
          readonly: true,
          type: 'text',
          value: customer?.defaultEmail?.email,
        },
      ],
      type: 'row',
    },
    {
      fields: [
        {
          fields: [
            {
              accessor: 'line1',
              label: 'Line 1',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.line1,
            },
            {
              accessor: 'line2',
              label: 'Line 2',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.line2,
            },
          ],
          type: 'row',
        },
        {
          fields: [
            {
              accessor: 'country',
              label: 'Country',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.country,
            },
            {
              accessor: 'state',
              label: 'State / Province',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.region,
            },
          ],
          type: 'row',
        },
        {
          fields: [
            {
              accessor: 'city',
              label: 'City / Town',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.city,
            },
            {
              accessor: 'postalCode',
              label: 'ZIP / Postal code',
              readonly: true,
              type: 'text',
              value: customer?.defaultAddress.postalCode,
            },
          ],
          type: 'row',
        },
      ],
      label: 'Address',
      type: 'group',
    },
  ];

  return { fields };
};
