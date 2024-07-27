// contexts
import { FormContextProvider } from 'contexts';
// hooks
import { useFetchCustomer, useNavigate, useParams } from 'hooks';
// icons
import { CustomerIcon } from 'icons';
// types
import type { CustomerFormType } from 'types';

import { CustomerActions, PageSpinner } from 'components';
import Form from 'components/Form/Form/Form';

import { useViewCustomerConfig } from './hooks';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, isLoading: isLoadingCustomer } =
    useFetchCustomer(customerId);
  const { fields } = useViewCustomerConfig(customer);

  const onFinish = () => navigate('/customers');

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  return (
    <FormContextProvider<CustomerFormType>
      initialData={customer}
      initialFields={fields}
    >
      <Form<CustomerFormType>
        actions={<CustomerActions customer={customer} />}
        height='600px'
        icon={<CustomerIcon />}
        title='View Customer'
        width='850px'
        onFinish={onFinish}
      />
    </FormContextProvider>
  );
};

export default ViewCustomer;
