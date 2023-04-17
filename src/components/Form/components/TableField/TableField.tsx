//assets
// react
import { useCallback, useMemo, useState } from 'react';
import { detailsViewImg } from 'assets';
// contexts
import { useFieldsContext } from 'contexts';
// styles
// types
import type { CellContext, ColumnDef } from 'types';

// components
import { Portal, ReadOnlyTable } from 'components';

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
  const [fieldValue, setStore] = useFieldsContext<
    TData[],
    Record<string, unknown>
  >((store: Record<string, unknown>) => store[accessor] as TData[]);

  const normalizedValue = (normalize?.(data) ??
    fieldValue) as unknown as TData[];

  const onRemoveDetail = useCallback(
    (original: TData) => {
      const newDetails = data.filter((detail) => detail !== original);
      setStore({ [accessor]: newDetails });
    },
    [accessor, data, setStore]
  );

  const onAcceptDetail = useCallback(
    (detail: DetailData) => {
      const newDetails = [
        ...new Set([...data, detail as Record<string, unknown>]),
      ];
      setStore({ [accessor]: newDetails });
    },
    [accessor, data, setStore]
  );

  const getActionsCell = useCallback(
    ({ row: { original } }: CellContext<TData, unknown>) => (
      <img
        src={detailsViewImg}
        alt=''
        height='18'
        onClick={() => onRemoveDetail(original)}
      />
    ),
    [onRemoveDetail]
  );

  const columnsWithActions = useMemo<ColumnDef<TData>[]>(() => {
    const calculatedColumns = [...columns];

    if (readonly)
      calculatedColumns.push({
        accessorKey: 'actions',
        header: '',
        cell: getActionsCell,
      });

    return calculatedColumns;
  }, [columns, getActionsCell, readonly]);

  const labelWithAdd = (
    <>
      {label}
      {readonly && (
        <button
          type='button'
          onClick={() => setShowDetailForm(true)}
        >
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
