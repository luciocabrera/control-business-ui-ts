// components
import { Modal, Button } from 'components';
// contexts
import { useAddToast } from 'contexts/ToastContext';
// hooks
import { useDeleteCustomer, useRefreshCustomers } from 'hooks';
// react
import { memo, useCallback, useState } from 'react';
// router
import { useLocation, useNavigate } from 'react-router-dom';
// types
import type { CustomerType } from 'types';
import type { ModalType } from 'components/Form/Form/Form.types';

type CustomerActionsProps = {
  customer: CustomerType;
};

const initialModal = { show: false };
const CustomerActions = memo(({ customer }: CustomerActionsProps) => {
  const [modal, setModal] = useState<ModalType>(initialModal);

  const notify = useAddToast();

  const deleteCustomer = useDeleteCustomer();
  const refreshCustomers = useRefreshCustomers();

  const navigate = useNavigate();
  const location = useLocation();

  const onDeleteScheduledRun = useCallback(async () => {
    try {
      const res = await deleteCustomer(customer.customerId);

      if ([200, 204].includes(res?.status || 0)) {
        notify?.(
          'success',
          'Customer successfully deleted',
          `The Customer ${customer.firstName} ${customer.lastName} has been successfully removed.`,
        );
      } else {
        notify?.(
          'error',
          'Error Deleting Customer',
          `An error has ocurred when trying to delete The Customer ${customer.firstName} ${customer.lastName}. Please try again.`,
        );
      }

      refreshCustomers?.();

      if (location.pathname !== '/customers') navigate('/customers');

      setModal(initialModal);
    } catch (err) {
      notify?.('error', 'Error Deleting Customer', (err as { message: string }).message);
      console.log('error', err);
    }
  }, [
    customer.customerId,
    customer.firstName,
    customer.lastName,
    deleteCustomer,
    location.pathname,
    navigate,
    notify,
    refreshCustomers,
  ]);

  const onDelete = useCallback(() => {
    setModal({
      show: true,
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the current Customer?',
      onAccept: onDeleteScheduledRun,
      onClose: () => setModal(initialModal),
      isConfirmation: true,
    });
  }, [onDeleteScheduledRun]);

  return (
    <>
      <Button id="customer-actions-button-accept" onClick={onDelete} type="button">
        Delete
      </Button>
      {modal?.show && <Modal {...modal} />}
    </>
  );
});

export default CustomerActions;
