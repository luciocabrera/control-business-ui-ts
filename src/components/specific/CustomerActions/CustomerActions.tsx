import { useAddNotification, useAddToast } from 'contexts';
import {
  useDeleteCustomer,
  useLocation,
  useNavigate,
  useParams,
  useRefreshCustomers,
} from 'hooks';
import type { CustomerType, MouseEvent } from 'types';

import { Button } from 'components/Form/components/Button';

type CustomerActionsProps = {
  customer?: CustomerType;
};

const CustomerActions = ({ customer }: CustomerActionsProps) => {
  const { action, customerId } = useParams();

  const isCreating = customerId === 'new' || !customerId;
  const isEditing = !isCreating && action === 'edit';

  const location = useLocation();

  const addNotification = useAddNotification();
  const addToast = useAddToast();
  const deleteCustomer = useDeleteCustomer();
  const refreshCustomers = useRefreshCustomers();
  const navigate = useNavigate();

  const onConfirmDelete = async () => {
    try {
      const res = await deleteCustomer(customer?.peopleId);

      if ([200, 204].includes(res?.status || 0)) {
        addToast?.(
          'success',
          'Customer successfully deleted',
          `The Customer ${customer?.firstName} ${customer?.lastName} has been successfully removed.`
        );
      } else {
        addToast?.(
          'error',
          'Error Deleting Customer',
          `An error has ocurred when trying to delete The Customer ${customer?.firstName} ${customer?.lastName}. Please try again.`
        );
      }

      await refreshCustomers?.();

      if (location.pathname !== '/customers') navigate('/customers');
    } catch (err) {
      addToast?.(
        'error',
        'Error Deleting Customer',
        (err as { message: string }).message
      );
    }
  };

  const handleDelete = () =>
    addNotification?.(
      'Are you sure you want to delete the current Customer?',
      'Confirm Deletion',
      'warning',
      undefined,
      onConfirmDelete,
      true
    );

  const handleCancel = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`/customers`);
  };

  const handleEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`edit`);
  };

  return (
    <>
      {!isCreating && !isEditing && (
        <Button
          id='customer-actions-button-edit'
          onClick={handleEdit}
        >
          Edit
        </Button>
      )}
      <Button
        inverse
        id='customer-actions-button-cancel'
        onClick={handleCancel}
      >
        Cancel
      </Button>
      {!isCreating && (
        <Button
          warning
          id='customer-actions-button-delete'
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default CustomerActions;
