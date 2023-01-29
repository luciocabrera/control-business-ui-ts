//@ts-nocheck
// components
import { Button, Header, Select, TextInput } from 'components';
// icons
import { FilterIcon } from 'icons';
// react
import { memo, useMemo, useState } from 'react';
// styles
import { FormStyled } from 'components/Form/Form/Form.styled';
// types
import type { MouseEvent, FormOptionType } from 'types';
import type { FormProps } from './FormFilter.types';

const FormFilter = <TData extends Record<string, unknown>>({
  title,
  columns,
  initialFields,
  onAccept,
  onFinish,
}: FormProps<TData>) => {
  const [selectedField, setSelectedField] = useState<string>();
  const [condition, setCondition] = useState<string>();
  const [value, setValue] = useState<string>();

  const fieldsOptions: FormOptionType[] = useMemo(
    () =>
      columns?.map((column) => ({
        label: (column.header as string) || '',
        value: (column.accessorKey as string) || '',
      })),
    [columns],
  );

  const conditionsOptions: FormOptionType[] = useMemo(
    () =>
      ['contains', 'equal']?.map((field) => ({
        label: field,
        value: field,
      })),
    [],
  );

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selected = columns.find((field) => field.accessorKey === selectedField);
    if (selectedField && selected && condition && value)
      onAccept?.({
        accessor: selectedField || '',
        label: (selected?.header as string) || '',
        condition: condition || '',
        value: value,
      });
  };
  return (
    <FormStyled noValidate width="701px">
      <Header icon={<FilterIcon />} title={title} onClose={onFinish} />
      <main>
        <>
          <Select
            key={`field-select-field`}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const selected = event.target.options[event.target.selectedIndex]?.value;

              setSelectedField(selected);
            }}
            value={selectedField}
            accessor={`field-select-field`}
            options={fieldsOptions || []}
            label="Field"
            type={''}
          />
          <Select
            key={`field-select-condition`}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const selected = event.target.options[event.target.selectedIndex]?.value;
              setCondition(selected);
            }}
            value={condition}
            accessor={`field-select-condition`}
            options={conditionsOptions || []}
            label="Condition"
            type={''}
          />
          <TextInput
            key={`field-input-value`}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
            accessor={`field-input-value`}
            label="Value"
            required={true}
            type={'text'}
            value={value}
          />
        </>
      </main>
      <footer>
        <Button id="form-button-accept-filters" onClick={onSubmit}>
          Accept
        </Button>
        <Button id="form-button-cancel-filters" inverse onClick={onFinish}>
          cancel
        </Button>
      </footer>
    </FormStyled>
  );
};

export default memo(FormFilter) as typeof FormFilter;
