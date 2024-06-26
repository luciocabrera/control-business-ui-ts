import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import useSWRInfinite, { type SWRInfiniteResponse } from 'swr/infinite';
import type { OptionsType } from 'types';
import { execDownload, execRequest, fetchRequest } from 'utilities';

type UseApiDataArgs<TDataType, TPreTransformDataType> = {
  endpointUrl?: string | null;
  transformData?: (
    data: TPreTransformDataType
  ) => Promise<TDataType> | TDataType;
  refreshInterval?: number;
  query?: string;
};

export type UseApiInfiniteDataResponse<TDataType> = Omit<
  SWRInfiniteResponse<TDataType>,
  'data'
> & {
  isLoadingInitialData: boolean;
  isLoadingMore: boolean;
  isEmpty: boolean;
  isReachingEnd: boolean;
  isRefreshing: boolean;
  data: TDataType;
};

export type UseApiDataResponse<TDataType> = SWRResponse<TDataType>;

export type UseApiDataListResponse<TDataType> = Omit<
  UseApiDataResponse<TDataType>,
  'data'
> & { data: TDataType };

export type ValidDataHookResponse<TData> =
  | UseApiDataListResponse<TData[]>
  | UseApiInfiniteDataResponse<TData[]>;

export const isInfiniteResponse = <TDataType>(
  value: ValidDataHookResponse<TDataType>
): value is UseApiInfiniteDataResponse<TDataType[]> => {
  if ((value as UseApiInfiniteDataResponse<TDataType>).size) {
    return true;
  }
  return false;
};

const getShouldExecute = (accessToken?: string | null) =>
  accessToken ? true : false;

const getRequestOptions = (
  customOptions?: OptionsType,
  accessToken?: string
) => {
  const shouldAddToken = getShouldExecute(accessToken);
  let headers: Record<string, unknown> = {};

  // If omit default headers is not true then we setup the default headers
  if (!customOptions?.omitDefaultHeaders) {
    headers['accept'] = 'application/json';
    headers['content-type'] = 'application/json';
  }

  // Always add the authorization header if there is a token
  if (shouldAddToken) headers['Authorization'] = `Bearer ${accessToken ?? ''}`;

  headers = { ...headers, ...customOptions?.headers };

  delete customOptions?.headers;
  delete customOptions?.omitDefaultHeaders;

  const requestOptions: Record<string, unknown> = {
    headers,
    ...customOptions,
  };

  return requestOptions;
};

export const useApiData = <TDataType, TPreTransformDataType = TDataType>({
  endpointUrl,
  refreshInterval,
  transformData,
}: UseApiDataArgs<
  TDataType,
  TPreTransformDataType
>): UseApiDataResponse<TDataType> => {
  const accessToken = 'token'; // useAccessToken();
  const shouldExecute = getShouldExecute(accessToken);

  const { data, isLoading, isValidating, mutate, ...rest } = useSWR<TDataType>(
    endpointUrl && shouldExecute ? endpointUrl : undefined,
    async (url) => {
      const requestOptions = getRequestOptions({}, accessToken);
      const response = await fetchRequest<TPreTransformDataType>(
        url as string,
        requestOptions
      );

      if (transformData !== undefined) return transformData(response);

      // TDataType represents the data returned by the hook, as expected by the UI
      // TPreTransformDataType represents the data as it is received from the API
      // TPreTransformDataType defaults to TDataType unless explicitly set.
      //
      // You could set the TPreTransformDataType to another type than TDataType without
      // specifying the optional transformData callback in order to transform
      // TPreTransformDataType into TDataType, the compiler catches it - but it's
      // nontrivial to make this fully typesafe, so for now it will be the caller's
      // responsibility not to set TPreTransformDataType unless the transformData
      // callback is used.
      return response as unknown as TDataType;
    },
    {
      // shouldRetryOnError: false,
      onErrorRetry: (
        error: { status: number; cause: number },
        _key,
        _config,
        revalidate,
        { retryCount }
      ) => {
        // Never retry on 404.
        if (error.status === 404 || error.cause === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 2) return;

        // Retry after 5 seconds.
        setTimeout(() => void revalidate({ retryCount }), 5000);
      },
      refreshInterval,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    mutate,
    ...rest,
  };
};

export const useApiInfiniteData = <
  TDataType,
  TPreTransformDataType = TDataType,
>({
  endpointUrl,
  pageSize,
  query,
  refreshInterval,
  transformData,
}: UseApiDataArgs<TDataType, TPreTransformDataType> & {
  pageSize: number;
}): UseApiInfiniteDataResponse<TDataType> => {
  const accessToken = 'token'; // useAccessToken();
  const shouldExecute = getShouldExecute(accessToken);
  const {
    data,
    isLoading,
    isValidating,
    setSize,
    size,
    ...rest
  }: SWRInfiniteResponse<TDataType> = useSWRInfinite<TDataType>(
    (index) =>
      endpointUrl && shouldExecute
        ? `${endpointUrl}?take=${pageSize}&skip=${index * pageSize}${
            query ?? ''
          }`
        : undefined,
    async (url) => {
      const requestOptions = getRequestOptions({}, accessToken);
      const response = await fetchRequest<TPreTransformDataType>(
        url as string,
        requestOptions
      );

      if (transformData !== undefined) return transformData(response);

      return response as unknown as TDataType;
    },
    {
      errorRetryCount: 0,
      refreshInterval,
      revalidateAll: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const isLoadingInitialData = !data && !rest.error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined') ||
    false;
  const isEmpty = ((data?.[0] as TDataType[])?.length || 0) === 0;
  const isReachingEnd =
    isEmpty ||
    (data && (data[data.length - 1] as TDataType[])?.length < pageSize) ||
    false;
  const isRefreshing = (isValidating && data && data.length === size) || false;
  const loading =
    isLoadingMore || isLoadingInitialData || isRefreshing || false;
  const flatData: TDataType = (
    data ? ([] as TDataType[]).concat(...data) : []
  ) as TDataType;

  return {
    data: flatData,
    isEmpty,
    isLoading: loading || isLoading,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    isValidating,
    setSize,
    size,
    ...rest,
  };
};

export const useApiDataList = <TDataType, TPreTransformDataType = TDataType>(
  args: UseApiDataArgs<TDataType, TPreTransformDataType>
): UseApiDataListResponse<TDataType> => {
  // Helper for list data, returns empty list if the data is not ready
  // instead of undefined
  const hookResult = useApiData(args);
  return {
    ...hookResult,
    data: hookResult.data ?? ([] as unknown as TDataType),
  };
};

export const useApiRefreshData = () => useSWRConfig();

export const useApiRequest = () => {
  const accessToken = 'token'; // useAccessToken();
  return async <T>(endpointUrl: string, customOptions?: OptionsType) => {
    const requestOptions = getRequestOptions(customOptions, accessToken);
    return execRequest<T>(endpointUrl, requestOptions);
  };
};

export const useApiDownload = () => {
  const accessToken = 'token'; // useAccessToken();
  return async (
    endpointUrl: string,
    fileName: string,
    customOptions?: OptionsType
  ) => {
    const requestOptions = getRequestOptions(customOptions, accessToken);
    return execDownload(endpointUrl, fileName, requestOptions);
  };
};
