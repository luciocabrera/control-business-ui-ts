// components
// react
import { useCallback } from 'react';
// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useFetchCustomer, useNavigate,useParams } from 'hooks';
// icons
import { CustomerIcon } from 'icons';
// types
import type { CustomerFormType } from 'types';

import { CustomerActions,PageSpinner } from 'components';
import Form from 'components/Form/Form/Form';

import { useViewCustomerConfig } from './hooks';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, isLoading: isLoadingCustomer } =
    useFetchCustomer(customerId);
  const { fields } = useViewCustomerConfig(customer);

  const onFinish = useCallback(() => navigate('/customers'), [navigate]);

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  return (
    <FormContextProvider<CustomerFormType>
      initialFields={fields}
      initialData={customer}
    >
      <Form<CustomerFormType>
        icon={<CustomerIcon />}
        title='View Customer'
        actions={<CustomerActions customer={customer} />}
        onFinish={onFinish}
        height='600px'
        width='850px'
      />
    </FormContextProvider>
  );
};

export default ViewCustomer;
