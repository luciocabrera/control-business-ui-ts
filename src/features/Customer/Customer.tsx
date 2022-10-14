// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay, CustomerActions, ErrorDisplay } from 'components';
// contexts
import { useAddNotification, useAddToast } from 'contexts';
// hooks
import {
  useFetchCustomer,
  useFetchDocumentTypes,
  usePostCustomer,
  useRefreshCustomers,
  useRefreshCustomer,
  useFetchTitles,
  useNavigate,
  useParams,
} from 'hooks';
// styles
import styled from 'styled-components';
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { CustomerCreateType, CustomerFormType, FormFieldType } from 'types';

const FormWrapper = styled.section`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export type ResponseErrorType = { cause: { status: string | number; errors: string[] | string } };

const Customer = memo(() => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

  console.log({ isCreating });

  const { data: documentTypes, loading: isLoadingDocumentTypes } = useFetchDocumentTypes();
  const { data: titles, loading: isLoadingTitles } = useFetchTitles();
  const { data: customer, loading: isLoadingCustomer } = useFetchCustomer(!isCreating ? customerId : undefined);

  const refreshCustomers = useRefreshCustomers();
  const refreshCustomer = useRefreshCustomer();
  const postCustomer = usePostCustomer();
  const navigate = useNavigate();

  const addToast = useAddToast();
  const addNotification = useAddNotification();

  const titlesOptions = useMemo(
    () =>
      titles?.map((title) => ({
        label: title.name,
        value: title.name,
      })),
    [titles],
  );

  const documentTypesOptions = useMemo(
    () =>
      documentTypes?.map((documentType) => ({
        label: documentType.name,
        value: documentType.name,
      })),
    [documentTypes],
  );

  const fields: FormFieldType[] = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: 'documentTypeName',
            label: 'Id Type',
            type: 'select',
            required: true,
            placeholder: '',
            options: documentTypesOptions,
            value: customer?.documentTypeName,
          },
          {
            accessor: 'documentId',
            label: 'ID',
            type: 'text',
            required: true,
            placeholder: `Enter the Person's ID`,
            maxLength: 24,
            value: customer?.documentId,
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
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'titleName',
            label: 'Title',
            type: 'select',
            required: true,
            placeholder: '',
            options: titlesOptions,
            value: customer?.titleName,
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            required: false,
            placeholder: `Enter the Person's Initials`,
            maxLength: 10,
            value: customer?.initials,
            rules: [
              {
                type: 'maxLength',
                value: 10,
              },
            ],
          },
          {
            accessor: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: `Enter the Person's First Name`,
            maxLength: 50,
            value: customer?.firstName,
            rules: [
              {
                type: 'maxLength',
                value: 50,
              },
            ],
          },
          {
            accessor: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: `Enter the Person's Last Name`,
            maxLength: 50,
            value: customer?.lastName,
            rules: [
              {
                type: 'maxLength',
                value: 50,
              },
            ],
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
                placeholder: `Street`,
                required: true,
                maxLength: 50,
                value: customer?.currentAddress.line1,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
              },
              {
                accessor: 'line2',
                label: 'Line 2',
                type: 'text',
                placeholder: `Apartment, suite, house number, etc.`,
                maxLength: 50,
                value: customer?.currentAddress.line2,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
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
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
              },
              {
                accessor: 'state',
                label: 'State / Province',
                type: 'text',
                required: true,
                value: customer?.currentAddress.state,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
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
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                required: true,
                placeholder: `XXXX XX`,
                maxLength: 16,
                value: customer?.currentAddress.postalCode,
                rules: [
                  {
                    type: 'maxLength',
                    value: 16,
                  },
                ],
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
      documentTypesOptions,
      titlesOptions,
    ],
  );

  const onAccept = useCallback(
    async (payload: CustomerFormType) => {
      debugger;
      const { firstName, lastName, documentId, documentTypeName, titleName, initials, ...currentAddress } = payload;
      const calculatedCustomerId = customerId === 'new' ? undefined : customerId;

      const body: CustomerCreateType = {
        customerId: calculatedCustomerId,
        initials,
        firstName,
        lastName,
        documentId,
        documentTypeName,
        titleName,
        addresses: { ...currentAddress },
      };

      try {
        const res = await postCustomer(body);
        if ([200, 201].includes(res?.status || 0)) {
          refreshCustomers();
          refreshCustomer(calculatedCustomerId);
          addToast?.(
            'success',
            'Customer successfully saved',
            `The Customer ${customer?.firstName} ${customer?.lastName} has been successfully saved.`,
          );
          navigate(`/customers`);
        }
      } catch (err) {
        const error = err as ResponseErrorType;
        addNotification?.(<ErrorDisplay errors={error.cause.errors} />, 'Error Saving Customer', 'error');

        console.log('error', err);
      }
    },
    [
      addNotification,
      addToast,
      customer?.firstName,
      customer?.lastName,
      customerId,
      navigate,
      postCustomer,
      refreshCustomer,
      refreshCustomers,
    ],
  );

  if (((isLoadingCustomer || !fields) && !isCreating) || isLoadingDocumentTypes || isLoadingTitles)
    return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Customer`;

  return (
    <FormWrapper>
      <Overlay />v
      <Form<CustomerFormType>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={customer}
        onAccept={onAccept}
        onFinish={() => navigate('/customers')}
        actions={<CustomerActions customer={customer} />}
      />
    </FormWrapper>
  );
});
export default Customer;
