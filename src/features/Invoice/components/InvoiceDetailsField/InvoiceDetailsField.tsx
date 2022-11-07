//assets
import { newImg, editImg, deleteImg, copyImg } from 'assets';
// components
import { NumberDisplay, Portal, ReadOnlyTable, IconButton } from 'components';
// contexts
import { useStore } from 'contexts';
// react
import { memo, useMemo, useCallback, useState } from 'react';
// types
import type { ColumnDef, FormFieldBaseType, InvoiceFormType, InvoicesDetails } from 'types';
import { FieldGroupStyled } from '../../../../components/Form/Form/Form.styled';
import InvoiceDetailForm from '../InvoiceDetailForm/InvoiceDetailForm';
import { LabelDetailsStyled } from './InvoiceDetailsField.styled';

export type TableFieldProps = Omit<
  FormFieldBaseType,
  | 'display'
  | 'default'
  | 'tooltip'
  | 'normalize'
  | 'rules'
  | 'value'
  | 'type'
  | 'label'
  | 'accessor'
  | 'data'
  | 'columns'
> & {
  normalize?: (value?: InvoicesDetails[]) => InvoicesDetails[];
};

const InvoiceDetailsField = memo(({ normalize }: TableFieldProps) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detail, setDetail] = useState<InvoicesDetails | undefined>();
  const [invoicesDetails, setInvoicesDetails] = useStore<InvoicesDetails[], Pick<InvoiceFormType, 'invoiceDetails'>>(
    (store) => store.invoiceDetails,
  );
  const [, setSubtotal] = useStore<number, Pick<InvoiceFormType, 'subtotal'>>((store) => store.subtotal);
  const [, setTaxes] = useStore<number, Pick<InvoiceFormType, 'taxes'>>((store) => store.taxes);
  const [taxesPercentage] = useStore<number, Pick<InvoiceFormType, 'taxesPercentage'>>(
    (store) => store.taxesPercentage,
  );
  const [, setTotal] = useStore<number, Pick<InvoiceFormType, 'total'>>((store) => store.total);
  const normalizedValue = (normalize?.(invoicesDetails) ?? invoicesDetails) as unknown as InvoicesDetails[];

  const columnsDetails = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorKey: 'productNameWithCode',
        header: 'Product',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row: { original } }) => <NumberDisplay value={original.quantity} output={'number'} />,
      },
      {
        accessorKey: 'priceUnit',
        header: 'Price Unit',
        cell: ({ row: { original } }) => <NumberDisplay value={original.priceUnit} output={'currency'} />,
      },
      {
        accessorKey: 'priceQuantity',
        header: 'Price Quantity',
        cell: ({ row: { original } }) => <NumberDisplay value={original.priceQuantity} output={'currency'} />,
      },
    ],
    [],
  );

  const updateAmounts = useCallback(
    (newDetails: InvoicesDetails[]) => {
      const newSubtotal = newDetails?.reduce((previousValue, detail) => {
        return previousValue + detail.priceQuantity;
      }, 0);
      const newTaxes = (newSubtotal || 0) * taxesPercentage;
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

      setInvoicesDetails({ invoiceDetails: newDetails });
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

      setInvoicesDetails({ invoiceDetails: newDetails });
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
        cell: ({ row: { original } }) => (
          <>
            <IconButton src={editImg} onClick={() => onEditDetail(original)} />
            <IconButton src={copyImg} onClick={() => onCopyDetail(original)} />
            <IconButton src={deleteImg} onClick={() => onRemoveDetail(original)} />
          </>
        ),
      },
    ],
    [columnsDetails, onCopyDetail, onEditDetail, onRemoveDetail],
  );

  const labelWithAdd = (
    <LabelDetailsStyled>
      <span>Details</span>
      <div id="icon-button">
        <IconButton src={newImg} onClick={onAddDetail} />
      </div>
    </LabelDetailsStyled>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`}>
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<InvoicesDetails> data={normalizedValue} columns={columnsWithActions} useRadius />
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
