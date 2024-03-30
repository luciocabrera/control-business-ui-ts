// components
// react
import { useCallback } from 'react';
// contexts
import { FormContextProvider, useAddNotification, useAddToast } from 'contexts';
// hooks
import {
  useFetchCustomer,
  useNavigate,
  useParams,
  usePostCustomer,
  useRefreshCustomer,
  useRefreshCustomers,
} from 'hooks';
// icons
import { CustomerIcon } from 'icons';
// types
import type {
  APiResponseErrorType,
  CustomerCreateType,
  CustomerFormType,
} from 'types';

import { CustomerActions, ErrorDisplay, PageSpinner } from 'components';
import Form from 'components/Form/Form/Form';

import { useCustomerConfig } from './hooks';

const Customer = () => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;
  const { data: customer, isLoading: isLoadingCustomer } = useFetchCustomer(
    !isCreating ? customerId : undefined
  );

  const refreshCustomers = useRefreshCustomers();
  const refreshCustomer = useRefreshCustomer();
  const postCustomer = usePostCustomer();
  const navigate = useNavigate();
  const addToast = useAddToast();
  const addNotification = useAddNotification();

  console.log('Customer');

  const { fields } = useCustomerConfig(customer);

  const handleOnAccept = useCallback(
    async (payload: CustomerFormType) => {
      const {
        firstName,
        lastName,
        documentId,
        documentTypeId,
        titleId,
        initials,
        phone,
        email,
        ...defaultAddress
      } = payload;
      const calculatedCustomerId =
        customerId === 'new' ? undefined : customerId;

      const body: CustomerCreateType = {
        companyId: 1,
        customerId: calculatedCustomerId,
        initials,
        firstName,
        lastName,
        documentId,
        documentTypeId:
          typeof documentTypeId === 'string'
            ? parseInt(documentTypeId, 10)
            : documentTypeId,
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
            `The Customer ${customer?.firstName} ${customer?.lastName} has been successfully saved.`
          );
          navigate(`/customers`);
        }
      } catch (err) {
        const error = err as APiResponseErrorType;
        addNotification?.(
          <ErrorDisplay errors={error.cause.errors} />,
          'Error Saving Customer',
          'error'
        );
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
    ]
  );

  const handleOnFinish = useCallback(() => navigate('/customers'), [navigate]);

  if ((isLoadingCustomer || !fields) && !isCreating) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Customer`;

  return (
    <FormContextProvider<CustomerFormType>
      initialFields={fields}
      initialData={customer}
    >
      <Form<CustomerFormType>
        icon={<CustomerIcon />}
        title={title}
        onAccept={handleOnAccept}
        onFinish={handleOnFinish}
        actions={<CustomerActions customer={customer} />}
        viewMode={false}
        height='600px'
        width='850px'
      />
    </FormContextProvider>
  );
};

export default Customer;
