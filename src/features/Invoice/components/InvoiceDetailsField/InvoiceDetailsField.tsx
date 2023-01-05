// components
import { NumberDisplay, Portal, ReadOnlyTable, IconButton, FieldGroupStyled, DateDisplay } from 'components';
import InvoiceDetailForm from '../InvoiceDetailForm/InvoiceDetailForm';
// contexts
import { useStore } from 'contexts';
// hooks
import { useCallback, useMemo, useState } from 'hooks';
// icons
import { CopyIcon, NewIcon, EditIcon, DeleteIcon } from 'icons';
// types
import type { InvoiceFormType, InvoicesDetails, ColumnDef } from 'types';
import type { InvoiceDetailsFieldProps } from './InvoiceDetailsField.types';
// styles
import { LabelDetailsStyled } from './InvoiceDetailsField.styled';
import { TableActionsStyled } from 'styles';
// utilities
import { memo } from 'utilities';

const InvoiceDetailsField = memo(({ normalize }: InvoiceDetailsFieldProps) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detail, setDetail] = useState<InvoicesDetails | undefined>();

  const [invoicesDetails, setInvoicesDetails] = useStore<InvoicesDetails[], Pick<InvoiceFormType, 'details'>>(
    (store) => store.details,
  );
  const [, setSubtotal] = useStore<number, Pick<InvoiceFormType, 'subtotal'>>((store) => store.subtotal);
  const [, setTaxes] = useStore<number, Pick<InvoiceFormType, 'taxes'>>((store) => store.taxes);
  const [taxesPercentage] = useStore<number, Pick<InvoiceFormType, 'taxesPercentage'>>(
    (store) => store.taxesPercentage,
  );
  const [, setTotal] = useStore<number, Pick<InvoiceFormType, 'total'>>((store) => store.total);

  const normalizedValue = useMemo(
    () => normalize?.(invoicesDetails) ?? invoicesDetails,
    [invoicesDetails, normalize],
  ) as unknown as InvoicesDetails[];

  const columnsDetails = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({
          row: {
            original: { date },
          },
        }) => <DateDisplay date={date} />,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({
          row: {
            original: { quantity },
          },
        }) => <NumberDisplay value={quantity} output={'number'} />,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: ({
          row: {
            original: { priceUnit },
          },
        }) => <NumberDisplay value={priceUnit} output={'currency'} />,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: ({
          row: {
            original: { priceQuantity },
          },
        }) => <NumberDisplay value={priceQuantity} output={'currency'} />,
      },
    ],
    [],
  );

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

  const columnsWithActions = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      ...columnsDetails,
      {
        accessorKey: 'actions',
        header: 'Actions',
        sort: false,
        cell: ({ row: { original } }) => (
          <TableActionsStyled>
            <IconButton id="edit-invoice-detail" icon={<EditIcon />} onClick={() => onEditDetail(original)} />
            <IconButton id="copy-invoice-detail" icon={<CopyIcon />} onClick={() => onCopyDetail(original)} />
            <IconButton id="delete-invoice-detail" icon={<DeleteIcon />} onClick={() => onRemoveDetail(original)} />
          </TableActionsStyled>
        ),
      },
    ],
    [columnsDetails, onCopyDetail, onEditDetail, onRemoveDetail],
  );

  const labelWithAdd = (
    <LabelDetailsStyled>
      <span>Details</span>
      <div id="icon-button">
        <IconButton id="new-invoice-detail" icon={<NewIcon />} onClick={onAddDetail} />
      </div>
    </LabelDetailsStyled>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`} id="field-group-styled--invoice-details">
        <legend>{labelWithAdd}</legend>

        <ReadOnlyTable<InvoicesDetails>
          data={normalizedValue}
          columns={columnsWithActions}
          useRadius
          showHeader={false}
        />
      </FieldGroupStyled>
      {showDetailForm && (
        <Portal>
          <InvoiceDetailForm
            detail={detail}
            onAcceptDetail={onAcceptDetail}
            onFinish={() => setShowDetailForm(false)}
          />
        </Portal>
      )}
    </>
  );
});

export default InvoiceDetailsField;
