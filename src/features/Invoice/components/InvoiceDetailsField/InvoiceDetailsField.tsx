import { useFieldsContext } from 'contexts';
import { useState } from 'hooks';
import { CopyIcon, DeleteIcon, EditIcon, NewIcon } from 'icons';
import type { CellContext, InvoiceFormType, InvoicesDetails } from 'types';

import { IconButton, Portal } from 'components';
import { FieldGroupStyled } from 'components/Form/components/FormFields/styles';
import { ReadOnlyTable } from 'components/Table/ReadOnlyTable';

import InvoiceDetailForm from '../InvoiceDetailForm/InvoiceDetailForm';

import { useInvoiceDetailsConfig } from './hooks/useInvoiceDetailsConfig';
import type { InvoiceDetailsFieldProps } from './InvoiceDetailsField.types';

import styles from './InvoiceDetailsField.module.css';

const InvoiceDetailsField = ({ normalize }: InvoiceDetailsFieldProps) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [detail, setDetail] = useState<InvoicesDetails | undefined>();

  const [invoicesDetails, setInvoicesDetails] = useFieldsContext<
    InvoicesDetails[],
    Pick<InvoiceFormType, 'details'>
  >((store) => store.details);
  const [, setSubtotal] = useFieldsContext<
    number,
    Pick<InvoiceFormType, 'subtotal'>
  >((store) => store.subtotal);
  const [, setTaxes] = useFieldsContext<number, Pick<InvoiceFormType, 'taxes'>>(
    (store) => store.taxes
  );
  const [taxesPercentage] = useFieldsContext<
    number,
    Pick<InvoiceFormType, 'taxesPercentage'>
  >((store) => store.taxesPercentage);
  const [, setTotal] = useFieldsContext<number, Pick<InvoiceFormType, 'total'>>(
    (store) => store.total
  );
  const columnsDetails = useInvoiceDetailsConfig();
  const normalizedValue = normalize?.(invoicesDetails) ?? invoicesDetails;

  const updateAmounts = (newDetails: InvoicesDetails[]) => {
    const newSubtotal = newDetails?.reduce((previousValue, detail) => {
      return previousValue + detail.priceQuantity;
    }, 0);
    const newTaxes = ((newSubtotal || 0) * taxesPercentage) / 100;
    const newTotal = (newSubtotal || 0) + newTaxes;

    setSubtotal({ subtotal: newSubtotal });
    setTaxes({ taxes: newTaxes });
    setTotal({ total: newTotal });
  };

  const handleDeleteDetail = (original: InvoicesDetails) => {
    const newDetails = invoicesDetails.filter((detail) => detail !== original);

    setInvoicesDetails({ details: newDetails });
    updateAmounts(newDetails);
  };

  const handleEditDetail = (original: InvoicesDetails) => {
    handleDeleteDetail(original);
    setDetail(original);
    setShowDetailForm(true);
  };

  const handleCopyDetail = (original: InvoicesDetails) => {
    setDetail(original);
    setShowDetailForm(true);
  };

  const handleAddDetail = () => {
    setDetail(undefined);
    setShowDetailForm(true);
  };

  const handleAcceptDetail = (detail: InvoicesDetails) => {
    const newDetails = [...new Set([...invoicesDetails, detail])];
    setInvoicesDetails({ details: newDetails });
    updateAmounts(newDetails);
    setShowDetailForm(false);
  };
  const getActionsCell = ({
    row: { original },
  }: CellContext<InvoicesDetails, unknown>) => (
    <div className={styles['actions-wrapper']}>
      <IconButton
        icon={<EditIcon />}
        id='edit-invoice-detail'
        onClick={() => handleEditDetail(original)}
      />
      <IconButton
        icon={<CopyIcon />}
        id='copy-invoice-detail'
        onClick={() => handleCopyDetail(original)}
      />
      <IconButton
        icon={<DeleteIcon />}
        id='delete-invoice-detail'
        onClick={() => handleDeleteDetail(original)}
      />
    </div>
  );
  const columnsWithActions = [
    ...columnsDetails,
    {
      accessorKey: '',
      cell: getActionsCell,
      enableResizing: false,
      header: 'Actions',
      meta: { shouldUseDefaultCell: true },
      sort: false,
    },
  ];
  const handleFinish = () => setShowDetailForm(false);

  const labelWithAdd = (
    <div className={styles['label-wrapper']}>
      <span>Details</span>
      <div
        className={styles.icon}
        id='icon-button'
      >
        <IconButton
          icon={<NewIcon />}
          id='new-invoice-detail'
          onClick={handleAddDetail}
        />
      </div>
    </div>
  );

  return (
    <>
      <FieldGroupStyled
        key={`table-form-field-invoice-details`}
        id='field-group-styled-invoice-details'
      >
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<InvoicesDetails>
          columns={columnsWithActions}
          data={normalizedValue}
          defaultColumnOrder={[]}
          hidden={[]}
          isLoading={false}
          showHeader={false}
          showTopRadius={true}
          visible={[]} // showHeader={false}
        />
      </FieldGroupStyled>
      {showDetailForm && (
        <Portal>
          <InvoiceDetailForm
            detail={detail}
            onAcceptDetail={handleAcceptDetail}
            onFinish={handleFinish}
          />
        </Portal>
      )}
    </>
  );
};

export default InvoiceDetailsField;
