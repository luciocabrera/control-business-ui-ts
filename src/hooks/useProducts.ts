// configs
import { endpoints } from '../configs/configs';
// hooks
import { useApiData, useApiDataList, useApiRefreshData, useApiRequest } from './useApi';
// types
import type { ApiResponse, ProductCreateType, ProductType, OptionsType } from 'types';
// react
import { useCallback } from 'react';

type IdType = string | undefined | null;

export const useFetchProducts = () =>
  useApiDataList<ProductType[]>({
    endpointUrl: endpoints.products,
  });

export const useRefreshProducts = () => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.products}`), [mutate]);
};

export const useFetchProduct = (productId: IdType) =>
  useApiData<ProductType>({
    endpointUrl: productId ? `${endpoints.products}/${productId}` : undefined,
  });

export const useRefreshProduct = (productId: IdType) => {
  const { mutate } = useApiRefreshData();

  return useCallback(() => mutate(`${endpoints.products}/${productId}`), [productId, mutate]);
};

export const usePostProduct = () => {
  const apiRequest = useApiRequest();
  return useCallback(
    async (product: ProductCreateType): Promise<ApiResponse<ProductType>> => {
      const requestOptions: OptionsType = {
        method: product.productId ? 'POST' : 'PATCH',
        body: JSON.stringify(product),
      };
      const url = product.productId ? endpoints.products : `${endpoints.products}/${product.productId ?? ''}`;

      return apiRequest<ProductType>(url, requestOptions);
    },
    [apiRequest],
  );
};
