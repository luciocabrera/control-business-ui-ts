// components
import { Modal, Button } from 'components';
// contexts
import { useAddNotification, useAddToast } from 'contexts';
// hooks
import { useDeleteCustomer, useRefreshCustomers, useParams, useLocation, useNavigate } from 'hooks';
// react
import { memo, useCallback, useState } from 'react';
// types
import type { CustomerType, MouseEvent } from 'types';
// import type { ModalType } from 'components/Form/Form/Form.types';

type CustomerActionsProps = {
  customer?: CustomerType;
};

// const initialModal = { show: false };
const CustomerActions = memo(({ customer }: CustomerActionsProps) => {
  const { customerId, action } = useParams();

  const isCreating = customerId === 'new' || !customerId;
  const isEditing = !isCreating && action === 'edit';

  // const [modal, setModal] = useState<ModalType>(initialModal);

  const location = useLocation();
  const addNotification = useAddNotification();

  const addToast = useAddToast();
  const deleteCustomer = useDeleteCustomer();
  const refreshCustomers = useRefreshCustomers();
  const navigate = useNavigate();

  const onConfirmDelete = useCallback(async () => {
    try {
      const res = await deleteCustomer(customer?.customerId);

      if ([200, 204].includes(res?.status || 0)) {
        addToast?.(
          'success',
          'Customer successfully deleted',
          `The Customer ${customer?.firstName} ${customer?.lastName} has been successfully removed.`,
        );
      } else {
        addToast?.(
          'error',
          'Error Deleting Customer',
          `An error has ocurred when trying to delete The Customer ${customer?.firstName} ${customer?.lastName}. Please try again.`,
        );
      }

      refreshCustomers?.();

      if (location.pathname !== '/customers') navigate('/customers');

      // setModal(initialModal);
    } catch (err) {
      addToast?.('error', 'Error Deleting Customer', (err as { message: string }).message);
      console.log('error', err);
    }
  }, [
    customer?.customerId,
    customer?.firstName,
    customer?.lastName,
    deleteCustomer,
    location.pathname,
    navigate,
    addToast,
    refreshCustomers,
  ]);

  const onDelete = useCallback(() => {
    addNotification?.(
      'Are you sure you want to delete the current Customer?',
      'Confirm Deletion',
      'warning',
      undefined,
      onConfirmDelete,
      true,
    );
    // setModal({
    //   show: true,
    //   title: 'Confirm Deletion',
    //   message: 'Are you sure you want to delete the current Customer?',
    //   onAccept: onConfirmDelete,
    //   onClose: () => setModal(initialModal),
    //   isConfirmation: true,
    // });
  }, [addNotification, onConfirmDelete]);

  const onCancel = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(`/customers`);
    },
    [navigate],
  );

  const onEdit = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(`edit`);
    },
    [navigate],
  );

  return (
    <>
      {!isCreating && !isEditing && (
        <Button id="customer-actions-button-edit" onClick={onEdit}>
          Edit
        </Button>
      )}
      <Button id="customer-actions-button-cancel" inverse onClick={onCancel}>
        Cancel
      </Button>
      {!isCreating && (
        <Button id="customer-actions-button-delete" onClick={onDelete} warning>
          Delete
        </Button>
      )}
      {/* {modal?.show && <Modal {...modal} />} */}
    </>
  );
});

export default CustomerActions;
