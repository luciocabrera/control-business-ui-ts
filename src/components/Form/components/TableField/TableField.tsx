import { useState } from 'react';
import { detailsViewImg } from 'assets';
import { useFieldsContext } from 'contexts';
import type { CellContext } from 'types';

import { Portal } from 'components';
import { ReadOnlyTable } from 'components/Table/ReadOnlyTable';

import { FieldGroupStyled } from '../FormFields/styles';

import type { TableFieldProps } from './types';

const TableField = <TData extends Record<string, unknown>, DetailData>({
  accessor,
  columns,
  data,
  label,
  normalize,
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

  const onRemoveDetail = (original: TData) => {
    const newDetails = data.filter((detail) => detail !== original);
    setStore({ [accessor]: newDetails });
  };
  const onAcceptDetail = (detail: DetailData) => {
    const newDetails = [
      ...new Set([...data, detail as Record<string, unknown>]),
    ];
    setStore({ [accessor]: newDetails });
  };

  const getActionsCell = ({
    row: { original },
  }: CellContext<TData, unknown>) => (
    <img
      alt=''
      height='18'
      src={detailsViewImg}
      onClick={() => onRemoveDetail(original)}
    />
  );

  const columnsWithActions = [...columns];

  if (readonly)
    columnsWithActions.push({
      accessorKey: 'actions',
      cell: getActionsCell,
      header: '',
    });

  const onLabelWithAddClick = () => setShowDetailForm(true);

  const labelWithAdd = (
    <>
      {label}
      {readonly && (
        <button
          type='button'
          onClick={onLabelWithAddClick}
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
          columns={columnsWithActions}
          data={normalizedValue}
          defaultColumnOrder={[]}
          hidden={[]}
          isLoading={false}
          showHeader={false}
          visible={[]}
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
