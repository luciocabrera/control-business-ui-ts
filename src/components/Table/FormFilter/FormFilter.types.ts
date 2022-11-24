import type { ReactElement, MouseEvent } from 'types';
import type { FieldFilter, MetaType } from '../ReadOnlyTable_/ReadOnlyTable.types';

export type FormBaseProps = {
  initialFields: MetaType[];
  onAccept?: (data: FieldFilter) => void;
  onFinish: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type FormProps = FormBaseProps & {
  title: string;
  icon?: ReactElement | string;
};
