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
import type { InvoiceFormType, InvoicesDetails, Column } from 'types';
import type { InvoiceDetailsFieldProps } from './InvoiceDetailsField.types';
// styles
import { LabelDetailsStyled } from './InvoiceDetailsField.styled';
import { TableActionsStyled } from 'styles';
// utilities
import { memo } from 'utilities';

const InvoiceDetailsField = memo(({ normalize }: InvoiceDetailsFieldProps) => {
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

  const normalizedValue = useMemo(
    () => normalize?.(invoicesDetails) ?? invoicesDetails,
    [invoicesDetails, normalize],
  ) as unknown as InvoicesDetails[];

  const columnsDetails = useMemo<Column<InvoicesDetails>[]>(
    () => [
      {
        key: 'productNameWithCode',
        name: 'Product',
      },
      {
        key: 'date',
        name: 'Date',
        formatter: ({ row: { date } }) => <DateDisplay date={date} />,
      },
      {
        key: 'description',
        name: 'Description',
      },
      {
        key: 'quantity',
        name: 'Quantity',
        formatter: ({ row: { quantity } }) => <NumberDisplay value={quantity} output={'number'} />,
      },
      {
        key: 'priceUnit',
        name: 'Price Unit',
        formatter: ({ row: { priceUnit } }) => <NumberDisplay value={priceUnit} output={'currency'} />,
      },
      {
        key: 'priceQuantity',
        name: 'Price Quantity',
        formatter: ({ row: { priceQuantity } }) => <NumberDisplay value={priceQuantity} output={'currency'} />,
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

  const columnsWithActions = useMemo<Column<InvoicesDetails>[]>(
    () => [
      ...columnsDetails,
      {
        key: 'actions',
        name: 'Actions',
        sortable: false,
        width: 150,
        formatter: ({ row }) => (
          <TableActionsStyled>
            <IconButton icon={<EditIcon />} onClick={() => onEditDetail(row)} />
            <IconButton icon={<CopyIcon />} onClick={() => onCopyDetail(row)} />
            <IconButton icon={<DeleteIcon />} onClick={() => onRemoveDetail(row)} />
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
        <IconButton icon={<NewIcon />} onClick={onAddDetail} />
      </div>
    </LabelDetailsStyled>
  );

  type Comparator = (a: InvoicesDetails, b: InvoicesDetails) => number;
  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'productNameWithCode':
      case 'date':
      case 'description':
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      case 'quantity':
      case 'priceUnit':
      case 'priceQuantity':
        return (a, b) => a[sortColumn] - b[sortColumn];

      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }, []);

  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`}>
        <legend>{labelWithAdd}</legend>

        <ReadOnlyTable<InvoicesDetails>
          data={normalizedValue}
          columns={columnsWithActions}
          useRadius
          getComparator={getComparator}
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
