//assets
import { detailsViewImg } from 'assets';
import { Portal } from 'components';
import ReadOnlyTable from 'components/Table/ReadOnlyTable/ReadOnlyTable';
import { useStore } from 'contexts';
import { memo, forwardRef, useMemo, useCallback, useState } from 'react';
import type { ColumnDef } from 'types';
import { FieldGroupStyled } from '../Form/Form.styled';

import type { TableFieldProps } from './TableField.types';

const TableField = <TData extends Record<string, unknown>, DetailData>(
  { data, normalize, columns, accessor, label, renderDetail }: TableFieldProps<TData, DetailData>,
  ref: React.ForwardedRef<unknown>,
) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [fieldValue, setStore] = useStore<TData, any>((store: TData) => store[accessor] as TData);
  const normalizedValue = (normalize?.(data) ?? fieldValue) as unknown as TData[];

  const onRemoveDetail = useCallback(
    (original: TData) => {
      const newDetails = data.filter((detail) => detail !== original);
      setStore({ [accessor]: newDetails });
    },
    [accessor, data, setStore],
  );

  const onAcceptDetail = useCallback(
    (detail: DetailData) => {
      const newDetails = [...new Set([...data, detail as Record<string, unknown>])];
      setStore({ [accessor]: newDetails });
    },
    [accessor, data, setStore],
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
      {showDetailForm && (
        <Portal>
          <>{renderDetail?.(onAcceptDetail, () => setShowDetailForm(false))}</>
        </Portal>
      )}
    </>
  );
};
export default memo(forwardRef(TableField)) as typeof TableField;
