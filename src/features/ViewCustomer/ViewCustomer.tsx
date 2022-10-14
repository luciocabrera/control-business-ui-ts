// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay, CustomerActions } from 'components';
// hooks
import { useFetchCustomer, useParams, useNavigate } from 'hooks';
// styles
import styled from 'styled-components';
// react
import { memo, useMemo } from 'react';
// types
import type { CustomerFormType, FormFieldType } from 'types';

const FormWrapper = styled.section`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

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
            required: true,
            value: customer?.documentTypeName,
            readonly: true,
          },
          {
            accessor: 'documentId',
            label: 'ID',
            type: 'text',
            required: true,
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
            required: true,
            value: customer?.titleName,
            readonly: true,
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            required: false,
            value: customer?.initials,
            readonly: true,
          },
          {
            accessor: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
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
                required: true,
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
                required: true,
                value: customer?.currentAddress.country,
                readonly: true,
              },
              {
                accessor: 'state',
                label: 'State / Province',
                type: 'text',
                required: true,
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
                required: true,
                value: customer?.currentAddress.city,
                readonly: true,
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                required: true,
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
      customer?.documentId,
      customer?.documentTypeName,
      customer?.firstName,
      customer?.initials,
      customer?.lastName,
      customer?.titleName,
    ],
  );

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  return (
    <FormWrapper>
      <Overlay />v
      <Form<CustomerFormType>
        icon={detailsViewImg}
        title="View Customer"
        initialFields={fields}
        initialData={customer}
        actions={<CustomerActions customer={customer} />}
        onFinish={() => navigate('/customers')}
      />
    </FormWrapper>
  );
});
export default ViewCustomer;
