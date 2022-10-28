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
import createFastContext from 'contexts/FormDataContextNew';
import { getInitialData } from 'utilities';

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

  const newCalculatedData = getInitialData<TData>(fields, detail);
  const { Provider, useStore } = createFastContext<TData>(newCalculatedData);

  return (
    <Provider>
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
          //@ts-ignore
          useStore={useStore}
        />
      </FormWrapper>
    </Provider>
  );
};
export default memo(TableDetailForm) as typeof TableDetailForm;
