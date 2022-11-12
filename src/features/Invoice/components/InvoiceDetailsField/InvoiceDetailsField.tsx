//assets
import { newImg, editImg, deleteImg, copyImg } from 'assets';
// components
import { NumberDisplay, Portal, ReadOnlyTable, IconButton, FieldGroupStyled, DateDisplay } from 'components';
import InvoiceDetailForm from '../InvoiceDetailForm/InvoiceDetailForm';
import DataGrid, { Column, SortColumn } from 'react-data-grid';
// contexts
import { useStore } from 'contexts';
// react
import { memo, useMemo, useCallback, useState } from 'react';
// types
import type { ColumnDef, InvoiceFormType, InvoicesDetails } from 'types';
import type { InvoiceDetailsFieldProps } from './InvoiceDetailsField.types';
// styles
import { LabelDetailsStyled } from './InvoiceDetailsField.styled';

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

  // const columnsDetails = useMemo<ColumnDef<InvoicesDetails>[]>(
  //   () => [
  //     {
  //       accessorKey: 'productNameWithCode',
  //       header: 'Product',
  //     },
  //     {
  //       accessorKey: 'date',
  //       header: 'Date',
  //       cell: ({ row: { original } }) => <DateDisplay date={original.date} />,
  //     },
  //     {
  //       accessorKey: 'description',
  //       header: 'Description',
  //     },
  //     {
  //       accessorKey: 'quantity',
  //       header: 'Quantity',
  //       cell: ({ row: { original } }) => <NumberDisplay value={original.quantity} output={'number'} />,
  //     },
  //     {
  //       accessorKey: 'priceUnit',
  //       header: 'Price Unit',
  //       cell: ({ row: { original } }) => <NumberDisplay value={original.priceUnit} output={'currency'} />,
  //     },
  //     {
  //       accessorKey: 'priceQuantity',
  //       header: 'Price Quantity',
  //       cell: ({ row: { original } }) => <NumberDisplay value={original.priceQuantity} output={'currency'} />,
  //     },
  //   ],
  //   [],
  // );

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
        name: '',
        formatter: ({ row }) => (
          <>
            <IconButton src={editImg} onClick={() => onEditDetail(row)} />
            <IconButton src={copyImg} onClick={() => onCopyDetail(row)} />
            <IconButton src={deleteImg} onClick={() => onRemoveDetail(row)} />
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
  type Comparator = (a: InvoicesDetails, b: InvoicesDetails) => number;
  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'description':
        // case 'date':
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };
      // case 'available':
      //   return (a, b) => {
      //     return a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
      //   };
      case 'quantity':
      case 'priceUnit':
      case 'priceQuantity':
        return (a, b) => {
          return a[sortColumn] - b[sortColumn];
        };
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }, []);
  const rowKeyGetter = useCallback((row: InvoicesDetails): number => {
    return row?.productId;
  }, []);
  return (
    <>
      <FieldGroupStyled key={`table-form-field-invoice-details`}>
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<InvoicesDetails>
          data={normalizedValue}
          columns={columnsWithActions}
          useRadius
          rowKeyGetter={rowKeyGetter}
          getComparator={getComparator}
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
