import { useFetchDocumentTypes, useFetchTitles } from 'hooks';
import type { CustomerType } from 'types';

import type { FormFieldType } from 'components/Form/components/FormField/types';

export const useCustomerConfig = (customer?: CustomerType) => {
  const { data: documentTypes } = useFetchDocumentTypes();
  const { data: titles } = useFetchTitles();
  const titlesOptions = titles?.map((title) => ({
    label: title.name,
    value: title.titleId,
  }));

  const documentTypesOptions = documentTypes?.map((documentType) => ({
    label: documentType.name,
    value: documentType.documentTypeId,
  }));

  const fields: FormFieldType[] = [
    {
      fields: [
        {
          accessor: 'documentTypeId',
          label: 'Id Type',
          options: documentTypesOptions,
          required: true,
          type: 'select',
          value: customer?.documentTypeId,
        },
        {
          accessor: 'documentId',
          label: 'ID',
          placeholder: `Enter the Person's ID`,
          required: true,
          rules: [
            {
              type: 'minLength',
              value: 4,
            },
            {
              type: 'maxLength',
              value: 24,
            },
          ],
          type: 'text',
          value: customer?.documentId,
        },
      ],
      type: 'row',
    },
    {
      fields: [
        {
          accessor: 'titleId',
          label: 'Title',
          options: titlesOptions,
          required: true,
          type: 'select',
          value: customer?.titleId,
        },
        {
          accessor: 'initials',
          label: 'Initials',
          placeholder: `Enter the Person's Initials`,
          rules: [
            {
              type: 'maxLength',
              value: 10,
            },
          ],
          type: 'text',
          value: customer?.initials,
        },
        {
          accessor: 'firstName',
          label: 'First Name',
          placeholder: `Enter the Person's First Name`,
          rules: [
            {
              type: 'maxLength',
              value: 50,
            },
          ],
          type: 'text',
          value: customer?.firstName,
        },
        {
          accessor: 'lastName',
          label: 'Last Name',
          placeholder: `Enter the Person's Last Name`,
          required: true,
          rules: [
            {
              type: 'maxLength',
              value: 50,
            },
          ],
          type: 'text',
          value: customer?.lastName,
        },
      ],
      type: 'row',
    },
    {
      fields: [
        {
          accessor: 'phone',
          label: 'Phone Number',
          rules: [
            {
              type: 'maxLength',
              value: 16,
            },
          ],
          type: 'text',
          value: customer?.defaultPhone?.phone,
        },
        {
          accessor: 'email',
          label: 'Email',
          rules: [
            {
              type: 'maxLength',
              value: 120,
            },
          ],
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
              placeholder: `Street`,
              required: true,
              rules: [
                {
                  type: 'maxLength',
                  value: 50,
                },
              ],
              type: 'text',
              value: customer?.defaultAddress.line1,
            },
            {
              accessor: 'line2',
              label: 'Line 2',
              placeholder: `Apartment, suite, house number, etc.`,
              rules: [
                {
                  type: 'maxLength',
                  value: 50,
                },
              ],
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
              required: true,
              rules: [
                {
                  type: 'maxLength',
                  value: 50,
                },
              ],
              type: 'text',
              value: customer?.defaultAddress.country,
            },
            {
              accessor: 'region',
              label: 'State / Province',
              required: true,
              rules: [
                {
                  type: 'maxLength',
                  value: 50,
                },
              ],
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
              required: true,
              rules: [
                {
                  type: 'maxLength',
                  value: 50,
                },
              ],
              type: 'text',
              value: customer?.defaultAddress.city,
            },
            {
              accessor: 'postalCode',
              label: 'ZIP / Postal code',
              placeholder: `XXXX XX`,
              required: true,
              rules: [
                {
                  type: 'maxLength',
                  value: 16,
                },
              ],
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
