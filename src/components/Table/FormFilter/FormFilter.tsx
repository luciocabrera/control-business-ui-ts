import { FormContextProvider, useAddNotification } from 'contexts';
import { TableContextActionKind, useTableContext } from 'contexts/TableContext';

import { Form } from 'components/Form/Form';

const FormFilter = () => {
  const {
    dispatch,
    state: { columnFilters, columnMeta, showColumnFilters },
  } = useTableContext();

  const addNotification = useAddNotification();

  const onSetShowFilters = () => {
    dispatch({ type: TableContextActionKind.ToggleShowColumnFilters });
  };

  const initialValues = columnFilters?.reduce(
    (ac, filter) => ({ ...ac, [filter.id]: filter.value }),
    {}
  );

  const formFields = columnMeta?.map((filter) => ({
    accessor: filter.id,
    label: filter.name,
    options: filter.options,
    type: filter.type ?? 'text',
  }));

  const onAccept = async (payload: Record<string, unknown>) => {
    try {
      const columnFilters = Object.keys(payload)
        .map((key) => ({ id: key, value: payload[key] }))
        .filter((fc) => fc.value);
      dispatch({
        payload: { columnFilters },
        type: TableContextActionKind.SetColumnFilters,
      });
    } catch (errorInfo) {
      addNotification?.(
        'Fields need to be checked',
        'At least one problem has been found when validating the fields.',
        'warning'
      );
    }
  };

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
      initialData={initialValues}
      initialFields={formFields}
    >
      <Form<Record<string, unknown>>
        // icon={<CustomerIcon />}
        height='600px'
        onAccept={onAccept}
        // onFinish={onFinish}
        // actions={<CustomerActions customer={customer} />}
        title={'title'}
        viewMode={false}
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
