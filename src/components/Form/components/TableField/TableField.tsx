//assets
import { detailsViewImg } from 'assets';
// components
import { Portal, ReadOnlyTable } from 'components';
// contexts
import { useFieldsContext } from 'contexts';
// react
import { useMemo, useCallback, useState } from 'react';
// styles

// types
import type { ColumnDef } from 'types';
import { FieldGroupStyled } from '../FormFields/styles';
import type { TableFieldProps } from './types';

const TableField = <TData extends Record<string, unknown>, DetailData>({
  data,
  normalize,
  columns,
  accessor,
  label,
  readonly,
  renderDetail,
}: TableFieldProps<TData, DetailData>) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [fieldValue, setStore] = useFieldsContext<TData, any>((store: TData) => store[accessor] as TData);
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

  const columnsWithActions = useMemo<ColumnDef<TData>[]>(() => {
    const calculatedColumns = [...columns];

    if (readonly)
      calculatedColumns.push({
        accessorKey: 'actions',
        header: '',
        cell: ({ row: { original } }) => (
          <img src={detailsViewImg} alt="" width="18" height="18" onClick={() => onRemoveDetail(original)} />
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
          showHeader={false}
          isLoading={false}
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
export default TableField;
