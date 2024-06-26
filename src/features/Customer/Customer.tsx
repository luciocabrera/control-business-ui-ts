import { FormContextProvider, useAddNotification, useAddToast } from 'contexts';
import {
  useFetchCustomer,
  useNavigate,
  useParams,
  usePostCustomer,
  useRefreshCustomer,
  useRefreshCustomers,
} from 'hooks';
import { CustomerIcon } from 'icons';
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

  const handleOnAccept = async (payload: CustomerFormType) => {
    const {
      documentId,
      documentTypeId,
      email,
      firstName,
      initials,
      lastName,
      phone,
      titleId,
      ...defaultAddress
    } = payload;
    const calculatedCustomerId = customerId === 'new' ? undefined : customerId;

    const body: CustomerCreateType = {
      addresses: [{ ...defaultAddress, main: true }],
      companyId: 1,
      customerId: calculatedCustomerId,
      documentId,
      documentTypeId:
        typeof documentTypeId === 'string'
          ? parseInt(documentTypeId, 10)
          : documentTypeId,
      emails: email ? [{ email, main: true }] : [],
      firstName,
      initials,
      lastName,
      phones: phone ? [{ main: true, phone }] : [],
      titleId: typeof titleId === 'string' ? parseInt(titleId, 10) : titleId,
    };
    if (isCreating) {
      body.createdBy = 1;
    } else {
      body.updatedBy = 1;
    }

    try {
      const res = await postCustomer(body);
      if ([200, 201].includes(res?.status || 0)) {
        await refreshCustomers();
        await refreshCustomer(calculatedCustomerId);
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
  };

  const handleOnFinish = () => navigate('/customers');

  if ((isLoadingCustomer || !fields) && !isCreating) return <PageSpinner />;

  const title = `${isCreating ? 'New' : 'Edit'} Customer`;

  return (
    <FormContextProvider<CustomerFormType>
      initialData={customer}
      initialFields={fields}
    >
      <Form<CustomerFormType>
        actions={<CustomerActions customer={customer} />}
        height='600px'
        icon={<CustomerIcon />}
        title={title}
        viewMode={false}
        width='850px'
        onAccept={handleOnAccept}
        onFinish={handleOnFinish}
      />
    </FormContextProvider>
  );
};

export default Customer;
