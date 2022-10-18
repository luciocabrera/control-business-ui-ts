// components
import { Header, Button, ErrorDisplay, NumberDisplay, ReadOnlyTable } from 'components';
import { FormStyled } from 'components/Form/Form/Form.styled';
import { FormProps } from 'components/Form/Form/Form.types';
import { getFieldElements } from 'components/Form/Form/util';
// contexts
import { useAddNotification } from 'contexts';
// hooks
import { useFormData } from 'hooks';
// react
import { memo, useMemo, useState } from 'react';

// styles

// types
import type { ColumnDef, CreateInvoiceDetail, FieldValueType, InvoicesDetails, MouseEvent } from 'types';
import InvoiceDetailForm from './InvoiceDetailForm';

const InvoiceForm = <TDataType extends Record<string, unknown>>({
  viewMode,
  actions,
  children,
  title,
  icon,
  initialFields,
  initialData,
  onAccept,
  onFinish,
}: FormProps<TDataType>) => {
  const form = useFormData<TDataType>(initialFields, initialData);

  const [showDetailForm, setShowDetailForm] = useState(false);
  const { data, verifyForm, setField } = form;
  const addNotification = useAddNotification();

  const columns = useMemo<ColumnDef<InvoicesDetails>[]>(
    () => [
      {
        accessorFn: (original) => original.product?.code,
        header: 'Code',
      },
      {
        accessorFn: (original) => original.product?.name,
        header: 'Product',
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

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { errorFields, hasChanged } = verifyForm();

    if (errorFields?.length > 0) {
      const errorMessages = errorFields.map((err) => err.errorMessage);

      addNotification?.(<ErrorDisplay errors={errorMessages} />, 'Error Validating Customer', 'error');
      return;
    }

    if (typeof onAccept === 'function' && hasChanged) {
      onAccept(data);
    } else {
      onFinish?.(event);
    }
  };
  const onAcceptDetail = (detail: CreateInvoiceDetail) => {
    debugger;

    const details = new Set([...(data?.invoicesDetails as InvoicesDetails[]), detail]);
    debugger;
    setField('invoicesDetails', details as unknown as FieldValueType);
  };

  return (
    <>
      <FormStyled noValidate>
        <Header icon={icon} title={title} onClose={onFinish} />
        <main>
          <>
            {getFieldElements(form, initialFields, undefined, undefined, viewMode)}
            <ReadOnlyTable<InvoicesDetails>
              data={(data?.invoicesDetails as InvoicesDetails[]) || []}
              columns={columns}
              useRadius
            />
          </>
        </main>

        <footer>
          {onAccept && (
            <Button id="form-button-accept" onClick={onSubmit}>
              Accept
            </Button>
          )}
          <Button id="form-button-add" onClick={() => setShowDetailForm(true)}>
            Add
          </Button>
          {actions}
        </footer>
      </FormStyled>
      {showDetailForm && <InvoiceDetailForm onAccept={onAcceptDetail} onFinish={() => setShowDetailForm(false)} />}
    </>
  );
};

export default memo(InvoiceForm) as typeof InvoiceForm;
