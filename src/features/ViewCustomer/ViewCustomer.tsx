// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay, CustomerActions } from 'components';
// hooks
import { useFetchCustomer, useParams, useNavigate } from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { memo, useMemo } from 'react';
// types
import type { CustomerFormType, FormFieldType } from 'types';
import { FormDataContextProvider } from 'contexts/FormDataContext';
import { getInitialData } from 'utilities';
import createFastContext from 'contexts/FormDataContextNew';

const ViewCustomer = memo(() => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, loading: isLoadingCustomer } = useFetchCustomer(customerId);

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
            value: customer?.defaultPhone?.number,
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
                value: customer?.currentAddress.line1,
                readonly: true,
              },
              {
                accessor: 'line2',
                label: 'Line 2',
                type: 'text',
                value: customer?.currentAddress.line2,
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
                value: customer?.currentAddress.country,
                readonly: true,
              },
              {
                accessor: 'state',
                label: 'State / Province',
                type: 'text',
                value: customer?.currentAddress.state,
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
                value: customer?.currentAddress.city,
                readonly: true,
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                value: customer?.currentAddress.postalCode,
                readonly: true,
              },
            ],
          },
        ],
      },
    ],
    [
      customer?.currentAddress.city,
      customer?.currentAddress.country,
      customer?.currentAddress.line1,
      customer?.currentAddress.line2,
      customer?.currentAddress.postalCode,
      customer?.currentAddress.state,
      customer?.defaultEmail?.email,
      customer?.defaultPhone?.number,
      customer?.documentId,
      customer?.documentTypeName,
      customer?.firstName,
      customer?.initials,
      customer?.lastName,
      customer?.titleName,
    ],
  );

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  const newCalculatedData = getInitialData<CustomerFormType>(fields, customer);
  const { Provider, useStore } = createFastContext<CustomerFormType>(newCalculatedData);

  return (
    // <FormDataContextProvider>
    <Provider>
      <FormWrapper>
        <Overlay />
        <Form<CustomerFormType>
          icon={detailsViewImg}
          title="View Customer"
          initialFields={fields}
          initialData={customer}
          actions={<CustomerActions customer={customer} />}
          onFinish={() => navigate('/customers')}
          useStore={useStore}
        />
      </FormWrapper>
    </Provider>
    // </FormDataContextProvider>
  );
});
export default ViewCustomer;
