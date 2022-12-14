// components
import { Form, PageSpinner, CustomerActions } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useFetchCustomer, useParams, useNavigate } from 'hooks';
// icons
import { CustomerIcon } from 'icons';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { CustomerFormType, FormFieldType } from 'types';

const ViewCustomer = memo(() => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, isLoading: isLoadingCustomer } = useFetchCustomer(customerId);

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

  const onFinish = useCallback(() => navigate('/customers'), [navigate]);

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  return (
    <FormDataContextProvider<CustomerFormType> initialFields={fields} initialData={customer}>
      <Form<CustomerFormType>
        icon={<CustomerIcon />}
        title="View Customer"
        initialFields={fields}
        initialData={customer}
        actions={<CustomerActions customer={customer} />}
        onFinish={onFinish}
        height="600px"
        width="850px"
      />
    </FormDataContextProvider>
  );
});
export default ViewCustomer;
