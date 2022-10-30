// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, CustomerActions, ErrorDisplay } from 'components';
// contexts
import { useAddNotification, useAddToast, FormDataContextProvider } from 'contexts';
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
// react
import { memo, useCallback, useMemo } from 'react';
// types
import type { APiResponseErrorType, CustomerCreateType, CustomerFormType, FormFieldType } from 'types';

const Customer = memo(() => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

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
            options: documentTypesOptions,
            value: customer?.documentTypeName,
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
            options: titlesOptions,
            value: customer?.titleName,
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            required: false,
            placeholder: `Enter the Person's Initials`,
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
        type: 'row',
        fields: [
          {
            accessor: 'number',
            label: 'Phone Number',
            type: 'text',
            value: customer?.defaultPhone?.number,
            rules: [
              {
                type: 'maxLength',
                value: 16,
              },
            ],
          },
          {
            accessor: 'email',
            label: 'Email',
            type: 'text',
            value: customer?.defaultEmail?.email,
            rules: [
              {
                type: 'maxLength',
                value: 120,
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
      customer?.defaultEmail?.email,
      customer?.defaultPhone?.number,
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
      const {
        firstName,
        lastName,
        documentId,
        documentTypeName,
        titleName,
        initials,
        number,
        email,
        ...currentAddress
      } = payload;
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
        phones: { number },
        emails: { email },
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
        const error = err as APiResponseErrorType;
        addNotification?.(<ErrorDisplay errors={error.cause.errors} />, 'Error Saving Customer', 'error');
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
    <FormDataContextProvider<CustomerFormType> initialFields={fields} initialData={customer}>
      <Form<CustomerFormType>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={customer}
        onAccept={onAccept}
        onFinish={() => navigate('/customers')}
        actions={<CustomerActions customer={customer} />}
        viewMode={false}
      />
    </FormDataContextProvider>
  );
});
export default Customer;
