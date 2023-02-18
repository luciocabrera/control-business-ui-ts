// hooks
import { useFetchDocumentTypes, useFetchTitles } from 'hooks';
// react
import { useMemo } from 'react';
// types
import type { CustomerType } from 'types';
import type { FormFieldType } from 'components/Form/components/FormField/types';

export const useCustomerConfig = (customer?: CustomerType) => {
  const { data: documentTypes } = useFetchDocumentTypes();
  const { data: titles } = useFetchTitles();
  const titlesOptions = useMemo(
    () =>
      titles?.map((title) => ({
        label: title.name,
        value: title.titleId
      })),
    [titles]
  );

  const documentTypesOptions = useMemo(
    () =>
      documentTypes?.map((documentType) => ({
        label: documentType.name,
        value: documentType.documentTypeId
      })),
    [documentTypes]
  );

  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: 'documentTypeId',
            label: 'Id Type',
            type: 'select',
            required: true,
            options: documentTypesOptions,
            value: customer?.documentTypeId
          },
          {
            accessor: 'documentId',
            label: 'ID',
            type: 'text',
            required: true,
            placeholder: `Enter the Person's ID`,
            value: customer?.documentId,
            rules: [
              {
                type: 'minLength',
                value: 4
              },
              {
                type: 'maxLength',
                value: 24
              }
            ]
          }
        ]
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'titleId',
            label: 'Title',
            type: 'select',
            required: true,
            options: titlesOptions,
            value: customer?.titleId
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            placeholder: `Enter the Person's Initials`,
            value: customer?.initials,
            rules: [
              {
                type: 'maxLength',
                value: 10
              }
            ]
          },
          {
            accessor: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: `Enter the Person's First Name`,
            value: customer?.firstName,
            rules: [
              {
                type: 'maxLength',
                value: 50
              }
            ]
          },
          {
            accessor: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: `Enter the Person's Last Name`,
            required: true,
            value: customer?.lastName,
            rules: [
              {
                type: 'maxLength',
                value: 50
              }
            ]
          }
        ]
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'phone',
            label: 'Phone Number',
            type: 'text',
            value: customer?.defaultPhone?.phone,
            rules: [
              {
                type: 'maxLength',
                value: 16
              }
            ]
          },
          {
            accessor: 'email',
            label: 'Email',
            type: 'text',
            value: customer?.defaultEmail?.email,
            rules: [
              {
                type: 'maxLength',
                value: 120
              }
            ]
          }
        ]
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
                placeholder: `Street`,
                required: true,
                value: customer?.defaultAddress.line1,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50
                  }
                ]
              },
              {
                accessor: 'line2',
                label: 'Line 2',
                type: 'text',
                placeholder: `Apartment, suite, house number, etc.`,
                value: customer?.defaultAddress.line2,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50
                  }
                ]
              }
            ]
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'country',
                label: 'Country',
                type: 'text',
                required: true,
                value: customer?.defaultAddress.country,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50
                  }
                ]
              },
              {
                accessor: 'region',
                label: 'State / Province',
                type: 'text',
                required: true,
                value: customer?.defaultAddress.region,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50
                  }
                ]
              }
            ]
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'city',
                label: 'City / Town',
                type: 'text',
                required: true,
                value: customer?.defaultAddress.city,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50
                  }
                ]
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                required: true,
                placeholder: `XXXX XX`,
                maxLength: 16,
                value: customer?.defaultAddress.postalCode,
                rules: [
                  {
                    type: 'maxLength',
                    value: 16
                  }
                ]
              }
            ]
          }
        ]
      }
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
      customer?.documentTypeId,
      customer?.firstName,
      customer?.initials,
      customer?.lastName,
      customer?.titleId,
      documentTypesOptions,
      titlesOptions
    ]
  );

  return { fields };
};
