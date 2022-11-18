// components
import { ReadOnlyTable, IconButton, Button, Overlay, Portal } from 'components';
import FormFilter from '../FormFilter/FormFilter';
// contexts
import { useTableContext } from 'contexts';
// hooks
import { useCallback, useMemo, useState } from 'hooks';
// icons
import { DeleteIcon, EditIcon, NewIcon } from 'icons';
// styles
import { FormWrapper, TableActionsStyled } from 'styles';
import { FormStyled } from 'components/Form/Form/Form.styled';
// types
import type { Column } from 'types';
import type { FilterSettingsProps, FieldsFiltersSettings } from './FilterSettings.types';
import type { FieldFilter } from '../ReadOnlyTable/ReadOnlyTable.types';

const title = 'Filters';

const FilterSettings = ({ onFinish, meta }: FilterSettingsProps) => {
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [, setDetail] = useState<FieldFilter | undefined>();

  const [filters, setFilters] = useTableContext<FieldFilter[] | undefined, Pick<FieldsFiltersSettings, 'filters'>>(
    (store) => store.filters,
  );

  console.log('filters', filters);
  const columnsDetails = useMemo<Column<FieldFilter>[]>(
    () => [
      {
        key: 'label',
        name: 'Field',
      },
      {
        key: 'condition',
        name: 'Condition',
      },
      {
        key: 'value',
        name: 'Value',
      },
    ],
    [],
  );

  const onRemoveDetail = useCallback(
    (original: FieldFilter) => {
      const newDetails = filters?.filter((detail) => detail !== original);

      setFilters({ filters: newDetails }, 'filters');
    },
    [filters, setFilters],
  );

  const onEditDetail = useCallback(
    (original: FieldFilter) => {
      onRemoveDetail(original);
      setDetail(original);
      setShowDetailForm(true);
    },
    [onRemoveDetail],
  );

  const onAcceptDetail = useCallback(
    (detail: FieldFilter) => {
      const newDetails = [...new Set([...(filters || []), detail])];

      setFilters({ filters: newDetails }, 'filters');

      setShowDetailForm(false);
    },
    [filters, setFilters],
  );

  const columnsWithActions = useMemo<Column<FieldFilter>[]>(
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
            <IconButton icon={<DeleteIcon />} onClick={() => onRemoveDetail(row)} />
          </TableActionsStyled>
        ),
      },
    ],
    [columnsDetails, onEditDetail, onRemoveDetail],
  );

  type Comparator = (a: FieldFilter, b: FieldFilter) => number;
  const getComparator = useCallback((sortColumn: string): Comparator => {
    switch (sortColumn) {
      case 'label':
      case 'condition':
        return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
      default:
        return () => 0;
    }
  }, []);

  return (
    <Portal>
      <Overlay />
      <FormWrapper>
        <FormStyled>
          <ReadOnlyTable<FieldFilter>
            data={filters || []}
            columns={columnsWithActions}
            allowFiltering={false}
            height="33vh"
            getComparator={getComparator}
            title={title}
            actions={<IconButton icon={<NewIcon />} onClick={() => setShowDetailForm(true)} />}
          />
          {showDetailForm && (
            <Portal>
              <FormFilter
                title={title}
                initialFields={meta || []}
                onAccept={onAcceptDetail}
                onFinish={() => setShowDetailForm(false)}
              />
            </Portal>
          )}
          <footer>
            <Button id="form-button-accept-filters" onClick={onFinish}>
              Accept
            </Button>
            <Button id="form-button-cancel-filters" inverse onClick={onFinish}>
              cancel
            </Button>
          </footer>
        </FormStyled>
      </FormWrapper>
    </Portal>
  );
};

export default FilterSettings;
