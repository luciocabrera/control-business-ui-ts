import { RadioCheckInput } from 'components/RadioCheckInput';

import type { TCheckboxProps } from './TableCheckbox.types';

const TableCheckbox = <TData, TValue = boolean>({
  info,
}: TCheckboxProps<TData, TValue>) => {
  const onChange = () => info.getValue() === true;
  return (
    <RadioCheckInput
      checked={info.getValue() === true}
      name={info.column.id}
      onChange={onChange}
    />
  );
};

export default TableCheckbox;
