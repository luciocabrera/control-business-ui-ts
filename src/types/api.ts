export type ApiResponse<T> = {
  status: number;
  response?: T;
};

export type OptionsType = {
  method?: string;
  body?: FormData | string;
  headers?: Record<string, unknown>;
  omitDefaultHeaders?: boolean;
};

export type APiResponseErrorType = {
  cause: { status: number | string; errors: string[] | string };
};
