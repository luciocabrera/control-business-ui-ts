export type ApiResponse<T> = {
  status: number;
  response?: T;
};

export type OptionsType = {
  method?: string;
  body?: string | FormData;
  headers?: Record<string, unknown>;
  omitDefaultHeaders?: boolean;
};

export type APiResponseErrorType = { cause: { status: string | number; errors: string[] | string } };
