// react
import { useCallback, useEffect, useReducer } from 'react';
import type {
  FieldValueType,
  FormFieldErrorType,
  FormFieldType,
  SetFieldFromEvent,
  SetFieldType,
  SetPartialFieldsType,
  VerifyFormType,
} from 'types';
// utilities
import { deepEqual, getInitialData, validateFields } from 'utilities';

type StateType<TDataType> = {
  fields: FormFieldType[];
  initialData?: TDataType;
  data?: TDataType;
  hasErrors: boolean;
  hasChanged: boolean;
  errors?: FormFieldErrorType[];
};

enum ActionKind {
  setField = 'setField',
  setForm = 'setForm',
  setPartialFields = 'setPartialFields',
  init = 'init',
  setData = 'setData',
  reset = 'reset',
  verify = 'verify',
}

type ActionType<TDataType> =
  | { type: ActionKind.reset }
  | {
      type: ActionKind.setField;
      payload: { accessor: string; value?: FieldValueType };
    }
  | {
      type: ActionKind.setPartialFields;
      payload: { partialFields: Partial<TDataType> };
    }
  | {
      type: ActionKind.setForm;
      payload: { data: TDataType; fields: FormFieldType[] };
    }
  | {
      type: ActionKind.init;
      payload: { fields: FormFieldType[] };
    }
  | {
      type: ActionKind.setData;
      payload: { data: TDataType };
    }
  | {
      type: ActionKind.verify;
      payload: { hasErrors: boolean; hasChanged: boolean; errors?: FormFieldErrorType[] };
    };

export type useFormDataArgs<TDataType extends Record<string, unknown>> = {
  data: TDataType;
  fields?: FormFieldType[];
  errors: FormFieldErrorType[];
  resetForm: () => void;
  setField: SetFieldType;
  setPartialFields: SetPartialFieldsType<TDataType>;
  verifyForm: VerifyFormType;
  setFieldFromEvent: SetFieldFromEvent;
};

export const useFormData = <TDataType extends Record<string, unknown>>(
  initialFields: FormFieldType[],
  initialData?: TDataType,
): useFormDataArgs<TDataType> => {
  const calculatedInitialData = getInitialData(initialFields, initialData);

  const reducer = <TDataType extends Record<string, unknown>>(
    state: StateType<TDataType>,
    action: ActionType<TDataType>,
  ): StateType<TDataType> => {
    const { type } = action;
    switch (type) {
      case ActionKind.setField:
        return action.payload.accessor
          ? { ...state, data: { ...(state.data as TDataType), [action.payload.accessor]: action.payload.value } }
          : state;
      case ActionKind.setPartialFields:
        return { ...state, data: { ...(state.data as TDataType), ...action.payload.partialFields } };
      case ActionKind.setForm:
        return {
          ...state,
          data: action.payload.data,
          fields: action.payload.fields,
          initialData: action.payload.data,
        };
      case ActionKind.init:
        const newCalculatedData = getInitialData<TDataType>(action.payload.fields || [], state.data);
        return { ...state, data: newCalculatedData, fields: action.payload.fields, initialData: newCalculatedData };
      case ActionKind.setData:
        return { ...state, data: action.payload.data, initialData: action.payload.data };
      case ActionKind.reset:
        return {
          fields: state.fields,
          initialData: undefined,
          data: undefined,
          hasErrors: false,
          hasChanged: false,
          errors: [],
        };
      case ActionKind.verify:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    fields: initialFields,
    initialData: calculatedInitialData,
    data: calculatedInitialData,
    hasErrors: false,
    hasChanged: false,
    errors: [],
  });

  useEffect(() => {
    dispatch({ type: ActionKind.init, payload: { fields: initialFields } });
  }, [initialFields]);

  const setField = useCallback(
    (accessor: string, value: FieldValueType) =>
      dispatch({ type: ActionKind.setField, payload: { accessor: accessor, value: value } }),
    [],
  );

  const setPartialFields = useCallback(
    (partialFields: Partial<TDataType>) => dispatch({ type: ActionKind.setPartialFields, payload: { partialFields } }),
    [],
  );

  const setFieldFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: ActionKind.setField, payload: { accessor: event.target.name, value: event.target.value } }),
    [],
  );

  const resetForm = () => dispatch({ type: ActionKind.reset });

  const verifyChange = useCallback(() => {
    const { initialData: initial, data } = state;
    return !deepEqual(initial, data);
  }, [state]);

  const verifyForm = useCallback(() => {
    const errorFields = validateFields(state.fields || [], state.data);
    const hasChanged = verifyChange();
    const hasErrors = errorFields.length > 0;

    dispatch({
      type: ActionKind.verify,
      payload: { hasChanged: hasChanged, hasErrors: hasErrors, errors: errorFields },
    });

    return { errorFields, hasChanged };
  }, [state.data, state.fields, verifyChange]);

  return {
    data: state.data as TDataType,
    errors: state.errors as FormFieldErrorType[],
    resetForm,
    setField,
    setPartialFields,
    setFieldFromEvent,
    verifyForm,
  };
};
