import { useAddNotification, useAddToast } from 'contexts';
import {
  useDeleteInvoice,
  useLocation,
  useNavigate,
  useParams,
  useRefreshInvoices,
} from 'hooks';
import type { InvoiceFormType, MouseEvent } from 'types';

import { Button } from 'components/Form/components/Button';

type InvoiceActionsProps = {
  invoice?: InvoiceFormType;
};

const InvoiceActions = ({ invoice }: InvoiceActionsProps) => {
  const { action, invoiceId } = useParams();

  const isCreating = invoiceId === 'new' || !invoiceId;
  const isEditing = action === 'edit' && !isCreating;
  const isCopying = action === 'copy' && !isCreating;

  const location = useLocation();

  const addNotification = useAddNotification();
  const addToast = useAddToast();
  const deleteInvoice = useDeleteInvoice();
  const refreshInvoices = useRefreshInvoices();
  const navigate = useNavigate();

  const onConfirmDelete = async () => {
    try {
      if (!invoice?.invoiceId) return;
      const res = await deleteInvoice(invoice?.invoiceId);

      if ([200, 204].includes(res?.status || 0)) {
        addToast?.(
          'success',
          'Invoice successfully deleted',
          `The Invoice ${invoice?.invoice ?? ''} has been successfully removed.`
        );
      } else {
        addToast?.(
          'error',
          'Error Deleting Invoice',
          `An error has ocurred when trying to delete The Invoice ${
            invoice?.invoice ?? ''
          }. Please try again.`
        );
      }

      await refreshInvoices?.();

      if (location.pathname !== '/invoices') navigate('/invoices');
    } catch (err) {
      addToast?.(
        'error',
        'Error Deleting Invoice',
        (err as { message: string }).message
      );
    }
  };

  const handleDelete = () => {
    addNotification?.(
      'Are you sure you want to delete the current Invoice?',
      'Confirm Deletion',
      'warning',
      undefined,
      onConfirmDelete,
      true
    );
  };

  const handleCancel = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`/invoices`);
  };

  const handleEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`edit`);
  };

  return (
    <>
      {!isCreating && !isEditing && !isCopying && (
        <Button
          id='invoice-actions-button-edit'
          onClick={handleEdit}
        >
          Edit
        </Button>
      )}
      <Button
        inverse
        id='invoice-actions-button-cancel'
        onClick={handleCancel}
      >
        Cancel
      </Button>
      {!isCreating && !isCopying && (
        <Button
          warning
          id='invoice-actions-button-delete'
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </>
  );
};

InvoiceActions.displayName = 'InvoiceActions';

export default InvoiceActions;
