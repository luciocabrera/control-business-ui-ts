//assets
import { detailsViewImg } from 'assets';
import ReadOnlyTable from 'components/Table/ReadOnlyTable/ReadOnlyTable';
import { memo, forwardRef, useMemo, useCallback, useState } from 'react';
import type { ColumnDef } from 'types';
import { FieldGroupStyled } from '../Form/Form.styled';
import TableDetailForm from './TableDetailForm';
// Prop-types
import type { TableFieldProps } from './TableField.types';
// Components

const TableField = <TData extends Record<string, unknown>, DetailData>(
  { data, setField, normalize, columns, accessor, label, renderDetail }: TableFieldProps<TData, DetailData>,
  ref: React.ForwardedRef<unknown>,
) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const normalizedValue = (normalize?.(data) ?? data) as unknown as TData[];

  const onRemoveDetail = useCallback(
    (original: TData) => {
      const newDetails = data.filter((detail) => detail !== original);
      setField?.(accessor, newDetails);
    },
    [accessor, data, setField],
  );

  const onAcceptDetail = useCallback(
    (detail: DetailData) => {
      const newDetails = [...new Set([...data, detail])];
      debugger;
      //  setField?.(accessor, newDetails);
    },
    [data],
  );

  const columnsWithActions = useMemo<ColumnDef<TData>[]>(
    () => [
      ...columns,
      {
        accessorKey: 'actions',
        cell: ({ row: { original } }) => (
          <img src={detailsViewImg} alt="" width="18" height="18" onClick={() => onRemoveDetail(original)} />
        ),
      },
    ],
    [columns, onRemoveDetail],
  );

  const labelWithAdd = (
    <>
      {label}
      <button type="button" onClick={() => setShowDetailForm(true)}>
        Add
      </button>
    </>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-${accessor}`}>
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<TData> data={normalizedValue} columns={columnsWithActions} useRadius />{' '}
      </FieldGroupStyled>
      {
        showDetailForm && renderDetail?.(onAcceptDetail, () => setShowDetailForm(false))
        // <TableDetailForm onAccept={onAcceptDetail} onFinish={() => setShowDetailForm(false)} title={''} fields={[]} />
      }
    </>
  );
};
export default memo(forwardRef(TableField)) as typeof TableField;
