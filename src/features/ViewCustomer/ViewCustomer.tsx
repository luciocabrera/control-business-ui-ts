// components
import { PageSpinner, CustomerActions } from 'components';
import Form from 'components/Form/Form/Form';
// contexts
import { FormDataContextProvider } from 'contexts';
// hooks
import { useFetchCustomer, useParams, useNavigate } from 'hooks';
import useViewCustomerConfig from './hooks/useViewCustomerConfig';
// icons
import { CustomerIcon } from 'icons';
// react
import { memo, useCallback } from 'react';
// types
import type { CustomerFormType } from 'types';

const ViewCustomer = memo(() => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, isLoading: isLoadingCustomer } = useFetchCustomer(customerId);
  const { fields } = useViewCustomerConfig(customer);

  const onFinish = useCallback(() => navigate('/customers'), [navigate]);

  if (isLoadingCustomer || !fields) return <PageSpinner />;

  return (
    <FormDataContextProvider<CustomerFormType> initialFields={fields} initialData={customer}>
      <Form<CustomerFormType>
        icon={<CustomerIcon />}
        title="View Customer"
        actions={<CustomerActions customer={customer} />}
        onFinish={onFinish}
        height="600px"
        width="850px"
      />
    </FormDataContextProvider>
  );
});

export default ViewCustomer;
