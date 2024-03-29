// components
// react
import { useCallback, useMemo } from 'react';
import { FormContextProvider, useAddNotification } from 'contexts';
// contexts
import { TableContextActionKind, useTableContext } from 'contexts/TableContext';

import { Form } from 'components/Form/Form';

const FormFilter = () => {
  const {
    state: { columnFilters, showColumnFilters, columnMeta },
    dispatch,
  } = useTableContext();

  const addNotification = useAddNotification();

  const onSetShowFilters = useCallback(() => {
    dispatch({ type: TableContextActionKind.ToggleShowColumnFilters });
  }, [dispatch]);

  const initialValues = useMemo(
    () =>
      columnFilters?.reduce(
        (ac, filter) => ({ ...ac, [filter.id]: filter.value }),
        {}
      ),
    [columnFilters]
  );
  const formFields = useMemo(
    () =>
      columnMeta?.map((filter) => ({
        accessor: filter.id,
        label: filter.name,
        type: filter.type ?? 'text',
        options: filter.options,
      })),
    [columnMeta]
  );

  const onAccept = useCallback(
    async (payload: Record<string, unknown>) => {
      try {
        const columnFilters = Object.keys(payload)
          .map((key) => ({ id: key, value: payload[key] }))
          .filter((fc) => fc.value);
        dispatch({
          type: TableContextActionKind.SetColumnFilters,
          payload: { columnFilters },
        });
      } catch (errorInfo) {
        addNotification?.(
          'Fields need to be checked',
          'At least one problem has been found when validating the fields.',
          'warning'
        );
      }
    },
    [dispatch, addNotification]
  );

  // const formChildren = columnMeta.map((cm) => {
  //   // switch (cm.type) {
  //   //   case 'date':
  //   //     return <RangePickerField key={`form-filter-${cm.id}`} id={cm.id} name={cm.name} type={cm.type} />;
  //   //   case 'datetime':
  //   //     return (
  //   //       <RangePickerField key={`form-filter-${cm.id}`} id={cm.id} name={cm.name} showTime={true} type={cm.type} />
  //   //     );
  //   //   case 'number':
  //   //     return <SliderField key={`form-filter-${cm.id}`} id={cm.id} name={cm.name} type={cm.type} />;
  //   //   case 'enum':
  //   //     const selectOptions = cm.options?.map((option) => ({ key: option, label: option }));
  //   //     return (
  //   //       <SelectField key={`form-filter-${cm.id}`} id={cm.id} name={cm.name} type={cm.type} options={selectOptions} />
  //   //     );
  //   //   default:
  //   return (
  //     <TextInput
  //       key={`field-input-value`}
  //       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  //         //   setValue(event.target.value);
  //       }}
  //       accessor={`field-input-value`}
  //       label='Value'
  //       required={true}
  //       type={'text'}
  //     // value={value}
  //     />
  //   );
  //   // }
  // });

  if (!showColumnFilters) return null;
  return (
    <FormContextProvider<Record<string, unknown>>
      initialFields={formFields}
      initialData={initialValues}
    >
      <Form<Record<string, unknown>>
        // icon={<CustomerIcon />}
        title={'title'}
        onAccept={onAccept}
        // onFinish={onFinish}
        // actions={<CustomerActions customer={customer} />}
        viewMode={false}
        height='600px'
        width='850px'
        onFinish={onSetShowFilters}
      />
    </FormContextProvider>
    // <FormStyled noValidate width="701px">
    //   {/* <Header icon={<FilterIcon />} title={title} onClose={onFinish} /> */}
    //   {/* <main>{formChildren}</main> */}
    //   <footer>
    //     {/* <Button id="form-button-accept-filters" onClick={onSubmit}>
    //       Accept
    //     </Button> */}
    //     {/* <Button id="form-button-cancel-filters" inverse onClick={onFinish}>
    //       cancel
    //     </Button> */}
    //   </footer>
    // </FormStyled>
  );
};

export default FormFilter;
