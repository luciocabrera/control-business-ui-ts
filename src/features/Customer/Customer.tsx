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
// icons
import { CustomerIcon } from 'icons';
// react
import { useCallback, useMemo } from 'react';
// types
import type { APiResponseErrorType, CustomerCreateType, CustomerFormType, FormFieldType } from 'types';

const Customer = () => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;

  const { data: documentTypes, isLoading: isLoadingDocumentTypes } = useFetchDocumentTypes();
  const { data: titles, isLoading: isLoadingTitles } = useFetchTitles();
  const { data: customer, isLoading: isLoadingCustomer } = useFetchCustomer(!isCreating ? customerId : undefined);

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
        value: title.titleId,
      })),
    [titles],
  );

  const documentTypesOptions = useMemo(
    () =>
      documentTypes?.map((documentType) => ({
        label: documentType.name,
        value: documentType.documentTypeId,
      })),
    [documentTypes],
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
            value: customer?.documentTypeId,
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
            accessor: 'titleId',
            label: 'Title',
            type: 'select',
            required: true,
            options: titlesOptions,
            value: customer?.titleId,
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
                value: 10,
              },
            ],
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
            accessor: 'phone',
            label: 'Phone Number',
            type: 'text',
            value: customer?.defaultPhone?.phone,
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
                value: customer?.defaultAddress.line1,
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
                value: customer?.defaultAddress.line2,
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
                value: customer?.defaultAddress.country,
                rules: [
                  {
                    type: 'maxLength',
                    value: 50,
                  },
                ],
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
                value: customer?.defaultAddress.city,
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
                value: customer?.defaultAddress.postalCode,
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
      titlesOptions,
    ],
  );

  const onAccept = useCallback(
    async (payload: CustomerFormType) => {
      const { firstName, lastName, documentId, documentTypeId, titleId, initials, phone, email, ...defaultAddress } =
        payload;
      const calculatedCustomerId = customerId === 'new' ? undefined : customerId;

      const body: CustomerCreateType = {
        companyId: 1,
        customerId: calculatedCustomerId,
        initials,
        firstName,
        lastName,
        documentId,
        documentTypeId: typeof documentTypeId === 'string' ? parseInt(documentTypeId, 10) : documentTypeId,
        titleId: typeof titleId === 'string' ? parseInt(titleId, 10) : titleId,
        addresses: [{ ...defaultAddress, main: true }],
        phones: phone ? [{ phone, main: true }] : [],
        emails: email ? [{ email, main: true }] : [],
      };
      if (isCreating) {
        body.createdBy = 1;
      } else {
        body.updatedBy = 1;
      }

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
      isCreating,
      navigate,
      postCustomer,
      refreshCustomer,
      refreshCustomers,
    ],
  );

  const onFinish = useCallback(() => navigate('/customers'), [navigate]);

  if (((isLoadingCustomer || !fields) && !isCreating) || isLoadingDocumentTypes || isLoadingTitles)
    return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Customer`;

  return (
    <FormDataContextProvider<CustomerFormType> initialFields={fields} initialData={customer}>
      <Form<CustomerFormType>
        icon={<CustomerIcon />}
        title={title}
        initialFields={fields}
        initialData={customer}
        onAccept={onAccept}
        onFinish={onFinish}
        actions={<CustomerActions customer={customer} />}
        viewMode={false}
        height="600px"
        width="850px"
      />
    </FormDataContextProvider>
  );
};

export default Customer;
