import type {
  ApiResponse,
  OptionsType,
  TitleCreateType,
  TitleType,
} from 'types';

import { endpoints } from '../configs/configs';

import {
  useApiData,
  useApiDataList,
  useApiRefreshData,
  useApiRequest,
} from './useApi';

type IdType = string | null | undefined;

export const useFetchTitles = () =>
  useApiDataList<TitleType[]>({
    endpointUrl: endpoints.titles,
  });

export const useRefreshTitles = () => {
  const { mutate } = useApiRefreshData();

  return () => mutate(`${endpoints.titles}`);
};

export const useFetchTitle = (titleId: IdType) =>
  useApiData<TitleType>({
    endpointUrl: titleId ? `${endpoints.titles}/${titleId}` : undefined,
  });

export const useRefreshTitle = (titleId: IdType) => {
  const { mutate } = useApiRefreshData();

  return () => mutate(`${endpoints.titles}/${titleId}`);
};

export const usePostTitle = () => {
  const apiRequest = useApiRequest();
  return async (title: TitleCreateType): Promise<ApiResponse<TitleType>> => {
    const requestOptions: OptionsType = {
      body: JSON.stringify(title),
      method: title.titleId ? 'POST' : 'PATCH',
    };
    const url = title.titleId
      ? endpoints.titles
      : `${endpoints.titles}/${title.titleId ?? ''}`;

    return apiRequest<TitleType>(url, requestOptions);
  };
};
