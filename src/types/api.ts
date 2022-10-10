export type ApiResponse<T> = {
  status: number;
  response?: T;
};

export type OptionsType = {
  method?: string;
  body?: string | FormData;
  headers?: Record<string, unknown>;
};
