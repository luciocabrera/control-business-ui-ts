//assets
import { detailsViewImg } from 'assets';
import { Portal } from 'components';
import ReadOnlyTable from 'components/Table/ReadOnlyTable/ReadOnlyTable';
import { useStore } from 'contexts';
import { memo, forwardRef, useMemo, useCallback, useState } from 'react';
import type { Column } from 'types';
import { FieldGroupStyled } from '../Form/Form.styled';

import type { TableFieldProps } from './TableField.types';

const TableField = <TData extends Record<string, unknown>, DetailData>(
  {
    data,
    normalize,
    columns,
    accessor,
    label,
    readonly,
    showHeader = false,
    renderDetail,
    rowKeyGetter,
    getComparator,
  }: TableFieldProps<TData, DetailData>,
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

  const columnsWithActions = useMemo<Column<TData>[]>(() => {
    const calculatedColumns = [...columns];

    if (readonly)
      calculatedColumns.push({
        key: 'actions',
        name: '',
        formatter: ({ row }) => (
          <img src={detailsViewImg} alt="" width="18" height="18" onClick={() => onRemoveDetail(row)} />
        ),
      });

    return calculatedColumns;
  }, [columns, onRemoveDetail, readonly]);

  const labelWithAdd = (
    <>
      {label}
      {readonly && (
        <button type="button" onClick={() => setShowDetailForm(true)}>
          Add
        </button>
      )}
    </>
  );

  return (
    <>
      <FieldGroupStyled key={`table-form-field-${accessor}`}>
        <legend>{labelWithAdd}</legend>
        <ReadOnlyTable<TData>
          data={normalizedValue}
          columns={columnsWithActions}
          useRadius
          rowKeyGetter={rowKeyGetter}
          getComparator={getComparator}
          showHeader={false}
        />
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
