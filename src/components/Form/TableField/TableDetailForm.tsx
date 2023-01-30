// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner } from 'components';
// contexts
import { FormDataContextProvider } from 'contexts';
// react
import { memo } from 'react';
// types
import type { FormFieldType } from 'types';

type DetailFormProps<TData> = {
  detail?: TData;
  onAccept: (detail: TData) => void;
  onFinish: () => void;
  isLoading?: boolean;
  title: string;
  fields: FormFieldType[];
};

const TableDetailForm = <TData extends Record<string, unknown>>({
  detail,
  onAccept,
  onFinish,
  isLoading,
  title,
  fields,
}: DetailFormProps<TData>) => {
  if (isLoading) return <PageSpinner />;

  return (
    <FormDataContextProvider<TData> initialFields={fields} initialData={detail}>
      <Form<TData> icon={detailsViewImg} title={title} onAccept={onAccept} onFinish={onFinish} viewMode={false} />
    </FormDataContextProvider>
  );
};
export default memo(TableDetailForm) as typeof TableDetailForm;
