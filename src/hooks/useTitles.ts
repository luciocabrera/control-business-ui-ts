// configs
import { endpoints } from '../configs/configs';
// hooks
import { useApiData, useApiDataList, useApiRefreshData, useApiRequest } from './useApi';
// types
import type { ApiResponse, TitleCreateType, TitleType, OptionsType } from 'types';
// react
import { useCallback } from 'react';

type IdType = string | undefined | null;

export const useFetchTitles = () =>
  useApiDataList<TitleType[]>({
    endpointUrl: endpoints.titles,
  });

export const useRefreshTitles = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.titles}`), [mutate]);
};

export const useFetchTitle = (titleId: IdType) =>
  useApiData<TitleType>({
    endpointUrl: titleId ? `${endpoints.titles}/${titleId}` : undefined,
  });

export const useRefreshTitle = (titleId: IdType) => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.titles}/${titleId}`), [titleId, mutate]);
};

export const usePostTitle = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (title: TitleCreateType): Promise<ApiResponse<TitleType>> => {
      const requestOptions: OptionsType = {
        method: title.titleId ? 'POST' : 'PATCH',
        body: JSON.stringify(title),
      };
      const url = title.titleId ? endpoints.titles : `${endpoints.titles}/${title.titleId ?? ''}`;

      return apiRequest<TitleType>(url, requestOptions);
    },
    [apiRequest],
  );
};
