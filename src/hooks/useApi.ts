import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import type { OptionsType } from 'types';
import { execRequest, fetchRequest } from 'utilities/api';
import { useAuth } from 'hooks';

type useApiDataArgs<TDataType, TPreTransformDataType> = {
  endpointUrl?: string | null;
  transformData?: (data: TPreTransformDataType) => TDataType | Promise<TDataType>;
  refreshInterval?: number;
};

export function useApiData<TDataType, TPreTransformDataType = TDataType>({
  endpointUrl,
  transformData,
  refreshInterval,
}: useApiDataArgs<TDataType, TPreTransformDataType>) {
  const { user } = useAuth();
  const { data, error, mutate } = useSWR<TDataType>(
    // endpointUrl && user?.accessToken ? endpointUrl : undefined,
    endpointUrl ? endpointUrl : undefined,
    async (url) => {
      try {
        const bearer = `Bearer ${user?.accessToken}`;
        const options: Record<string, unknown> = {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: bearer,
          },
        };

        const response = await fetchRequest<TPreTransformDataType>(url, options);

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
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    { refreshInterval },
  );

  return {
    loading: !data && !error,
    data,
    error,
    mutate,
  };
}

export function useApiDataList<TDataType, TPreTransformDataType = TDataType>(
  args: useApiDataArgs<TDataType, TPreTransformDataType>,
) {
  // Helper for list data, returns empty list if the data is not ready
  // instead of undefined
  const hookResult = useApiData(args);
  return { ...hookResult, data: hookResult.data ?? ([] as unknown as TDataType) };
}

export function useApiRefreshData() {
  return useSWRConfig();
}

export const useApiRequest = () => {
  const { user } = useAuth();
  const bearer = `Bearer ${user?.accessToken}`;

  return useCallback(
    async <T>(endpointUrl: RequestInfo | URL, customOptions?: OptionsType) => {
      const headers = customOptions?.headers || {};
      delete customOptions?.headers;

      const requestOptions: Record<string, unknown> = {
        ...{
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: bearer,
            ...headers,
          },
        },
        ...customOptions,
      };

      return execRequest<T>(endpointUrl, requestOptions);
    },
    [bearer],
  );
};
