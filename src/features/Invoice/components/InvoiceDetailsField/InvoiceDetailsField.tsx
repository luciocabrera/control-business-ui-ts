// components
import { Portal, ReadOnlyTable, IconButton, FieldGroupStyled } from 'components';
import InvoiceDetailForm from '../InvoiceDetailForm/InvoiceDetailForm';
// contexts
import { useFieldsContext } from 'contexts';
// hooks
import { useCallback, useMemo, useState } from 'hooks';
import { useInvoiceDetailsConfig } from './hooks/useInvoiceDetailsConfig';
// icons
import { CopyIcon, NewIcon, EditIcon, DeleteIcon } from 'icons';
// types
import type { InvoiceFormType, InvoicesDetails, ColumnDef, CellContext } from 'types';
import type { InvoiceDetailsFieldProps } from './InvoiceDetailsField.types';
// styles
import styles from './InvoiceDetailsField.module.css';
// utilities
import { memo } from 'utilities';

const InvoiceDetailsField = memo(({ normalize }: InvoiceDetailsFieldProps) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detail, setDetail] = useState<InvoicesDetails | undefined>();

  const [invoicesDetails, setInvoicesDetails] = useFieldsContext<InvoicesDetails[], Pick<InvoiceFormType, 'details'>>(
    (store) => store.details,
  );
  const [, setSubtotal] = useFieldsContext<number, Pick<InvoiceFormType, 'subtotal'>>((store) => store.subtotal);
  const [, setTaxes] = useFieldsContext<number, Pick<InvoiceFormType, 'taxes'>>((store) => store.taxes);
  const [taxesPercentage] = useFieldsContext<number, Pick<InvoiceFormType, 'taxesPercentage'>>(
    (store) => store.taxesPercentage,
  );
  const [, setTotal] = useFieldsContext<number, Pick<InvoiceFormType, 'total'>>((store) => store.total);
  const columnsDetails = useInvoiceDetailsConfig();
  const normalizedValue = useMemo(
    () => normalize?.(invoicesDetails) ?? invoicesDetails,
    [invoicesDetails, normalize],
  ) as unknown as InvoicesDetails[];

  const updateAmounts = useCallback(
    (newDetails: InvoicesDetails[]) => {
      const newSubtotal = newDetails?.reduce((previousValue, detail) => {
        return previousValue + detail.priceQuantity;
      }, 0);
      const newTaxes = ((newSubtotal || 0) * taxesPercentage) / 100;
      const newTotal = (newSubtotal || 0) + newTaxes;

      setSubtotal({ subtotal: newSubtotal });
      setTaxes({ taxes: newTaxes });
      setTotal({ total: newTotal });
    },
    [setSubtotal, setTaxes, setTotal, taxesPercentage],
  );

  const onRemoveDetail = useCallback(
    (original: InvoicesDetails) => {
      const newDetails = invoicesDetails.filter((detail) => detail !== original);

      setInvoicesDetails({ details: newDetails });
      updateAmounts(newDetails);
    },
    [invoicesDetails, setInvoicesDetails, updateAmounts],
  );

  const onEditDetail = useCallback(
    (original: InvoicesDetails) => {
      onRemoveDetail(original);
      setDetail(original);
      setShowDetailForm(true);
    },
    [onRemoveDetail],
  );

  const onCopyDetail = useCallback((original: InvoicesDetails) => {
    setDetail(original);
    setShowDetailForm(true);
  }, []);

  const onAddDetail = useCallback(() => {
    setDetail(undefined);
    setShowDetailForm(true);
  }, []);

  const onAcceptDetail = useCallback(
    (detail: InvoicesDetails) => {
      const newDetails = [...new Set([...invoicesDetails, detail])];
      setInvoicesDetails({ details: newDetails });
      updateAmounts(newDetails);
      setShowDetailForm(false);
    },
    [invoicesDetails, setInvoicesDetails, updateAmounts],
  );

  const getActionsCell = useCallback(
    ({ row: { original } }: CellContext<InvoicesDetails, unknown>) => (
      <div className={styles['actions-wrapper']}>
        <IconButton id="edit-invoice-detail" icon={<EditIcon />} onClick={() => onEditDetail(original)} />
        <IconButton id="copy-invoice-detail" icon={<CopyIcon />} onClick={() => onCopyDetail(original)} />
        <IconButton id="delete-invoice-detail" icon={<DeleteIcon />} onClick={() => onRemoveDetail(original)} />
      </div>
    ),
    [onCopyDetail, onEditDetail, onRemoveDetail],
  );

  const columnsWithActions = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      ...columnsDetails,
      {
        accessorKey: '',
        header: 'Actions',
        sort: false,
        enableResizing: false,
        cell: getActionsCell,
      },
    ],
    [columnsDetails, getActionsCell],
  );

  const hideDetailForm = useCallback(() => setShowDetailForm(false), []);

  const labelWithAdd = (
    <div className={styles['label-wrapper']}>
      <span>Details</span>
      <div id="icon-button" className={styles['icon']}>
        <IconButton id="new-invoice-detail" icon={<NewIcon />} onClick={onAddDetail} />
      </div>
    </div>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`} id="field-group-styled-invoice-details">
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<InvoicesDetails> data={normalizedValue} columns={columnsWithActions} showHeader={false} />
      </FieldGroupStyled>
      {showDetailForm && (
        <Portal>
          <InvoiceDetailForm detail={detail} onAcceptDetail={onAcceptDetail} onFinish={hideDetailForm} />
        </Portal>
      )}
    </>
  );
});

export default InvoiceDetailsField;
