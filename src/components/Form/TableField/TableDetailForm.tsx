// assets
import { detailsViewImg } from 'assets';
// components
import { Form, PageSpinner, Overlay } from 'components';
// hooks
import { useParams, useFetchProducts } from 'hooks';
// styles
import { FormWrapper } from 'styles';
// react
import { memo, useMemo } from 'react';
// types
import type { CreateInvoiceDetail, FormFieldType, InvoicesDetails } from 'types';

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
    <FormWrapper>
      <Overlay />
      <Form<TData>
        icon={detailsViewImg}
        title={title}
        initialFields={fields}
        initialData={detail}
        onAccept={onAccept}
        onFinish={onFinish}
        // actions={<CustomerActions customer={customer} />}
        viewMode={false}
      />
    </FormWrapper>
  );
};
export default memo(TableDetailForm) as typeof TableDetailForm;