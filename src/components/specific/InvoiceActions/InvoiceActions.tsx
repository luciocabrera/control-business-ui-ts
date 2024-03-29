// components
// react
import { memo, useCallback } from 'react';
// contexts
import { useAddNotification, useAddToast } from 'contexts';
// hooks
import {
  useDeleteInvoice,
  useLocation,
  useNavigate,
  useParams,
  useRefreshInvoices,
} from 'hooks';
// types
import type { InvoiceFormType, MouseEvent } from 'types';

import { Button } from 'components/Form/components/Button';

type InvoiceActionsProps = {
  invoice?: InvoiceFormType;
};

const InvoiceActions = memo(({ invoice }: InvoiceActionsProps) => {
  const { invoiceId, action } = useParams();

  const isCreating = invoiceId === 'new' || !invoiceId;
  const isEditing = action === 'edit' && !isCreating;
  const isCopying = action === 'copy' && !isCreating;

  const location = useLocation();

  const addNotification = useAddNotification();
  const addToast = useAddToast();
  const deleteInvoice = useDeleteInvoice();
  const refreshInvoices = useRefreshInvoices();
  const navigate = useNavigate();

  const onConfirmDelete = useCallback(async () => {
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
  }, [
    deleteInvoice,
    invoice?.invoiceId,
    invoice?.invoice,
    refreshInvoices,
    location.pathname,
    navigate,
    addToast,
  ]);

  const onDelete = useCallback(() => {
    addNotification?.(
      'Are you sure you want to delete the current Invoice?',
      'Confirm Deletion',
      'warning',
      undefined,
      onConfirmDelete,
      true
    );
  }, [addNotification, onConfirmDelete]);

  const onCancel = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(`/invoices`);
    },
    [navigate]
  );

  const onEdit = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(`edit`);
    },
    [navigate]
  );

  return (
    <>
      {!isCreating && !isEditing && !isCopying && (
        <Button
          id='invoice-actions-button-edit'
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
      <Button
        id='invoice-actions-button-cancel'
        inverse
        onClick={onCancel}
      >
        Cancel
      </Button>
      {!isCreating && !isCopying && (
        <Button
          id='invoice-actions-button-delete'
          onClick={onDelete}
          warning
        >
          Delete
        </Button>
      )}
    </>
  );
});

InvoiceActions.displayName = 'InvoiceActions';

export default InvoiceActions;
