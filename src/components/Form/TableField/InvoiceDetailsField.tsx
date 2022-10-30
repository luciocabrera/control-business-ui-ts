//assets
import { detailsViewImg } from 'assets';
// components
import { NumberDisplay, Portal } from 'components';
import ReadOnlyTable from 'components/Table/ReadOnlyTable/ReadOnlyTable';
// contexts
import { useStore } from 'contexts';
// react
import { memo, forwardRef, useMemo, useCallback, useState, ReactNode } from 'react';
// types
import type { ColumnDef, FormFieldBaseType, InvoiceFormType, InvoicesDetails } from 'types';
import { FieldGroupStyled } from '../Form/Form.styled';

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
  renderDetail?: (
    onAccept: (detail: InvoicesDetails) => void,
    onFinish: () => void,
    detail?: InvoicesDetails,
  ) => ReactNode;
};

const InvoiceDetailsField = ({ normalize, renderDetail }: TableFieldProps, ref: React.ForwardedRef<unknown>) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [invoicesDetails, setInvoicesDetails] = useStore<InvoicesDetails[], Pick<InvoiceFormType, 'invoiceDetails'>>(
    (store) => store.invoiceDetails,
  );
  const [, setSubtotal] = useStore<number, Pick<InvoiceFormType, 'subtotal'>>((store) => store.subtotal);
  const [taxes, setTaxes] = useStore<number, Pick<InvoiceFormType, 'taxes'>>((store) => store.taxes);
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
      const newTaxes = (newSubtotal || 0) * 0.09;
      const newTotal = (newSubtotal || 0) + newTaxes;

      setSubtotal({ subtotal: newSubtotal });
      setTaxes({ taxes: newTaxes });
      setTotal({ total: newTotal });
    },
    [setSubtotal, setTaxes, setTotal],
  );

  const onRemoveDetail = useCallback(
    (original: InvoicesDetails) => {
      const newDetails = invoicesDetails.filter((detail) => detail !== original);

      setInvoicesDetails({ invoiceDetails: newDetails });
      updateAmounts(newDetails);
    },
    [invoicesDetails, setInvoicesDetails, updateAmounts],
  );

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
          <img src={detailsViewImg} alt="" width="18" height="18" onClick={() => onRemoveDetail(original)} />
        ),
      },
    ],
    [columnsDetails, onRemoveDetail],
  );

  const labelWithAdd = (
    <>
      Details
      <button type="button" onClick={() => setShowDetailForm(true)}>
        Add
      </button>
    </>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`}>
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<InvoicesDetails> data={normalizedValue} columns={columnsWithActions} useRadius />{' '}
      </FieldGroupStyled>
      {showDetailForm && (
        <Portal>
          <>{renderDetail?.(onAcceptDetail, () => setShowDetailForm(false))}</>
        </Portal>
      )}
    </>
  );
};
export default memo(forwardRef(InvoiceDetailsField)) as typeof InvoiceDetailsField;
