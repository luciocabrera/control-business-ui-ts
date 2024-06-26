import { ReactNode } from 'types';

export const FIELD_TYPE_NUMBERS = ['number', 'integer', 'float'] as const;
export const FIELD_TYPE_BOOLEANS = ['boolean'] as const;
export const FIELD_TYPE_DATES = ['date'] as const;
export const FIELD_TYPE_FILES = ['file'] as const;
export const FIELD_TYPE_STRINGS = ['string', 'url', 'text', 'email'] as const;
export const FIELD_TYPE_JSON = ['object', 'json'] as const;

export const DISPLAY_TO_RENDER_RADIO_TYPE = ['radio'] as const;
export const DISPLAY_TO_RENDER_OPTION_TYPE = ['select', 'dropdown'] as const;

export enum FIELD_TO_RENDER_ENUM {
  'selectField' = 'selectField',
  'numericField' = 'numericField',
  'genericField' = 'genericField',
  'checkboxField' = 'checkboxField',
  'label' = 'label',
  'tagsField' = 'tagsField',
  'jsonField' = 'jsonField',
  'passwordField' = 'passwordField',
  'passwordCheckerField' = 'passwordCheckerField',
}

type FieldNumberTuple = typeof FIELD_TYPE_NUMBERS;
export type FieldNumberType = FieldNumberTuple[number];

type FieldJsonTuple = typeof FIELD_TYPE_JSON;
export type FieldJsonType = FieldJsonTuple[number];

type FieldBooleanTuple = typeof FIELD_TYPE_BOOLEANS;
export type FieldBooleanType = FieldBooleanTuple[number];

type FieldDateTuple = typeof FIELD_TYPE_DATES;
export type FieldDateType = FieldDateTuple[number];

type FieldFileTuple = typeof FIELD_TYPE_FILES;
export type FieldFileType = FieldFileTuple[number];

type FieldStringTuple = typeof FIELD_TYPE_STRINGS;
export type FieldStringType = FieldStringTuple[number];

export type FieldProps = FormFieldType & { rules?: Record<string, unknown>[] };

export type FormOptionType = {
  value: number | string;
  label: string;
};

export type FormRuleType =
  {
      type: 'required';
      value?: never;
      message?: string;
    } | {
      type: string;
      value: number | string;
      message?: string;
    };

export type FormTableSettingsFieldType = {
  accessor: string;
  label: string;
  type: string;
};

export type FormFieldBaseType = {
  accessor: string;
  label: string;
  type: string;
  value?: FieldValueType;
  required?: boolean | ((p: unknown) => boolean);
  options?: FormOptionType[];
  display?: string;
  textAlign?: string;
  default?: string | null;
  placeholder?: string;
  tooltip?: string;
  normalize?: (value?: FieldBaseValueType) => FieldBaseValueType;
  onSelect?: (value?: FieldValueType) => void;
  change?: <TDataType>(
    data: TDataType,
    setPartialFields: SetPartialFieldsType<TDataType>
  ) => void;
  disabled?: boolean;
  readonly?: boolean;
  rules?: FormRuleType[];
};

export type FormSimpleFieldType = Omit<FormFieldBaseType, 'value'> & {
  value?: FieldBaseValueType;
};

export type FormFieldGroupType = {
  label?: string;
  fields?: FormFieldType[];
};

export type FormFieldType = { type: string; render?: () => ReactNode } & (
  | FormFieldBaseType
  | FormFieldGroupType
);

export type FormFieldStateType = {
  accessor: string;
  value?: number | string;
};

export type FormFieldErrorType = {
  accessor: string;
  hasErrors: boolean;
  errorMessage: string;
  value?: number | string;
};

export type FieldBaseValueType = number | string | undefined;
export type FieldValueType =
  | FieldBaseValueType
  | Record<string, unknown>
  | Record<string, unknown>[];

export type SetFieldType = (accessor: string, value: FieldValueType) => void;
export type VerifyFormType = () => {
  errorFields: FormFieldErrorType[];
  hasChanged: boolean;
};
export type SetFieldFromEvent = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type SetPartialFieldsType<TDataType> = (
  partialFields: Partial<TDataType>
) => void;

export type FormFieldProps = {
  viewMode?: boolean;
  width?: number;
  field: Omit<FormFieldBaseType, 'value'> & { value?: FieldBaseValueType };
};
